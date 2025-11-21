import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      if (data.access_token && data.user_role) {
    
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("userRole", data.user_role);

        
        if (data.user_role === "admin") navigate("/admin");
        else if (data.user_role === "manager") navigate("/manager");
        else navigate("/user");
      } else {
        alert("invalid authentication");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unexpected login error");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f3f3f3" }}>
      <div style={{ width: "400px", background: "#fff", padding: "35px", borderRadius: "12px", boxShadow: "0 0 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", fontSize: "26px" }}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "16px" }}
        />

        <div style={{ width: "100%", marginBottom: "16px", position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", paddingRight: "40px", borderRadius: "6px", border: "1px solid #ddd" }}
          />
          <span onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "20px", color: "#444" }}>
            {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button onClick={handleLogin} style={{ width: "100%", padding: "12px", background: "#000", borderRadius: "8px", border: "none", cursor: "pointer", color: "#fff", fontWeight: "bold", fontSize: "15px", marginBottom: "15px" }}>
          Login
        </button>

        <p style={{ textAlign: "center" }}>
          Not registered? <a href="/register" style={{ color: "#0077ff", textDecoration: "none" }}>Register</a>
        </p>
      </div>
    </div>
  );
}
