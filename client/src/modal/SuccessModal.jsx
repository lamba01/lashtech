// SuccessModal.jsx
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl text-center space-y-4 max-w-sm w-full">
        <h2 className="text-xl font-semibold">🎉 Booking Successful!</h2>
        <p>Thank you for booking with us.</p>
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
