// ❌
const isNotEmpty = Math.random() > 0.5;
// 🤢 express conditions in positive
if (isNotEmpty === false) {
  console.log("do nothing");
} else {
  console.log("do something");
}

// ✅
// const hasValue = Math.random() > 0.5;
// // 😏 easy to read
// if (hasValue) {
//   console.log("do nothing");
// } else {
//   console.log("do something");
// }
// // Alternative for early returns
// if (!hasValue) {
//   console.log("returning...");
// }
// console.log("do something");
