
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "./api"; 

export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const loadClient = async () => {
    try {
      const res = await apiClient.get(`/clients/${id}`);
      setForm(res.data);
    } catch (error) {
      console.error("Error fetching client:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert("Session expired or unauthorized. Please log in again.");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        navigate("/");
      } else {
        alert("Failed to load client data.");
      }
    }
  };

  const handleUpdate = async () => {
    const userRole = localStorage.getItem("userRole");
    if (!["admin", "manager"].includes(userRole)) {
      alert("You do not have permission to edit clients.");
      return;
    }
    try {
      await apiClient.put(`/clients/${id}`, form);
      alert("Client updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating client:", error);
      alert(error.response?.data?.error || "Failed to update client.");
    }
  };

  useEffect(() => {
    loadClient();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={formBoxStyle}>
        <h3 style={headingStyle}>Edit Client</h3>

        <input
          value={form.name || ""}
          placeholder="Client Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        <input
          value={form.job_role || ""}
          placeholder="Job Role"
          onChange={(e) => setForm({ ...form, job_role: e.target.value })}
          style={inputStyle}
        />

        <button onClick={handleUpdate} style={updateBtnStyle}>
          Update Client
        </button>

        <button onClick={() => navigate("/admin")} style={backBtnStyle}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  width: "100%",
  minHeight: "100vh",
  background: "#e8f0fe",  
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 15px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formBoxStyle = {
  width: "100%",
  maxWidth: "450px",
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  transition: "0.3s ease",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "22px",
  color: "#333",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  transition: "border-color 0.2s ease",
};

const updateBtnStyle = {
  width: "100%",
  padding: "14px",
  background: "#4a90e2",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "600",
  marginBottom: "12px",
  transition: "background 0.2s ease",
};

const backBtnStyle = {
  width: "100%",
  padding: "14px",
  background: "#999",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
  transition: "background 0.2s ease",
};
