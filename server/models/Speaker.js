const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Speaker name is required'],
      trim: true,
    },
    photoUrl: {
      type: String,
      required: [true, 'Speaker photo is required'],
    },
    linkedinUrl: {
      type: String,
      required: [true, 'Speaker linkedin URL is required'],
    },
    order: {
      type: Number,
      required: [true, 'Speaker order is required'],
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

speakerSchema.index({ order: 1 });

module.exports = mongoose.model('Speaker', speakerSchema);
