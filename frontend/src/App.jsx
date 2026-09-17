import { useState, useEffect } from "react";

function App() {
  const [tab, setTab] = useState("services");
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", duration: "" });
  const [bookingForm, setBookingForm] = useState({
    customer_name: "",
    customer_phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/services/")
      .then((r) => r.json())
      .then(setServices);
    fetch("/api/appointments/")
      .then((r) => r.json())
      .then(setAppointments);
  }, []);

  const loadAll = () => {
    fetch("/api/services/")
      .then((r) => r.json())
      .then(setServices);
    fetch("/api/appointments/")
      .then((r) => r.json())
      .then(setAppointments);
  };

  const addService = (e) => {
    e.preventDefault();
    fetch("/api/services/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        duration: Number(form.duration),
      }),
    })
      .then((r) => r.json())
      .then(() => {
        setForm({ name: "", price: "", duration: "" });
        loadAll();
      });
  };

  const book = (e) => {
    e.preventDefault();
    fetch("/api/appointments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...bookingForm,
        service: Number(bookingForm.service),
      }),
    }).then(async (r) => {
      const d = await r.json();
      if (!r.ok) alert(d.non_field_errors || JSON.stringify(d));
      else {
        alert("Booked!");
        setBookingForm({customer_name:'', customer_phone:'', service:'', date:'', time:'', notes:''});
        loadAll();
        setTab("appointments");
      }
    });
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h2>Salon Booking</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {["services", "booking", "appointments"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 20px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: tab === t ? "#333" : "#fff",
              color: tab === t ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {t === "services"
              ? "Services"
              : t === "booking"
                ? "New Booking"
                : "Appointments"}
          </button>
        ))}
      </div>

      {tab === "services" && (
        <div>
          <h3>Add Service</h3>
          <form
            onSubmit={addService}
            style={{ display: "flex", gap: 8, marginBottom: 24 }}
          >
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{
                padding: "8px 10px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              style={{
                padding: "8px 10px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <input
              placeholder="Duration (min)"
              type="number"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              required
              style={{
                padding: "8px 10px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                border: "none",
                background: "#333",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </form>

          {services.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                marginBottom: 8,
                background: "#096c85",
                borderRadius: 6,
              }}
            >
              <span>
                {s.name} · Rs.{s.price} · {s.duration}min
              </span>
              <button
                onClick={() =>
                  fetch(`/api/services/${s.id}/`, { method: "DELETE" }).then(
                    loadAll,
                  )
                }
                style={{
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #3b2f2f",
                  background: "#f3750e",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "booking" && (
        <form
          onSubmit={book}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 400,
          }}
        >
          <h3>Book Appointment</h3>
          <input
            placeholder="Customer Name"
            value={bookingForm.customer_name}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, customer_name: e.target.value })
            }
            required
            style={{
              padding: "10px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <input
            placeholder="Phone"
            value={bookingForm.customer_phone}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, customer_phone: e.target.value })
            }
            required
            style={{
              padding: "10px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <select
            value={bookingForm.service}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, service: e.target.value })
            }
            required
            style={{
              padding: "10px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={bookingForm.date}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, date: e.target.value })
            }
            required
            style={{
              padding: "10px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <input
            type="time"
            value={bookingForm.time}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, time: e.target.value })
            }
            required
            style={{
              padding: "10px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <input
            placeholder="Notes (optional)"
            value={bookingForm.notes}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, notes: e.target.value })
            }
            style={{
              padding: "10px",
              borderRadius: 4,
              border: "1px solid #10aeec",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: 4,
              border: "none",
              background: "#333",
              color: "#eb0784",
              cursor: "pointer",
            }}
          >
            Book
          </button>
        </form>
      )}

      {tab === "appointments" && (
        <div>
          <h3>Appointments</h3>
          {appointments.length === 0 && <p>No appointments yet. Book one!</p>}
          {appointments.map((a) => (
            <div
              key={a.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 16px",
                marginBottom: 10,
                background: "#02283a",
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" ,gap: 4}}>
                <strong>{a.customer_name}</strong> ({a.customer_phone})<br />
                <small>
                  {a.service_detail?.name} · {a.date} · {a.time}
                </small>
              </div>
              <div style={{ display: "flex", gap: 10}}>
                <select
                  value={a.status}
                  onChange={(e) =>
                    fetch(`/api/appointments/${a.id}/status/`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ status: e.target.value }),
                    }).then(loadAll)
                  }
                  style={{
              
                    padding: "6px 8px",
                    borderRadius: 4,
                    border: "1px solid #0de042",
                  }}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
                <button
                  onClick={() =>
                    fetch(`/api/appointments/${a.id}/`, {
                      method: "DELETE",
                    }).then(loadAll)
                  }
                  style={{
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "1px solid #0a4d74",
                    background: "#3f0410",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
