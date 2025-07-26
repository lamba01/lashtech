const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  selectedServices: [String],
  lashAddOns: [String],
  date: { type: String, required: true },
  time: { type: String, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
