import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
export default function Register() {
const [form, setForm] = useState({});
const navigate = useNavigate();
const handleRegister = async () => {
await fetch("http://localhost:5000/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
alert("Registered successfully");
navigate("/");
};
return (
<div>
<h2>Register</h2>
<input
placeholder="Username"
onChange={(e) => setForm({ ...form, name: e.target.value })}
/><br/>
<input
placeholder="Email"
onChange={(e) => setForm({ ...form, email: e.target.value })}
/><br/>
<input
placeholder="Password"
type="password"
onChange={(e) => setForm({ ...form, password: e.target.value })}
/><br/>
<select
onChange={(e) => setForm({ ...form, role: e.target.value })}
>
<option value="">Select Role</option>
<option value="admin">Admin</option>
<option value="manager">Manager</option>
<option value="user">User</option>
</select><br/>
<button onClick={handleRegister}>Register</button>
<a href="/">
  <button>Go to Login page</button>
</a>



</div>
);
}
