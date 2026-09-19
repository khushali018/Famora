const Goal = require("../models/Goal");

// Create a goal
const createGoal = async (req, res) => {
  try {
    const {
      household,
      member,
      name,
      category,
      targetAmount,
      currentAmount,
      targetDate,
      status,
      description,
    } = req.body;

    if (
      !household ||
      !member ||
      !name ||
      !category ||
      targetAmount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Household, member, name, category and target amount are required.",
      });
    }

    const goal = await Goal.create({
      household,
      member,
      name,
      category,
      targetAmount,
      currentAmount,
      targetDate,
      status,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Goal added successfully.",
      goal,
    });
  } catch (error) {
    console.error("Create goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding goal.",
    });
  }
};

// Get all goals for a household
const getGoals = async (req, res) => {
  try {
    const { householdId } = req.params;

    const goals = await Goal.find({
      household: householdId,
    })
      .populate("member", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      goals,
    });
  } catch (error) {
    console.error("Get goals error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting goals.",
    });
  }
};

// Update a goal
const updateGoal = async (req, res) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findByIdAndUpdate(
      goalId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Goal updated successfully.",
      goal,
    });
  } catch (error) {
    console.error("Update goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating goal.",
    });
  }
};

// Delete a goal
const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findByIdAndDelete(goalId);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Goal deleted successfully.",
    });
  } catch (error) {
    console.error("Delete goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting goal.",
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};