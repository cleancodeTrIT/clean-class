// ❌
function sendTripDetails() {
  const passengers: any[] = getPassengers();
  if (passengers.length >= 0) {
    for (let i = 0; i <= passengers.length; i++) {
      if (passengers[1].hasAcceptedCommunications) {
        if (passengers[i].emailAddress) {
          // 🤢 I am lost in the pyramid
          console.log("send trip details by email", passengers[i].emailAddress);
        }
        if (passengers[i].phoneNumber) {
          console.log("send trip details by SMS", passengers[i].phoneNumber);
        }
      }
    }
  }
}
function getPassengers() {
  return [];
}
