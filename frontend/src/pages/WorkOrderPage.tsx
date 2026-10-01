import { useEffect, useState } from "react";

interface WorkOrder {
  id: number;
  customer: string;
  serviceRequest: string;
  technician: string;
  priority: string;
  status: string;
  sla: string;
}

function WorkOrderPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  const [id, setId] = useState("");
  const [customer, setCustomer] = useState("");
  const [serviceRequest, setServiceRequest] = useState("");
  const [technician, setTechnician] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [sla, setSla] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const loadWorkOrders = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8084/workorders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setWorkOrders(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadWorkOrders();
  }, []);

  const handleSubmit = () => {
    const workOrder = {
      id: Number(id),
      customer,
      serviceRequest,
      technician,
      priority,
      status,
      sla,
    };

    const url =
      editingId === null
        ? "http://localhost:8084/workorders"
        : `http://localhost:8084/workorders/${editingId}`;

    const method = editingId === null ? "POST" : "PUT";

    const token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workOrder),
    })
      .then((response) => response.json())
      .then(() => {
        clearForm();
        loadWorkOrders();
      })
      .catch((error) => console.error(error));
  };

  const deleteWorkOrder = (workOrderId: number) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8084/workorders/${workOrderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        loadWorkOrders();
      })
      .catch((error) => console.error(error));
  };

  const editWorkOrder = (workOrder: WorkOrder) => {
    setEditingId(workOrder.id);
    setId(String(workOrder.id));
    setCustomer(workOrder.customer);
    setServiceRequest(workOrder.serviceRequest);
    setTechnician(workOrder.technician);
    setPriority(workOrder.priority);
    setStatus(workOrder.status);
    setSla(workOrder.sla);
  };

  const clearForm = () => {
    setEditingId(null);
    setId("");
    setCustomer("");
    setServiceRequest("");
    setTechnician("");
    setPriority("");
    setStatus("");
    setSla("");
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
        <h2>Work Order Management</h2>

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
            {editingId === null ? "Add Work Order" : "Edit Work Order"}
          </h3>

          <input
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            placeholder="Customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />

          <input
            placeholder="Service Request"
            value={serviceRequest}
            onChange={(e) => setServiceRequest(e.target.value)}
          />

          <input
            placeholder="Technician"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
          />

          <input
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />

          <input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <input
            placeholder="SLA"
            value={sla}
            onChange={(e) => setSla(e.target.value)}
          />

          <br />
          <br />

          <button onClick={handleSubmit}>
            {editingId === null ? "Add Work Order" : "Update Work Order"}
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

        {workOrders.length === 0 ? (
          <p>No work orders found.</p>
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
                <th>Customer</th>
                <th>Service Request</th>
                <th>Technician</th>
                <th>Priority</th>
                <th>Status</th>
                <th>SLA</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {workOrders.map((workOrder) => (
                <tr key={workOrder.id}>
                  <td>{workOrder.id}</td>
                  <td>{workOrder.customer}</td>
                  <td>{workOrder.serviceRequest}</td>
                  <td>{workOrder.technician}</td>
                  <td>{workOrder.priority}</td>
                  <td>{workOrder.status}</td>
                  <td>{workOrder.sla}</td>

                  <td>
                    <button
                      onClick={() => editWorkOrder(workOrder)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteWorkOrder(workOrder.id)}
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

export default WorkOrderPage;