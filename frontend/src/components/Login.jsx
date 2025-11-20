import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleLogin = async () => {
const res = await fetch("http://localhost:5000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const data = await res.json();
if (data.error) {
  alert("Invalid credentials");
  return;
}
localStorage.setItem("user", JSON.stringify(data));
if (data.role === "admin") navigate("/admin");
else if (data.role === "manager") navigate("/manager");
else navigate("/user");
};
return (
<div>
<h2>Login</h2>
<input
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)}
/><br/>
<input
  placeholder="Password"
  type="password"
  onChange={(e) => setPassword(e.target.value)}
/><br/>
<button onClick={handleLogin}>Login</button>
<p>Not registered? <a href="/register">Register</a></p>
</div>
);
}
