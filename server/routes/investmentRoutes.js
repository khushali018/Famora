const express = require("express");

const {
  createInvestment,
  getInvestments,
} = require("../controllers/investmentController");

const router = express.Router();

router.post("/", createInvestment);

router.get("/:householdId", getInvestments);

module.exports = router;