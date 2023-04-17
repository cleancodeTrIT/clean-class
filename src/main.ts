import { ActivitiesService } from "./activities.service";
import { GenericRepository } from "./generic.repository";
import { Activity } from "./models/activity.type";
import { Booking } from "./models/booking.type";
import { CreateActivityDTO } from "./models/create-activity.dto";

// create an activity
const agencyId = "diving-agency";
const inputActivity: CreateActivityDTO = {
  organizerId: agencyId,
  title: "Dive in the sea",
  location: "Punta Cana",
  date: "2025-08-15",
  price: 100,
};
const activitiesRepository = new GenericRepository<Activity>();
const bookingsRepository = new GenericRepository<Booking>();
const activitiesService = new ActivitiesService(activitiesRepository, bookingsRepository);
const activity = activitiesService.createActivity(inputActivity);
activitiesService.publishActivity(activity.id);
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
const activities = activitiesRepository.read();
console.log("Activities: ", activities);
// list bookings
const bookings = bookingsRepository.read();
console.log("Bookings: ", bookings);
