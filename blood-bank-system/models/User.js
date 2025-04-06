const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { 
    type: String, 
    enum: ['donor', 'hospital', 'admin'], 
    default: 'donor',
    required: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index for faster queries
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);

