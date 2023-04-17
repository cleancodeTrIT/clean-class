import { ActivitiesService } from "./activities.service";
import { GenericRepository } from "./generic.repository";
import { Activity } from "./models/activity.type";
import { BookActivityDTO } from "./models/book-activity.dto";
import { Booking } from "./models/booking.type";
import { CreateActivityDTO } from "./models/create-activity.dto";

let sut: ActivitiesService;
const agencyId = "diving-agency";
const customerId = "customer";
const inputActivity: CreateActivityDTO = {
  organizerId: agencyId,
  title: "Dive in the sea",
  location: "Punta Cana",
  date: "2025-08-15",
  price: 100,
};
const inputActivityPast: CreateActivityDTO = {
  organizerId: agencyId,
  title: "Dive in the sea",
  location: "Punta Cana",
  date: "2020-08-15",
  price: 100,
};
const inputActivityNegative: CreateActivityDTO = {
  organizerId: agencyId,
  title: "Dive in the sea",
  location: "Punta Cana",
  date: "2025-08-15",
  price: -100,
};
const inputBooking: BookActivityDTO = {
  activityId: 0,
  customerId,
  places: 1,
};
const activitiesRepository = new GenericRepository<Activity>();
const bookingsRepository = new GenericRepository<Booking>();
// TDD for Create Activity Use Case

// Create Activity Use Case
describe("Create Activity Use Case", () => {
  describe("When logged in as an agency", () => {
    beforeEach(() => {
      sut = new ActivitiesService(activitiesRepository, bookingsRepository);
    });
    // should create an activity based on a basic object with title, price, location, and date,
    it("should create an activity based on a basic object", () => {
      const actual = sut.createActivity(inputActivity);
      const expected: Partial<Activity> = {
        title: "Dive in the sea",
        location: "Punta Cana",
        date: "2025-08-15",
        price: 100,
        organizerId: agencyId,
      };
      expect(actual).toMatchObject(expected);
    });
    // should throw when date is in the past or price is negative
    it("should throw when date is in the past or price is negative", () => {
      expect(() => {
        sut.createActivity(inputActivityPast);
      }).toThrow();
      expect(() => {
        sut.createActivity(inputActivityNegative);
      }).toThrow();
    });
    // should have a method to provide a unique slug for the activity
    it("should have a method to provide a unique slug for the activity", () => {
      const actual = sut.createActivity(inputActivity);
      expect(actual.slug).toEqual("dive-in-the-sea");
    });
    // should have a method to provide an id for the activity
    it("should have a method to provide an id for the activity", () => {
      const actual = sut.createActivity(inputActivity);
      expect(actual.id).not.toEqual(0);
    });
    // should publish the activity in the database
  });
});

// Publish Activity Use Case
describe("Publish Activity Use Case", () => {
  let activity: Activity;
  describe("When logged in as an agency", () => {
    beforeEach(() => {
      sut = new ActivitiesService(activitiesRepository, bookingsRepository);
      activity = sut.createActivity(inputActivity);
    });
    // should publish an activity
    it("should publish an activity", () => {
      sut.publishActivity(activity.id);
      expect(activity.state).toEqual("published");
    });
    // should throw when activity is not found
    it("should throw when activity is not found", () => {
      expect(() => {
        sut.publishActivity(0);
      }).toThrow();
    });
    // should throw when activity is not in draft state
    it("should throw when activity is not in draft state", () => {
      sut.publishActivity(activity.id);
      expect(() => {
        sut.publishActivity(activity.id);
      }).toThrow();
    });
  });
});

// Update Activity Use Case
describe("Update Activity Use Case", () => {
  let activity: Activity;
  describe("When logged in as an agency", () => {
    beforeEach(() => {
      sut = new ActivitiesService(activitiesRepository, bookingsRepository);
      activity = sut.createActivity(inputActivity);
    });
    // should update an activity
    it("should update an activity", () => {
      const updatedActivity = sut.updateActivity(activity.id, {
        maxParticipants: 5,
      });
      expect(updatedActivity.maxParticipants).toEqual(5);
    });
  });
});

// Book Activity Use Case
describe("Book Activity Use Case", () => {
  let activity: Activity;
  describe("When logged in as a customer", () => {
    beforeEach(() => {
      sut = new ActivitiesService(activitiesRepository, bookingsRepository);
      activity = sut.createActivity(inputActivity);
      inputBooking.activityId = activity.id;
    });
    // should book an activity
    it("should book an activity", () => {
      sut.publishActivity(activity.id);
      const createdBooking = sut.bookActivity(inputBooking);
      expect(createdBooking.activityId).toEqual(activity.id);
    });
    // should throw when activity is not found
    it("should throw when activity is not found", () => {
      expect(() => {
        sut.bookActivity({ ...inputBooking, activityId: 0 });
      }).toThrow();
    });
    // should throw when activity is not in published state
    it("should throw when activity is not in published state", () => {
      sut.createActivity(inputActivity);
      expect(() => {
        sut.bookActivity(inputBooking);
      }).toThrow();
    });
    // should throw when activity is full
    it("should throw when activity is full", () => {
      sut.publishActivity(activity.id);
      for (let i = 0; i < activity.maxParticipants; i++) {
        sut.bookActivity(inputBooking);
      }
      expect(() => {
        sut.bookActivity(inputBooking);
      }).toThrow();
    });
  });
});
