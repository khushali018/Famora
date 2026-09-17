const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Mutual Fund",
        "Stocks",
        "Fixed Deposit",
        "Recurring Deposit",
        "Gold",
        "PPF",
        "NPS",
        "Other",
      ],
      required: true,
    },

    name: {
      type: String,
      trim: true,
      maxlength: 150,
      required: true,
    },

    institution: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    investedAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    currentValue: {
      type: Number,
      required: true,
      min: 0,
    },

    interestRate: {
      type: Number,
      min: 0,
      default: null,
    },

    expectedReturn: {
      type: Number,
      min: 0,
      default: null,
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    maturityDate: {
      type: Date,
      default: null,
    },

    tenure: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Matured"],
      default: "Active",
    },

    nominee: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investment", investmentSchema);