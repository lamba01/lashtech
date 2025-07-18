import React, { useState } from "react";

const EditModal = ({ isOpen, onClose, onSave, booking, error, setError }) => {
  const [date, setDate] = useState(booking?.date || "");
  const [time, setTime] = useState(booking?.time || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const selectedDate = new Date(`${date}T${time}`);
    const now = new Date();

    // Block past dates and times
    if (selectedDate < now) {
      setError("You cannot select a past time.");
      return;
    }

    // Block Sundays
    if (selectedDate.getDay() === 0) {
      setError("Bookings cannot be made on Sundays.");
      return;
    }

    // Block outside working hours
    const hours = selectedDate.getHours();
    if (hours < 8 || hours >= 18) {
      setError("Booking time must be between 8:00 AM and 6:00 PM.");
      return;
    }

    // If all checks pass, save
    onSave({ ...booking, date, time });
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 bg-opacity-50 flex items-center justify-center px-4 sm:px-0">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 capitalize">
          reschedule your booking
        </h2>
        {error && (
          <p className="text-sm text-red-600 bg-red-100 rounded p-2 mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                setError(""); // Clear error when closing modal
              }}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
