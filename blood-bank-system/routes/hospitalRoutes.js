const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { getAllDonors } = require("../controllers/hospitalController");

// Only hospital role can access this
router.get("/donors", auth, role("hospital"), getAllDonors);

module.exports = router;
