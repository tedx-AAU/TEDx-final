const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    numberOfTickets: {
      type: Number,
      required: [true, 'Number of tickets is required'],
      min: [0, 'Number of tickets cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
