import { ActivitiesService } from "./activities.service";
import { Activity } from "./models/activity.type";

let sut: ActivitiesService;
const agencyId = "diving-agency";
const customerId = "customer";
const inputActivity = {
  title: "Dive in the sea",
  location: "Malta",
  date: "2025-08-15",
  price: 100,
};
const inputActivityPast = {
  title: "Dive in the sea",
  location: "Malta",
  date: "2020-08-15",
  price: 100,
};
const inputActivityNegative = {
  title: "Dive in the sea",
  location: "Malta",
  date: "2025-08-15",
  price: -100,
};
// TDD for Create Activity Use Case

// Create Activity Use Case
describe("Create Activity Use Case", () => {
  describe("When logged in as an agency", () => {
    beforeEach(() => {
      sut = new ActivitiesService(agencyId);
    });
    // should create an activity based on a basic object with title, price, location, and date,
    it("should create an activity based on a basic object", () => {
      const actual = sut.createActivity(inputActivity);
      const expected: Partial<Activity> = {
        title: "Dive in the sea",
        location: "Malta",
        date: "2025-08-15",
        price: 100,
        userId: agencyId,
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
      expect(actual.id).toEqual(0);
    });
    // should publish the activity in the database
  });
});

// Book Activity Use Case
describe("Book Activity Use Case", () => {
  describe("When logged in as a customer", () => {
    beforeEach(() => {
      sut = new ActivitiesService(customerId);
    });
    // should book an activity
    it("should book an activity", () => {
      const actual = sut.bookActivity({ activityId: 0 });
      const expected = {
        activityId: 0,
        customerId,
      };
      expect(actual).toMatchObject(expected);
    });
    // should throw when activity is not found
    it("should throw when activity is not found", () => {
      // TODO
    });
    // should throw when activity is not in published state
    it("should throw when activity is not in published state", () => {
      // TODO
    });
    // should throw when activity is full
    it("should throw when activity is full", () => {
      // TODO
    });
  });
});
