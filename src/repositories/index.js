const readDir = require("../utilities/fs");
const repositories = readDir(__dirname);
//console.log(JSON.stringify(repositories));
module.exports = repositories;
console.log(`reposits from repo ${JSON.stringify(repositories)} `);
