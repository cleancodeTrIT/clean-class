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
function createClient(): object {
  // 😏 a verb in a function tells what she does
  return new Client();
}
function isAllowed(): boolean {
  // 😏 is, has, can, must... help reading and understanding
  return true;
}
