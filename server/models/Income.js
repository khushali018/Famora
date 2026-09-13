const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
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

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "Salary",
        "Freelance",
        "Business",
        "Rental",
        "Bonus",
        "Interest",
        "Other",
      ],
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);