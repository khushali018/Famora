const express = require("express");

const {
  createHousehold,
  getHousehold,
  getHouseholdMembers,
} = require("../controllers/householdController");

const router = express.Router();

router.post("/", createHousehold);
router.get("/:owner", getHousehold);
router.get("/:householdId/members", getHouseholdMembers);

module.exports = router;