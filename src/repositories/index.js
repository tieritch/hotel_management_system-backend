const readDir = require("../utilities/fs");
const repositories = readDir(__dirname);
module.exports = repositories;
