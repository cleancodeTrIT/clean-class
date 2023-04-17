// ❌
const isNotEmpty = Math.random() > 0.5;
// 🤢 express conditions in positive
if (isNotEmpty === false) {
  console.log("do nothing");
} else {
  console.log("do something");
}
