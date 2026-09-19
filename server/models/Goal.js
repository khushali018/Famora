const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
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

    name: {
      type: String,
      trim: true,
      maxlength: 150,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Emergency",
        "Travel",
        "Education",
        "Personal",
        "Vehicle",
        "Home",
        "Wedding",
        "Other",
      ],
      required: true,
    },

    targetAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    currentAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    targetDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "Paused"],
      default: "Active",
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

module.exports = mongoose.model("Goal", goalSchema);