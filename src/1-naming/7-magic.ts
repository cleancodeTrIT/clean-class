// ❌
export function calculateDiscount(price: number) {
  // 🤢 where these numbers came from?
  if (price > 1000) {
    return (price * 2) / 100;
  } else {
    return (price * 1) / 100;
  }
}
