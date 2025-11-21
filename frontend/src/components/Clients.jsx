import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  
  const loadClients = async () => {
    try {
      const res = await apiClient.get("/clients");
      setClients(res.data);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        navigate("/");
      } else {
        console.error("Failed to fetch clients:", err);
      }
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await apiClient.delete(`/clients/${id}`);
      loadClients(); 
    } catch (err) {
      console.error("Failed to delete client:", err);
      alert("Failed to delete client.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);

    if (!token) {
      navigate("/"); 
      return;
    }

    loadClients();
  }, [navigate]);

  return (
    <div style={{ width: "100%", background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 0 12px rgba(0,0,0,0.1)" }}>
      <h3 style={{ textAlign: "center", marginBottom: "15px", fontSize: "20px" }}>Client List</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ background: "#f1f1f1" }}>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Name</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Job Role</th>
            {(role === "admin" || role === "manager") && <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>{c.name}</td>
              <td style={{ padding: "12px" }}>{c.job_role}</td>
              {(role === "admin" || role === "manager") && (
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => navigate(`/edit-client/${c.id}`)}
                    style={{ padding: "6px 12px", marginRight: "8px", border: "none", background: "#3498db", color: "#fff", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{ padding: "6px 12px", border: "none", background: "#e74c3c", color: "#fff", borderRadius: "6px", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
