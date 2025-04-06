const Donor = require("../models/Donor");

// Submit donor details
exports.submitDonorDetails = async (req, res) => {
  try {
    const { bloodGroup, contact, location } = req.body;

    // Validate required fields
    if (!bloodGroup || !contact || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate blood group
    const validBloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    if (!validBloodGroups.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group" });
    }

    // Validate contact number
    if (!/^\d{10}$/.test(contact)) {
      return res.status(400).json({ message: "Invalid contact number format" });
    }

    // Check if donor already exists
    const existingDonor = await Donor.findOne({ userId: req.user._id });
    if (existingDonor) {
      return res.status(400).json({ message: "Donor details already exist" });
    }

    const newEntry = new Donor({
      userId: req.user._id,
      bloodGroup,
      contact,
      location,
      isAvailable: true,
      lastUpdated: new Date(),
    });

    await newEntry.save();
    res.status(201).json({ 
      message: "Donor details submitted successfully", 
      donor: newEntry 
    });
  } catch (err) {
    console.error("Donor submission error:", err);
    res.status(500).json({ message: "Server error while submitting donor details" });
  }
};

// Get donor's own info
exports.getMyDetails = async (req, res) => {
  try {
    const myDetails = await Donor.findOne({ userId: req.user._id });
    if (!myDetails) {
      return res.status(404).json({ message: "Donor details not found" });
    }
    res.json(myDetails);
  } catch (err) {
    console.error("Get donor details error:", err);
    res.status(500).json({ message: "Server error while fetching donor details" });
  }
};

// Update donor availability
exports.updateAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;
    
    if (typeof isAvailable !== 'boolean') {
      return res.status(400).json({ message: "Invalid availability status" });
    }

    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.status(404).json({ message: "Donor details not found" });
    }

    donor.isAvailable = isAvailable;
    donor.lastUpdated = new Date();
    await donor.save();

    res.json({ 
      message: "Availability updated successfully", 
      donor 
    });
  } catch (err) {
    console.error("Update availability error:", err);
    res.status(500).json({ message: "Server error while updating availability" });
  }
};

// Get all available donors by blood group
exports.getAvailableDonors = async (req, res) => {
  try {
    const { bloodGroup } = req.query;
    
    const query = { isAvailable: true };
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    const donors = await Donor.find(query)
      .select('-userId -__v')
      .sort({ lastUpdated: -1 });

    res.json(donors);
  } catch (err) {
    console.error("Get available donors error:", err);
    res.status(500).json({ message: "Server error while fetching available donors" });
  }
};
