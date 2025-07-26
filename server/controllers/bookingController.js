const Booking = require("../models/Booking");
const sendBookingEmail = require("../mailer");

const createBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      userId,
      category,
      selectedServices,
      lashAddOns = [],
      date,
      time,
      total,
      status = "confirmed", // Default status
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
      email,
      userId,
      category,
      selectedServices,
      lashAddOns,
      date,
      time,
      total,
      status,
    });
    await newBooking.save();
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedServices = selectedServices.map((s) => `• ${s}`).join("\n");
    const formattedTime = new Date(`${date}T${time}`).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Africa/Lagos",
      }
    );
    const formattedAddOns = lashAddOns.length
      ? `\n✨ Add-ons:\n${lashAddOns.map((a) => `• ${a}`).join("\n")}`
      : "";

    await sendBookingEmail(
      email,
      "Booking Confirmed – See You Soon!",
      `Hi ${name},

Your booking has been confirmed! Here are the details:

📅 Date: ${formattedDate}  
⏰ Time: ${formattedTime} (WAT) 
📂 Category: ${category}  
🛍️ Services: ${formattedServices}${formattedAddOns}

If you’d like to reschedule or view your appointment, you can do so anytime from your bookings page.

We look forward to seeing you!

– The Mcken Beauty Salon Team`
    );
    await sendBookingEmail(
      "moyinooluwafemi2004@gmail.com",
      "New Booking Received",
      `📢 A new booking was just made!

👤 Name: ${name}  
📧 Email: ${email}  
📂 Category: ${category}  
🛍️ Services:
${formattedServices}${formattedAddOns}

📅 Date: ${formattedDate}  
⏰ Time: ${formattedTime} (WAT)

Visit the admin dashboard to view more.`
    );

    res.status(201).json({ message: "Booking successful!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// GET all bookings for admin
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

// GET all bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

// PUT update a booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, status } = req.body;

    // Parse edited time
    const newTime = new Date(`${date}T${time}`);

    // Fetch bookings on the same date, excluding the current booking
    const bookingsOnSameDate = await Booking.find({
      date,
      _id: { $ne: id }, // exclude the booking being edited
    });

    const twoHours = 1000 * 60 * 60 * 2;

    // Check if any booking on same date conflicts within 2 hours
    for (const b of bookingsOnSameDate) {
      const existingTime = new Date(`${b.date}T${b.time}`);
      const diff = Math.abs(existingTime - newTime);

      if (diff < twoHours) {
        return res
          .status(400)
          .json({ message: `There's already a booking close to that time.` });
      }
    }

    // ✅ No conflict — now update the booking
    const updated = await Booking.findByIdAndUpdate(
      id,
      { date, time },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Booking not found." });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// DELETE a booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.json({ message: "Booking deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete booking." });
  }
};

// PUT update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Booking not found." });

    res.json({ message: "Status updated successfully.", booking: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status." });
  }
};


module.exports = {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
};
