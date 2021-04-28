const { Schema, model } = require('mongoose');

const logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    date: { type: Date, default: Date.now() },
    hidden: Boolean,
    visitDate: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true },
);

const LogEntry = model('LogEntry', logEntrySchema);

module.exports = LogEntry;
