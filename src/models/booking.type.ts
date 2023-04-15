import { BookingState } from "./booking-state.type";
import { Id } from "./id.type";

export type Booking = {
  id: Id;
  activityId: Id;
  customerId: Id;
  places: number;
  state: BookingState;
};

export const EMPTY_BOOKING: Booking = {
  id: 0,
  activityId: 0,
  customerId: 0,
  places: 0,
  state: "pending",
};
