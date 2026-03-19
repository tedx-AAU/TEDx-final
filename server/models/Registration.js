const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, required: true },
    isStudent: { type: String, required: true },
    university: { type: String, default: '-' },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    heard: { type: String, required: true },
    about: { type: String, required: false },
    numberOfTickets: { type: Number, default: 1 },
    status: { type: String, default: 'Pending' },
    customerNumber: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
