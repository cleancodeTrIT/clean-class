// ❌
// 🤢 a bad naming reminder
const cs = customers();
const cn = cs.length;
for (let i = 0; i < cn; i++) {
  // 🤢 what was cs meaning
  console.log("send invoices to", cs[i]);
}
cs.forEach((c) => console.log("send invoices to", c));
function customers() {
  return [];
}

// ✅
// // 😏 well-named things always seem right
// const customers = getCustomers();
// const numberOfCustomers = customers.length;
// for (i = 0; i < numberOfCustomers; i++) {
//   // 😏 no doubt
//   console.log("send invoices to", customers[i]);
// }
// // 😏 it is ok for immediate-use
// customers.forEach((c) => console.log("send invoices to", c));
// function getCustomers() {
//   return [];
// }
