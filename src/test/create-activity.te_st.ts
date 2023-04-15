import { ActivitiesService } from "../activities.service";
import { Activity } from "../models/activity.type";
/**
 * Feature: Create Activity Offers
  As a travel agency
  I want to create activity offers
  So that customers can book them

  Scenario: Create an activity offer
    Given I am logged in as an agency operator
    When I create an activity offer with name "Dive in the sea" and price "100"
    Then I should see "Activity "Dive in the sea" created successfully"
 */

describe("Create Activity Offers", () => {
  describe("Given I am logged in as an agency operator", () => {
    describe("When I create an activity offer with name 'Dive in the sea' and price 100", () => {
      it("Then should see an activity 'Dive in the sea' created successfully", () => {
        const userId = 1;
        const sut = new ActivitiesService(userId);
        const actual = sut.createActivity({
          title: "Dive in the sea",
          price: 100,
          location: "Malta",
          date: "2025-08-15",
        });
        const expected: Partial<Activity> = {
          title: "Dive in the sea",
          price: 100,
          state: "draft",
          minParticipants: 1,
          maxParticipants: 10,
          location: "Malta",
          date: "2025-08-15",
          ageCategory: "adult",
          id: 0,
          description: "No description",
          currency: "EUR",
          slug: "no-slug",
          userId: userId,
        };
        expect(actual).toEqual(expected);
      });
    });
  });
});
