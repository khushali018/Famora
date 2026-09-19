const express = require("express");

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.post("/", createGoal);
router.get("/:householdId", getGoals);
router.put("/:goalId", updateGoal);
router.delete("/:goalId", deleteGoal);

module.exports = router;