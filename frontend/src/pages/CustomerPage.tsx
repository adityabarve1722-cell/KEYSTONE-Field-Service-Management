import { useEffect, useState } from "react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const loadCustomers = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8084/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = () => {
    const customer = {
      id: Number(id),
      name,
      email,
      phone,
      address,
    };

    const url =
      editingId === null
        ? "http://localhost:8084/customers"
        : `http://localhost:8084/customers/${editingId}`;

    const method = editingId === null ? "POST" : "PUT";

    const token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then(() => {
        clearForm();
        loadCustomers();
      })
      .catch((error) => console.error(error));
  };

  const deleteCustomer = (customerId: number) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8084/customers/${customerId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        loadCustomers();
      })
      .catch((error) => console.error(error));
  };

  const editCustomer = (customer: Customer) => {
    setEditingId(customer.id);
    setId(String(customer.id));
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setAddress(customer.address);
  };

  const clearForm = () => {
    setEditingId(null);
    setId("");
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
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
        <h2>Customer Management</h2>

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

        {/* Customer Form */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          <h3>
            {editingId === null ? "Add Customer" : "Edit Customer"}
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
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <br />
          <br />

          <button onClick={handleSubmit}>
            {editingId === null ? "Add Customer" : "Update Customer"}
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

        {/* Customer Table */}
        {customers.length === 0 ? (
          <p>No customers found.</p>
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
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>

                  <td>
                    <button
                      onClick={() => editCustomer(customer)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCustomer(customer.id)
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

export default CustomerPage;