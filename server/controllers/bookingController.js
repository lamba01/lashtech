const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      category,
      selectedServices,
      lashAddOns = [],
      date,
      time,
      total,
    } = req.body;

    const bookingStart = new Date(`${date}T${time}`);
    const bookingEnd = new Date(bookingStart.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const existingBookings = await Booking.find({ date });

    const isOverlap = existingBookings.some((b) => {
      const existingStart = new Date(`${b.date}T${b.time}`);
      const existingEnd = new Date(
        existingStart.getTime() + 2 * 60 * 60 * 1000
      );
      return (
        (bookingStart >= existingStart && bookingStart < existingEnd) ||
        (bookingEnd > existingStart && bookingEnd <= existingEnd) ||
        (bookingStart <= existingStart && bookingEnd >= existingEnd)
      );
    });

    if (isOverlap) {
      return res.status(409).json({
        message:
          "That time overlaps with another booking. Please choose a different time.",
      });
    }

    const newBooking = new Booking({
      name,
      phone,
      category,
      selectedServices,
      lashAddOns,
      date,
      time,
      total,
    });
    await newBooking.save();

    res.status(201).json({ message: "Booking successful!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = { createBooking };
