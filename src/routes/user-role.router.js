const express = require("express");
const { userRoleController } = require("../controllers/user-role.controller");

const router = express.Router();

/*router.get("/", userRoleController.findAll);

router.get("/search", userRoleController.findBy);*/

module.exports = router;
