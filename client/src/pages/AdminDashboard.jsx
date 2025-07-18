import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`);
      const data = await res.json();

      const now = new Date();

      // Automatically mark past confirmed bookings as completed
      const updatedBookings = await Promise.all(
        data.map(async (b) => {
          const bookingDate = new Date(`${b.date}T${b.time}`);
          if (b.status === "confirmed" && bookingDate < now) {
            await updateStatus(b._id, "completed");
            return { ...b, status: "completed" };
          }
          return b;
        })
      );

      setBookings(updatedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBookings(); // Refresh after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  });

  const filtered = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.date.includes(searchTerm) ||
      b.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((acc, curr) => acc + curr.total, 0);

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
          <h2 className="text-xl font-semibold">Calendar View</h2>
          <div className="h-40 overflow-y-auto text-sm text-gray-600 mt-2">
            {bookings.map((b) => (
              <div key={b._id} className="mb-1">
                {new Date(`${b.date}T${b.time}`).toLocaleString()}
              </div>
            ))}
          </div>
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
