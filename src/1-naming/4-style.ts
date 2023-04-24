// ❌
const created_at = new Date(); // 🤢 avoid _symbols_
const workingDays = 5; // 🤢 a const primitive is a CONSTANT
function Calculate_payroll() {
  // 🤢 oh lord... Hell_case
}
class employee {
  // 🤢 type definition should be PascalCase
}
interface IPayable {
  // 🤢 an interface is not a class; find a good name
}

// ✅
// const createdAt = new Date(); // 😏 camelCaseIsEasyToRead
// const WORKING_DAYS = 5; // 😏 CONSTANTS SHOULD SCREAM
// function calculatePayroll() {
//   😏 function naming is naming
// }
// class Employee {
//   😏 TypeDeficnition
// }
// interface Pay {
//   😏 is about the behavior
// }
