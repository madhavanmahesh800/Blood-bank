const mongoose = require("mongoose");

const emergencyAlertSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodGroup: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmergencyAlert", emergencyAlertSchema);
