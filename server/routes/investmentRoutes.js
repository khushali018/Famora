const express = require("express");

const {
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment,
} = require("../controllers/investmentController");

const router = express.Router();

router.post("/", createInvestment);

router.get("/:householdId", getInvestments);

router.put("/:investmentId", updateInvestment);

router.delete("/:investmentId", deleteInvestment);

module.exports = router;