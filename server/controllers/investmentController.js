const Investment = require("../models/Investment");

const createInvestment = async (req, res) => {
  try {
    const {
      household,
      member,
      type,
      name,
      institution,
      investedAmount,
      currentValue,
      interestRate,
      expectedReturn,
      startDate,
      maturityDate,
      tenure,
      status,
      nominee,
      description,
    } = req.body;

    if (
      !household ||
      !member ||
      !type ||
      !name ||
      investedAmount === undefined ||
      currentValue === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Household, member, type, name, invested amount and current value are required.",
      });
    }

    const investment = await Investment.create({
      household,
      member,
      type,
      name,
      institution,
      investedAmount,
      currentValue,
      interestRate,
      expectedReturn,
      startDate,
      maturityDate,
      tenure,
      status,
      nominee,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Investment added successfully.",
      investment,
    });
  } catch (error) {
    console.error("Create investment error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding investment.",
    });
  }
};

const getInvestments = async (req, res) => {
  try {
    const { householdId } = req.params;

    const investments = await Investment.find({
      household: householdId,
    })
      .populate("member", "name email")
      .sort({ startDate: -1 });

    return res.status(200).json({
      success: true,
      investments,
    });
  } catch (error) {
    console.error("Get investments error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting investments.",
    });
  }
};

const updateInvestment = async (req, res) => {
  try {
    const { investmentId } = req.params;

    const investment = await Investment.findByIdAndUpdate(
      investmentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Investment updated successfully.",
      investment,
    });
  } catch (error) {
    console.error("Update investment error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating investment.",
    });
  }
};

const deleteInvestment = async (req, res) => {
  try {
    const { investmentId } = req.params;

    const investment = await Investment.findByIdAndDelete(
      investmentId
    );

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Investment deleted successfully.",
    });
  } catch (error) {
    console.error("Delete investment error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting investment.",
    });
  }
};

module.exports = {
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment,
};