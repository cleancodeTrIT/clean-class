// ❌
// 🤢 a bad naming reminder
const customers = getCustomers();
const numberOfCustomers = customers.length;
for (let i = 0; i < numberOfCustomers; i++) {
  // 🤢 what was cs meaning
  console.log("send invoices to", customers[i]);
}
customers.forEach((c) => console.log("send invoices to", c));

function getCustomers() {
  return [];
}
