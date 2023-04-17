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
