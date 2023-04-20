// ❌
function getEmployees(companyName: string) {
  // 🤢 too much technique and little business
  return findByCompanyName(companyName);
}
function findByCompanyName(companyName: string) {
  console.log("findInMongo", companyName);
}
