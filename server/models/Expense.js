const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
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
        "Food",
        "Groceries",
        "Transport",
        "Fuel",
        "Shopping",
        "Education",
        "Healthcare",
        "Entertainment",
        "Bills",
        "Subscriptions",
        "EMI",
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

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Debit Card",
        "Credit Card",
        "Bank Transfer",
        "Other",
      ],
      default: "Other",
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    receipt: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);