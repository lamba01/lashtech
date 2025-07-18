import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

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
                {b.date} — {b.time}
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
