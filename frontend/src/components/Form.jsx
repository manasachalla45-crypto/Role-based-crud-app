  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import apiClient from "./api"; 

  export default function Form() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleAdd = async () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole !== "admin" && userRole !== "manager") {
        alert("You are not authorized to add clients.");
        return;
      }

      try {
        await apiClient.post("/clients", form); 
        alert("Client added successfully");
        navigate("/admin");
      } catch (error) {
        console.error("Error adding client:", error);
        if (error.response && error.response.status === 403) {
            alert("You do not have permission to add clients.");
        } else {
            alert("Failed to add client.");
        }
      }
    };

    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#f4f6f8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Add Client
          </h3>

          <input
            placeholder="Client Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="Job Role"
            onChange={(e) => setForm({ ...form, job_role: e.target.value })}
            style={inputStyle}
          />

          <button onClick={handleAdd} style={addBtnStyle}>
            Add Client
          </button>

          <button onClick={() => navigate("/admin")} style={backBtnStyle}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  
  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const addBtnStyle = {
    width: "100%",
    padding: "10px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "8px",
  };

  const backBtnStyle = {
    width: "100%",
    padding: "10px",
    background: "#aaa",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
  };