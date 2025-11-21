import Clients from "./Clients";
import { useNavigate } from "react-router-dom";

export default function Manager() {
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
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
          marginBottom: "30px",
          marginTop: "20px"
        }}
      >
        <h2 style={{ margin: 0, color: "#333" }}>Manager Dashboard</h2>

        
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
      </div>

      <div style={{ width: "80%", maxWidth: "900px", margin: "0 auto" }}>
        <Clients role="manager" />
      </div>
    </div>
  );
}