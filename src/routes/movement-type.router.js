const express = require("express");
const prisma = require("../../prismaClient");
const { handleDBError } = require("../utilities");
const { MovementType } = require("@prisma/client");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //const movs = await prisma.MovementType.findMany();
    console.log(MovementType);
    const movs = Object.values(MovementType);
    res.status(200).json(movs);
  } catch (err) {
    handleDBError(err, res, "MovementType");
  }
});

module.exports = router;
