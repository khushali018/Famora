const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {
    const {
      household,
      member,
      amount,
      category,
      date,
      description,
      paymentMethod,
      isRecurring,
      receipt,
    } = req.body;

    if (!household || !member || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Household, member, amount and category are required.",
      });
    }

    const expense = await Expense.create({
      household,
      member,
      amount,
      category,
      date,
      description,
      paymentMethod,
      isRecurring,
      receipt,
    });

    return res.status(201).json({
      success: true,
      message: "Expense added successfully.",
      expense,
    });
  } catch (error) {
    console.error("Create expense error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding expense.",
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { householdId } = req.params;

    const expenses = await Expense.find({
      household: householdId,
    })
      .populate("member", "name email")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error("Get expenses error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting expenses.",
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully.",
      expense,
    });
  } catch (error) {
    console.error("Update expense error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating expense.",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await Expense.findByIdAndDelete(expenseId);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    console.error("Delete expense error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting expense.",
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};