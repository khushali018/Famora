const Household = require("../models/Household");
const HouseholdMember = require("../models/HouseholdMember");

const createHousehold = async (req, res) => {
  try {
    const { name, owner } = req.body;

    if (!name || !owner) {
      return res.status(400).json({
        success: false,
        message: "Household name and owner are required.",
      });
    }

    const household = await Household.create({
      name,
      owner,
    });
    
    await HouseholdMember.create({
       household: household._id,
       user: owner,
       role: "owner",
    });



    return res.status(201).json({
      success: true,
      message: "Household created successfully.",
      household,
    });
  } catch (error) {
    console.error("Create household error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the household.",
    });
  }
};


const getHousehold = async (req, res) => {
  try {
    const { owner } = req.params;

    const household = await Household.findOne({
      owner: owner,
    });

    if (!household) {
      return res.status(404).json({
        success: false,
        message: "Household not found.",
      });
    }

    return res.status(200).json({
      success: true,
      household,
    });
  } catch (error) {
    console.error("Get household error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting the household.",
    });
  }
};

const getHouseholdMembers = async (req, res) => {
  try {
    const { householdId } = req.params;

    const household = await Household.findById(householdId);

    if (!household) {
      return res.status(404).json({
        success: false,
        message: "Household not found.",
      });
    }

    let members = await HouseholdMember.find({
      household: householdId,
    }).populate("user", "name email");

    if (members.length === 0) {
      await HouseholdMember.create({
        household: household._id,
        user: household.owner,
        role: "owner",
      });

      members = await HouseholdMember.find({
        household: householdId,
      }).populate("user", "name email");
    }

    // Remove duplicate users from the response
    const uniqueMembers = [];
    const seenUsers = new Set();

    for (const member of members) {
      const userId = member.user?._id?.toString();

      if (userId && !seenUsers.has(userId)) {
        seenUsers.add(userId);
        uniqueMembers.push(member);
      }
    }

    return res.status(200).json({
      success: true,
      members: uniqueMembers,
    });
  } catch (error) {
    console.error("Get household members error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting household members.",
    });
  }
};


module.exports = {
  createHousehold,
  getHousehold,
  getHouseholdMembers,
};