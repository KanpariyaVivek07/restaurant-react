// Reservation.jsx - Updated
import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    tableType: "",
    specialRequests: "",
  });
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingReservation, setEditingReservation] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
    fetchReservations();
  }, [user]);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        console.error("Failed to fetch reservations");
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Validate date and time
    if (!formData.date || !formData.time) {
      setErrorMessage("Please select both date and time");
      setLoading(false);
      return;
    }

    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    if (selectedDateTime <= new Date()) {
      setErrorMessage("Please choose a future date/time.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const method = editingReservation ? "PUT" : "POST";
      const url = editingReservation
        ? `http://localhost:3001/api/bookings/${editingReservation.id}`
        : "http://localhost:3001/api/bookings";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(editingReservation ? "Reservation updated!" : "Reservation booked!");
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          date: "",
          time: "",
          guests: "2",
          tableType: "standard",
          specialRequests: "",
        });
        setEditingReservation(null);
        fetchReservations();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errData = await response.json();
        setErrorMessage(errData.error || "Failed to book reservation.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reservation?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        setReservations(reservations.filter((r) => r.id !== id));
        setSuccessMessage("Reservation deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errData = await response.json();
        setErrorMessage(errData.error || "Failed to delete reservation.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    }
  };

  const getBadge = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
      completed: "bg-blue-100 text-blue-700",
    };
    return (
      <span className={`px-2 py-1 rounded text-sm ${colors[status] || "bg-gray-200"}`}>
        {status}
      </span>
    );
  };

  const upcoming = reservations.filter(
    (r) => new Date(`${r.date}T${r.time}`) > new Date()
  );
  const past = reservations.filter(
    (r) => new Date(`${r.date}T${r.time}`) <= new Date()
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Book a Table</h1>

      {successMessage && <div className="p-3 bg-green-100 text-green-800 mb-4 rounded">{successMessage}</div>}
      {errorMessage && <div className="p-3 bg-red-100 text-red-800 mb-4 rounded">{errorMessage}</div>}

      {/* Reservation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 mb-10 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border rounded p-2 w-full" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border rounded p-2 w-full" required />
          <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border rounded p-2 w-full" required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="border rounded p-2 w-full" required min={new Date().toISOString().split('T')[0]} />
          <input type="time" name="time" value={formData.time} onChange={handleChange} className="border rounded p-2 w-full" required />
          <select name="guests" value={formData.guests} onChange={handleChange} className="border rounded p-2 w-full" required>
            {[...Array(6).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>{n + 1} Guest{n > 0 && "s"}</option>
            ))}
            <option value="7">7+ (Please call)</option>
          </select>
        </div>

        <select name="tableType" value={formData.tableType} onChange={handleChange} className="border rounded p-2 w-full">
          <option value="standard">Standard</option>
          <option value="booth">Booth</option>
          <option value="window">Window</option>
          <option value="outdoor">Outdoor</option>
          <option value="private">Private Room</option>
        </select>

        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special requests..."
          className="border rounded p-2 w-full"
          rows="3"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : editingReservation ? "Update Reservation" : "Book Table"}
        </button>
      </form>

      {/* Reservations List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Reservations</h2>

        {reservations.length === 0 ? (
          <p className="text-gray-500">No reservations found.</p>
        ) : (
          <>
            {upcoming.length > 0 && (
              <>
                <h3 className="font-semibold mb-2">Upcoming Reservations</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {upcoming.map((r) => (
                    <div key={r.id} className="border rounded-lg p-4 shadow-sm bg-white">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Reservation #{r.id}</h4>
                        {getBadge(r.status)}
                      </div>
                      <p><strong>Date:</strong> {new Date(r.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {r.time}</p>
                      <p><strong>Guests:</strong> {r.guests}</p>
                      <p><strong>Table:</strong> {r.table_type}</p>
                      {r.special_requests && <p><strong>Notes:</strong> {r.special_requests}</p>}
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setEditingReservation(r)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {past.length > 0 && (
              <>
                <h3 className="font-semibold mb-2">Past Reservations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {past.map((r) => (
                    <div key={r.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Reservation #{r.id}</h4>
                        {getBadge(r.status)}
                      </div>
                      <p><strong>Date:</strong> {new Date(r.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {r.time}</p>
                      <p><strong>Guests:</strong> {r.guests}</p>
                      <p><strong>Table:</strong> {r.table_type}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reservation;