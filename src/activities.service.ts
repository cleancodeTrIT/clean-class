import { Activity } from "./models/activity.type";
import { Id } from "./models/id.type";

export class ActivitiesService {
  // ToDo: have a repository to store activities

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
    return createdActivity;
  }

  bookActivity(input: { activityId: number }) {
    return { ...input, customerId: this.userId, places: 1 };
  }

  // ToDo: move to an utility function module

  private getSlug(title: string): string {
    return title.toLowerCase().replace(/ /g, "-");
  }
}
