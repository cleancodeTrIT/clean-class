// ❌
function getClient() {
  return "Alice";
}
// 🤢 is read the same as get?
function readProvider() {
  return "Bob";
}
// 🤢 is a customer the same as a client?
function postCustomer(name: string) {}

// ✅
// function getClient() {
//   return "Alice";
// }
// // 😏 same action, the same verb
// function getProvider() {
//   return "Bob";
// }
// // 😏 a client is always client
// function postClient(name: string) {}
