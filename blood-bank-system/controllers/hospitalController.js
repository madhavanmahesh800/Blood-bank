const Donor = require("../models/Donor");
const User = require("../models/User");

// Hospital fetches all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find()
      .populate("userId", "name email") // fetch name & email from User collection
      .sort({ createdAt: -1 });

    res.json(donors);
  } catch (err) {
    res.status(500).json({ msg: "Server error while fetching donors" });
  }
};
