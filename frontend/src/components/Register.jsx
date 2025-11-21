import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/Account-image.jpeg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert(data.message);
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.leftPane}>
          <img
            src={signupImage}
            alt="Register"
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
          />
        </div>

        <div style={styles.rightPane}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Register</h2>

        
          <div style={styles.row}>
            <div style={styles.cell}>
              <label>Name</label>
              <input
type="text"
placeholder="Enter Name"
style={styles.input}
value={form.name}
onChange={(e) => {
  const value = e.target.value;

  
  if (/^[A-Za-z\s]*$/.test(value)) {
    setForm({ ...form, name: value });
  }
}}
/>

    </div>

    <div style={styles.cell}>
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter Email"
        style={styles.input}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
    </div>
  </div>

  
  <div style={styles.row}>
    <div style={styles.cell}>
      <label>Password</label>
      <div style={styles.passwordBox}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <span
          style={styles.eyeIcon}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>
    </div>

    <div style={styles.cell}>
      <label>Confirm Password</label>
      <div style={styles.passwordBox}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />
        <span
          style={styles.eyeIcon}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <AiOutlineEyeInvisible />
          ) : (
            <AiOutlineEye />
          )}
        </span>
      </div>
    </div>
  </div>

  
  <div style={styles.row}>
    <div style={styles.cellFull}>
      <label>Select Role</label>
      <select
        style={styles.input}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="">Select</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
      </select>
    </div>
  </div>

  <button style={styles.btn} onClick={handleRegister}>
    Register
  </button>

  <button style={styles.linkBtn} onClick={() => navigate("/")}>
    Already have an Account?
  </button>
</div>
</div>
</div>
);
}

const styles = {
page: {
width: "100vw",
height: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#eaeaea",
},
card: {
width: "900px",
background: "#fff",
borderRadius: "8px",
display: "flex",
boxShadow: "0 0 10px rgba(0,0,0,0.2)",
},
leftPane: {
width: "45%"
},
rightPane: {
width: "55%",
padding: "30px",
},
row: {
display: "flex",
gap: "15px",
marginBottom: "15px",
},
cell: {
flex: 1,
background: "#f7f7ff",
padding: "10px",
borderRadius: "6px",
display: "flex",
flexDirection: "column",
},
cellFull: {
width: "100%",
background: "#f7f7ff",
padding: "10px",
borderRadius: "6px",
display: "flex",
flexDirection: "column",
},
input: {
padding: "8px",
marginTop: "5px",
borderRadius: "4px",
border: "1px solid #bbb",
outline: "none",
width: "100%",
boxSizing: "border-box",
paddingRight: "35px", 
},

passwordBox: {
position: "relative",
display: "flex",
alignItems: "center",
},
eyeIcon: {
position: "absolute",
right: "10px",
cursor: "pointer",
fontSize: "18px",
color: "#555",
},
btn: {
width: "100%",
marginTop: "15px",
padding: "10px",
background: "#4b44f3",
color: "#fff",
border: "none",
borderRadius: "6px",
cursor: "pointer",
fontSize: "16px",
},
linkBtn: {
width: "100%",
marginTop: "10px",
padding: "10px",
background: "#ddd",
border: "none",
borderRadius: "6px",
cursor: "pointer",
},
};
