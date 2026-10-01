import { useEffect, useState } from "react";
import CustomerPage from "./pages/CustomerPage";
import TechnicianPage from "./pages/TechnicianPage";
import WorkOrderPage from "./pages/WorkOrderPage";
import LoginPage from "./pages/LoginPage";

interface WorkOrder {
  id: number;
  status: string;
}

interface Customer {
  id: number;
}

interface Technician {
  id: number;
  status: string;
}

function App() {
  const [page, setPage] = useState("dashboard");

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const loadDashboardData = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("http://localhost:8084/workorders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setWorkOrders(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:8084/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));

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
    if (!isLoggedIn) {
      return;
    }

    loadDashboardData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const availableTechnicians = technicians.filter(
    (technician) => technician.status === "Available"
  ).length;

  const busyTechnicians = technicians.filter(
    (technician) => technician.status === "Busy"
  ).length;

  const completedWorkOrders = workOrders.filter(
    (workOrder) => workOrder.status === "Completed"
  ).length;

  const openWorkOrders = workOrders.filter(
    (workOrder) => workOrder.status !== "Completed"
  ).length;

  if (page === "customers") {
    return <CustomerPage />;
  }

  if (page === "technicians") {
    return <TechnicianPage />;
  }

  if (page === "workorders") {
    return <WorkOrderPage />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
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
        {/* Dashboard Title */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "5px" }}>Dashboard</h2>

            <p style={{ margin: 0, color: "#555" }}>
              Welcome, <strong>{username}</strong> ({role})
            </p>
          </div>

          <button
            onClick={loadDashboardData}
            style={{
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            Refresh Dashboard
          </button>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setPage("dashboard")}
            style={{ padding: "10px 18px", cursor: "pointer" }}
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("customers")}
            style={{ padding: "10px 18px", cursor: "pointer" }}
          >
            Customers
          </button>

          <button
            onClick={() => setPage("technicians")}
            style={{ padding: "10px 18px", cursor: "pointer" }}
          >
            Technicians
          </button>

          <button
            onClick={() => setPage("workorders")}
            style={{ padding: "10px 18px", cursor: "pointer" }}
          >
            Work Orders
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("role");
              setIsLoggedIn(false);
            }}
            style={{
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {/* Customers */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Total Customers</h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {customers.length}
            </p>
          </div>

          {/* Technicians */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Total Technicians</h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {technicians.length}
            </p>
          </div>

          {/* Available Technicians */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Available Technicians</h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {availableTechnicians}
            </p>
          </div>

          {/* Busy Technicians */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Busy Technicians</h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {busyTechnicians}
            </p>
          </div>

          {/* Total Work Orders */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Total Work Orders</h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {workOrders.length}
            </p>
          </div>

          {/* Open Work Orders */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Open Work Orders</h3>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {openWorkOrders}
            </p>
          </div>
        </div>

        {/* Work Order Status */}
        <div
          style={{
            backgroundColor: "white",
            marginTop: "30px",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Work Order Status</h2>

          <p>
            Total Work Orders:{" "}
            <strong>{workOrders.length}</strong>
          </p>

          <p>
            Open / In Progress:{" "}
            <strong>{openWorkOrders}</strong>
          </p>

          <p>
            Completed:{" "}
            <strong>{completedWorkOrders}</strong>
          </p>
        </div>

        {/* System Overview */}
        <div
          style={{
            backgroundColor: "white",
            marginTop: "30px",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>System Overview</h2>

          <p>
            The KEYSTONE Field Service Management Platform helps manage
            customers, technicians, and work orders from one centralized
            system.
          </p>

          <p>
            <strong>Logged-in User:</strong> {username}
          </p>

          <p>
            <strong>Role:</strong> {role}
          </p>

          <p>
            <strong>Authentication:</strong> JWT Protected
          </p>

          <p>
            <strong>Backend:</strong> Spring Boot
          </p>

          <p>
            <strong>Database:</strong> MySQL
          </p>

          <p>
            <strong>Frontend:</strong> React + TypeScript
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;