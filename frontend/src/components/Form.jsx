import { useState } from "react";
export default function Form() {
const [form, setForm] = useState({});
const handleAdd = async () => {
const res = await fetch("http://localhost:5000/clients", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
alert("Client added successfully");
window.location.reload();
};
return (
<div>
<h3>Add Client</h3>
<input
  placeholder="Client Name"
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/><br/>
<input
  placeholder="Job Role"
  onChange={(e) => setForm({ ...form, job_role: e.target.value })}
/><br/>
<button onClick={handleAdd}>Add</button>
</div>
);
}
