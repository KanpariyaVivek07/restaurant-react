// Bookings.jsx - Updated
import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { 
    fetchBookings(); 
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to fetch bookings");
      }
    } catch (err) {
      setError("Network error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
        alert("Reservation cancelled successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to cancel reservation");
      }
    } catch (err) {
      alert("Error cancelling reservation");
    }
  };

  if (loading) return <p className="text-center p-6">Loading reservations...</p>;
  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
      {bookings.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Guests</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="text-center">
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.email}</td>
                <td className="border p-2">{new Date(b.date).toLocaleDateString()}</td>
                <td className="border p-2">{b.time}</td>
                <td className="border p-2">{b.guests}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;