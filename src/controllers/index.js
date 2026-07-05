/*const userController = require("./user.controller");

module.exports = { userController };*/

const readDir = require("../utilities/fs");
const controllers = readDir(__dirname);
module.exports = controllers;
