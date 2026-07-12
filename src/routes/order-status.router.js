const express = require("express");
const { handleDBError } = require("../utilities");
const { OrderStatus } = require("@prisma/client");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movs = Object.values(OrderStatus);
    res.status(200).json(movs);
  } catch (err) {
    handleDBError(err, res, "OrderStatus");
  }
});

module.exports = router;
