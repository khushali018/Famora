const Income = require("../models/Income");

const createIncome = async (req, res) => {
  try {
    const {
      household,
      member,
      amount,
      category,
      date,
      description,
      isRecurring,
    } = req.body;

    if (!household || !member || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Household, member, amount and category are required.",
      });
    }

    const income = await Income.create({
      household,
      member,
      amount,
      category,
      date,
      description,
      isRecurring,
    });

    return res.status(201).json({
      success: true,
      message: "Income added successfully.",
      income,
    });
  } catch (error) {
    console.error("Create income error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding income.",
    });
  }
};

const getIncome = async (req, res) => {
  try {
    const { householdId } = req.params;

    const income = await Income.find({
      household: householdId,
    })
      .populate("member", "name email")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      income,
    });
  } catch (error) {
    console.error("Get income error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting income.",
    });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;

    const income = await Income.findByIdAndUpdate(
      incomeId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income updated successfully.",
      income,
    });
  } catch (error) {
    console.error("Update income error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating income.",
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;

    const income = await Income.findByIdAndDelete(incomeId);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully.",
    });
  } catch (error) {
    console.error("Delete income error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting income.",
    });
  }
};

module.exports = {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
};