import { useState } from "react";
export default function EditForm({ client }) {
  
const [form, setForm] = useState(client);
const handleUpdate = async () => {
await fetch(`http://localhost:5000/clients/${client.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
alert("Updated successfully");
window.location.reload();
};
return (
<div style={{ border: "1px solid gray", padding: 10, marginTop: 10 }}>
<h3>Edit Client</h3>
<input
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/><br/>
<input
  value={form.job_role}
  onChange={(e) => setForm({ ...form, job_role: e.target.value })}
/><br/>
<button onClick={handleUpdate}>Save</button>
</div>
);
}
