import { GenericRepository } from "./generic.repository";
import { Activity } from "./models/activity.type";
import { Booking } from "./models/booking.type";
import { Id } from "./models/id.type";

export class ActivitiesService {
  // ToDo: have a repository to store activities
  activitiesRepository = new GenericRepository<Activity>();
  bookingRepository = new GenericRepository<Booking>();
  constructor(private userId: Id) {}

  createActivity(input: { title: string; location: string; date: string; price: number }): Activity {
    if (new Date(input.date) < new Date()) {
      throw new Error("Date is in the past");
    }
    if (input.price < 0) {
      throw new Error("Price is negative");
    }
    const createdActivity: Activity = {
      ...input,
      currency: "EUR",
      minParticipants: 1,
      maxParticipants: 10,
      description: "No description",
      ageCategory: "adult",
      state: "draft",
      slug: this.getSlug(input.title),
      userId: this.userId,
      id: 0,
    };
    return this.activitiesRepository.create(createdActivity);
  }

  bookActivity(input: { activityId: number }) {
    const activity = this.activitiesRepository.read(input.activityId);
    if (activity === undefined) throw new Error("Activity not found");
    if (activity.state !== "published") {
      throw new Error("Activity is not published");
    }
    const countBookingsForActivity = this.bookingRepository
      .readAll()
      .filter((b) => b.activityId === input.activityId).length;
    if (countBookingsForActivity >= activity.maxParticipants) {
      throw new Error("Activity is full");
    }
    const booking: Booking = { ...input, id: 0, customerId: this.userId, places: 1, state: "pending" };
    return this.bookingRepository.create(booking);
  }

  // ToDo: move to an utility function module

  private getSlug(title: string): string {
    return title.toLowerCase().replace(/ /g, "-");
  }
}
