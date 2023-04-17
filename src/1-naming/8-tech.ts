// ❌
function getEmployeeArray(paramCompanyNameString: string) {
  // 🤢 too much technique and little business
  return findInMongo(paramCompanyNameString);
}
function findInMongo(paramCompanyNameString: string) {
  console.log("findInMongo", paramCompanyNameString);
}
