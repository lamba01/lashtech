import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Modal from "react-modal";
const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== ADMIN_UID) {
        navigate("/"); // redirect to homepage or login
      }
    });

    return () => unsubscribe();
  });
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBookings();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filtered = bookings
    .filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.date.includes(searchTerm) ||
        b.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date

  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((acc, curr) => acc + curr.total, 0);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const selectedDateString = selectedDate?.toISOString().split("T")[0];

  const bookingsOnDate = bookings.filter((b) => b.date === selectedDateString);

  return (
    <div className="p-6 mt-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-2xl">{bookings.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl">₦{totalRevenue}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-semibold">Calendar</h2>
          {/* <Calendar onClickDay={handleDateClick} /> */}
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const dateStr = date.toISOString().split("T")[0];
                const hasBooking = bookings.some((b) => b.date === dateStr);
                return hasBooking ? "highlighted-date" : null;
              }
            }}
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by name, date or status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b._id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{b.name}</td>
                <td className="p-2 border">{b.phone}</td>
                <td className="p-2 border">{b.date}</td>
                <td className="p-2 border">{b.time}</td>
                <td
                  className={`p-2 border font-semibold ${getStatusColor(
                    b.status
                  )}`}
                >
                  {b.status}
                </td>
                <td className="p-2 border">₦{b.total}</td>
                <td className="p-2 border">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for date bookings */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
      >
        <h2 className="text-lg font-bold mb-4">
          Bookings on {selectedDateString}
        </h2>
        {bookingsOnDate.length === 0 ? (
          <p className="text-gray-500">No bookings for this date.</p>
        ) : (
          <ul className="space-y-2">
            {bookingsOnDate.map((b) => (
              <li key={b._id} className="border p-3 rounded">
                <div className="font-semibold">{b.name}</div>
                <div>{b.time}</div>
                <div className={`text-sm ${getStatusColor(b.status)}`}>
                  {b.status}
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 text-blue-600 text-sm underline"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

function getStatusColor(status) {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "confirmed":
      return "text-green-600";
    case "completed":
      return "text-blue-600";
    case "cancelled":
      return "text-red-500";
    default:
      return "";
  }
}

export default AdminDashboard;
