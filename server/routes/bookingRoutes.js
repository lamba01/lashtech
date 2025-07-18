// In routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
  getAllBookings,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/user/:userId", getUserBookings);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/", getAllBookings);

module.exports = router;
