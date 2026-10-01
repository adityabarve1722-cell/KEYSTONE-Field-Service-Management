import { useEffect, useState } from "react";

interface Technician {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: string;
}

function TechnicianPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [status, setStatus] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const loadTechnicians = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8084/technicians", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTechnicians(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadTechnicians();
  }, []);

  const handleSubmit = () => {
    const technician = {
      id: Number(id),
      name,
      email,
      phone,
      specialization,
      status,
    };

    const url =
      editingId === null
        ? "http://localhost:8084/technicians"
        : `http://localhost:8084/technicians/${editingId}`;

    const method = editingId === null ? "POST" : "PUT";

    const token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(technician),
    })
      .then((response) => response.json())
      .then(() => {
        clearForm();
        loadTechnicians();
      })
      .catch((error) => console.error(error));
  };

  const deleteTechnician = (technicianId: number) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8084/technicians/${technicianId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        loadTechnicians();
      })
      .catch((error) => console.error(error));
  };

  const editTechnician = (technician: Technician) => {
    setEditingId(technician.id);
    setId(String(technician.id));
    setName(technician.name);
    setEmail(technician.email);
    setPhone(technician.phone);
    setSpecialization(technician.specialization);
    setStatus(technician.status);
  };

  const clearForm = () => {
    setEditingId(null);
    setId("");
    setName("");
    setEmail("");
    setPhone("");
    setSpecialization("");
    setStatus("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          padding: "25px 40px",
        }}
      >
        <h1 style={{ margin: 0 }}>KEYSTONE</h1>

        <p style={{ margin: "8px 0 0" }}>
          Field Service Management Platform
        </p>
      </header>

      <main style={{ padding: "40px" }}>
        <h2>Technician Management</h2>

        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          <h3>
            {editingId === null
              ? "Add Technician"
              : "Edit Technician"}
          </h3>

          <input
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />

          <input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <br />
          <br />

          <button onClick={handleSubmit}>
            {editingId === null
              ? "Add Technician"
              : "Update Technician"}
          </button>

          {editingId !== null && (
            <button
              onClick={clearForm}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </div>

        {technicians.length === 0 ? (
          <p>No technicians found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              backgroundColor: "white",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.id}>
                  <td>{technician.id}</td>
                  <td>{technician.name}</td>
                  <td>{technician.email}</td>
                  <td>{technician.phone}</td>
                  <td>{technician.specialization}</td>
                  <td>{technician.status}</td>

                  <td>
                    <button
                      onClick={() => editTechnician(technician)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteTechnician(technician.id)
                      }
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default TechnicianPage;