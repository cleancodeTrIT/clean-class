// ❌
class Database {
  select(query: string) {
    return 0;
  }
}
const db = new Database();
function getAvailablePlaces(tripId: string) {
  // 🤢 low-level knowledge exposed
  const queryTrips = "select capacity from trips where tripId=" + tripId;
  const capacity = db.select(queryTrips);
  const queryBookings = "select sum(seats) from bookings where tripId=" + tripId;
  const tripBookedSeats = db.select(queryBookings);
  const free = capacity - tripBookedSeats;
  // 🤢 mixed with enterprise rules
  const OVERBOOKING_FACTOR = 1.05;
  return free * OVERBOOKING_FACTOR;
}
