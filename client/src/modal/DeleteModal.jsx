import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, booking }) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
        <p className="mb-6">
          Are you sure you want to cancel your booking for{" "}
          <strong>{booking.category}</strong> on <strong>{booking.date}</strong>{" "}
          at <strong>{booking.time}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
