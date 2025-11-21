import { useNavigate } from "react-router-dom";
import Clients from "./Clients";

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    
  
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8f8f8",
        padding: "0",
        margin: "0",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: "30px", 
          marginBottom: "20px",
          color: "#333",
          marginTop: "20px",
        }}
      >
        Admin Dashboard
      </h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        
      
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
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

        <button
          onClick={() => navigate("/add-client")}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "#3498db",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Add Client
        </button>

      </div>

      <div style={{ width: "80%", maxWidth: "900px" }}>
        <Clients role="admin" />
      </div>
    </div>
  );
}