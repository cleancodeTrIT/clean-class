import { GenericRepository } from "./generic.repository";
import { Activity } from "./models/activity.type";
import { BookActivityDTO } from "./models/book-activity.dto";
import { Booking } from "./models/booking.type";
import { CreateActivityDTO } from "./models/create-activity.dto";
import { Id } from "./models/id.type";
import { getSlug } from "./util.functions";

export class ActivitiesService {
  activitiesRepository = new GenericRepository<Activity>();
  bookingRepository = new GenericRepository<Booking>();

  createActivity(input: CreateActivityDTO): Activity {
    if (new Date(input.date) < new Date()) {
      throw new Error("Date is in the past");
    }
    if (input.price < 0) {
      throw new Error("Price is negative");
    }
    const newActivity: Activity = {
      ...input,
      currency: "EUR",
      minParticipants: 1,
      maxParticipants: 10,
      description: "No description",
      ageCategory: "adult",
      state: "draft",
      slug: getSlug(input.title),
      id: 0,
    };
    return this.activitiesRepository.create(newActivity);
  }

  publishActivity(id: Id): Activity {
    const activity = this.activitiesRepository.readById(id);
    if (activity === undefined) throw new Error("Activity to publish not found:" + id);
    if (activity.state !== "draft") throw new Error("Activity is not a draft");
    const publishedActivity: Activity = {
      ...activity,
      state: "published",
    };
    const updatedActivity = this.activitiesRepository.update(publishedActivity);
    if (updatedActivity === undefined) throw new Error("Activity to update not found:" + activity.id);
    return updatedActivity;
  }

  bookActivity(input: BookActivityDTO): Booking {
    const activity = this.activitiesRepository.readById(input.activityId);
    if (activity === undefined) throw new Error("Activity not found: " + input.activityId);
    if (activity.state !== "published" && activity.state !== "confirmed") {
      throw new Error("Activity is not published");
    }
    if (input.places === undefined || input.places <= 0) input.places = 1;
    const places = input.places;
    const currentBookingsForActivity = this.bookingRepository.readByField("activityId", input.activityId);
    const currentBookingsCount = currentBookingsForActivity.length;
    const availablePlaces = activity.maxParticipants - currentBookingsCount;
    if (input.places > availablePlaces) {
      throw new Error("Not enough places left: " + availablePlaces + " places left");
    }
    const newBooking: Booking = { ...input, places, id: 0, state: "pending" };
    const createdBooking = this.bookingRepository.create(newBooking);
    if (currentBookingsCount + places >= activity.minParticipants) {
      activity.state = "confirmed";
      this.activitiesRepository.update(activity);
    }
    return createdBooking;
  }
}
