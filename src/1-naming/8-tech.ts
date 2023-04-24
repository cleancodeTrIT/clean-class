// ❌
function getEmployeeArray(paramCompanyNameString: string) {
  // 🤢 too much technique and little business
  return findInMongo(paramCompanyNameString);
}
function findInMongo(searchTerm: string) {
  console.log("findInMongo", searchTerm);
}

// ✅
// function getEmployees(companyName: string) {
//   return findByCompanyName(companyName);
// }
// function findByCompanyName(companyName: string) {
//   console.log("findByCompanyName", companyName);
// }
