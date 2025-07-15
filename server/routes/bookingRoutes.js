// const express = require("express");
// const router = express.Router();
// const { createBooking } = require("../controllers/bookingController");

// router.post("/", createBooking);

// module.exports = router;

// In routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/user/:userId", getUserBookings);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
