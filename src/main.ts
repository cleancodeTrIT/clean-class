import { ActivitiesService } from "./activities.service";
import { CreateActivityDTO } from "./models/create-activity.dto";

// create an activity
const agencyId = "diving-agency";
const inputActivity: CreateActivityDTO = {
  organizerId: agencyId,
  title: "Dive in the sea",
  location: "Malta",
  date: "2025-08-15",
  price: 100,
};
const activitiesService = new ActivitiesService();
const activity = activitiesService.createActivity(inputActivity);
console.log("Created activity: ", activity);
// book an activity
const customerId = "customer";
const inputBooking = {
  activityId: activity.id,
  customerId,
  places: 1,
};
const booking = activitiesService.bookActivity(inputBooking);
console.log("Created booking: ", booking);
// list activities
const activities = activitiesService.activitiesRepository.read();
console.log("Activities: ", activities);
