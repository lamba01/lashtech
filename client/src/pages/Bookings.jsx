import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DeleteModal from "../modal/DeleteModal";
import EditModal from "../modal/EditModal";
import SuccessModal from "../modal/SuccessModal";

const BookingsPage = () => {
  const { user, loadingg } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editError, setEditError] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // ⬅ Scrolls to top
    }
  }, [user]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/bookings/user/${user.uid}`
        );
        const data = await res.json();
        setBookings(data);
        // console.log("Bookings fetched:", data);
      } catch (err) {
        setError("Failed to load bookings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  const handleDelete = async (booking) => {
    const now = new Date();
    const bookingTime = new Date(`${booking.date}T${booking.time}`);
    const timeDiff = (bookingTime - now) / (1000 * 60); // minutes

    if (timeDiff <= 30)
      return alert(
        "Booking can't be cancelled within 30 minutes to the appointment."
      );
    setBookingToDelete(booking); // open modal
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingToDelete._id}`,
        {
          method: "DELETE",
        }
      );
      setBookings((prev) => prev.filter((b) => b._id !== bookingToDelete._id));
      setShowDeleteModal(false);
      setBookingToDelete(null);
    } catch {
      alert("Failed to delete booking. Try again later.");
    }
  };
  const openEditModal = (booking) => {
    setBookingToEdit(booking);
    setShowEditModal(true);
  };
  const handleSaveEdit = async (updatedBooking) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/${updatedBooking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: updatedBooking.date,
            time: updatedBooking.time,
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setEditError(data.message || "Update failed");
        return;
      }

      const data = await res.json();

      setBookings((prev) => prev.map((b) => (b._id === data._id ? data : b)));
      setShowEditModal(false);
      setBookingToEdit(null);
      setShowSuccess(true);
      setEditError("");
    } catch (err) {
      console.error(err);
      setEditError("Failed to update booking. Please try again.");
    }
  };

  // 🔐 Safe to return UI only *after* all hooks
  if (loadingg) return <p className="text-center">Loading...</p>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Please log in to view your bookings.
          </h2>
          <a href="/login" className="text-blue-600 underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefefe] py-14 mt-10 px-4 sm:px-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Bookings</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-lg p-5 space-y-3 border border-gray-100"
            >
              <h3 className="text-xl font-semibold capitalize">{b.category}</h3>
              <p className="text-gray-600 text-sm">
                {b.selectedServices.join(", ")}
                <br />
                {b.lashAddOns?.length > 0 &&
                  `Add-ons: ${b.lashAddOns.join(", ")}`}
              </p>
              <p className="text-gray-700 font-medium">
                {new Date(b.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {b.time}
              </p>

              <p className="text-black font-bold">
                ₦{b.total.toLocaleString()}
              </p>
              <p className="text-black font-bold">Status: {b.status}</p>
              <div className="flex sm:flex-row flex-col gap-5 justify-between">
                <button
                  onClick={() => handleDelete(b)}
                  className="text-sm text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded order-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => openEditModal(b)}
                  className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded order-1 cursor-pointer"
                >
                  Reschedule Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          booking={bookingToDelete}
        />
      )}
      {showEditModal && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setBookingToEdit(null);
          }}
          onSave={handleSaveEdit}
          booking={bookingToEdit}
          error={editError}
          setError={setEditError}
        />
      )}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default BookingsPage;
