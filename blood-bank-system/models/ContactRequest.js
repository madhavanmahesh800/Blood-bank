const mongoose = require("mongoose");

const contactRequestSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ContactRequest", contactRequestSchema);
