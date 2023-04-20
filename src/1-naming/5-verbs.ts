class Client {}
// ❌
// function client() {
//   // 🤢 what are you doing with a client?
//   return new Client();
// }
// function allowed() {
//   // 🤢 are you asking me?
//   return false;
// }

// ✅
function createClient() {
  // 😏 a verb in a function tells what she does
  return new Client();
}
function isAllowed() {
  // 😏 is, has, can, must... help reading and understanding
  return true;
}
