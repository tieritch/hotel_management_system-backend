/*const auth = require("./auth");

module.exports = { auth };*/

const readDir = require("../utilities/fs");
const middlewares = readDir(__dirname);
module.exports = middlewares;
