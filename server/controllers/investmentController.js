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

module.exports = {
  createInvestment,
  getInvestments,
};