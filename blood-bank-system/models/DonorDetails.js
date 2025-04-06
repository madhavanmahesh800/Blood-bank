const mongoose = require("mongoose");

const donorDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: Number,
  bloodGroup: String,
  address: String,
  lastDonationDate: Date,
  phone: String,
});

module.exports = mongoose.model("DonorDetails", donorDetailsSchema);
