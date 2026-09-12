const mongoose = require("mongoose");

const householdMemberSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "HouseholdMember",
  householdMemberSchema
);