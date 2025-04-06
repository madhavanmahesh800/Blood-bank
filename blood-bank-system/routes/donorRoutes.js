const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { 
  submitDonorDetails, 
  getMyDetails, 
  updateAvailability,
  getAvailableDonors 
} = require("../controllers/donorController");

// Protected routes (require authentication)
router.post("/submit", auth, submitDonorDetails);
router.get("/me", auth, getMyDetails);
router.patch("/availability", auth, updateAvailability);

// Public route for searching available donors
router.get("/available", getAvailableDonors);

module.exports = router;
