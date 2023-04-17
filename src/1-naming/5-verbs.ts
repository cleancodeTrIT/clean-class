class Client {}
// ❌
function client() {
  // 🤢 what are you doing with a client?
  return new Client();
}
function allowed() {
  // 🤢 are you asking me?
  return false;
}
