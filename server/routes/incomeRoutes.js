const express = require("express");

const {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/", createIncome);

router.get("/:householdId", getIncome);

router.put("/:incomeId", updateIncome);

router.delete("/:incomeId", deleteIncome);

module.exports = router;