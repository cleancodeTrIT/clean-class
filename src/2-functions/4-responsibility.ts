// ❌
export class Database {
  insertBooking(booking: any) {
    // 🤢 mutation❗
  }
  selectAvailableSeats(tripId: string) {
    return 0; // 🤢 question❓
  }
}
const db = new Database();
function saveBooking(booking: any): number {
  db.insertBooking(booking); // 🤢 mutation❗
  return db.selectAvailableSeats(booking.tripId); // 🤢 question❓
}

function getDiscountBooking(booking: any): number {
  const discount = booking.price * 0.1;
  booking.price = booking.price - discount; // mutation❗
  return discount; // question like pretending it's not touching anything ❓
}
