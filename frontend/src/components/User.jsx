import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); 

    fetch("http://localhost:5000/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setClients(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8f8f8",
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>User Dashboard</h2>
      
      
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 18px",
          marginBottom: "20px",
          border: "none",
          background: "#e74c3c", 
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>

      <div
        style={{
          width: "80%",
          maxWidth: "900px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Client List
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f1f1" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>ID</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Name</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Job Role</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px" }}>{c.id}</td>
                <td style={{ padding: "12px" }}>{c.name}</td>
                <td style={{ padding: "12px" }}>{c.job_role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}