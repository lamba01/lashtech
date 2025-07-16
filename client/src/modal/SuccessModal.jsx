// SuccessModal.jsx
import { Link } from "react-router-dom";
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl text-center space-y-4 max-w-sm sm:w-full w-11/12">
        <h2 className="text-xl font-bold text-green-600">
          🎉 Booking Successful!
        </h2>
        <p>Thank you for booking with us.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Close
          </button>
          <Link
            to="/bookings"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            View Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
