import { useEffect, useState } from "react";
import EditForm from "./EditForm";

export default function Clients({ role }) {
const [clients, setClients] = useState([]);
const [editingClient, setEditingClient] = useState(null);

const loadClients = async () => {
const res = await fetch("http://localhost:5000/clients");
const data = await res.json();
setClients(data);
  };
useEffect(() => {      
loadClients();
}, []);

const handleDelete = async (id) => {
await fetch(`http://localhost:5000/clients/${id}`, {
    method: "DELETE",
    });
    loadClients();
};
return (
    <div>
<h2>Client List</h2>
<table border="1" cellPadding="8">
<thead>
<tr>
<th>Name</th>
<th>Job Role</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{clients.map((c) => (
<tr key={c.id}>
<td>{c.name}</td>
<td>{c.job_role}</td>
<td>
<button onClick={() => setEditingClient(c)}>Edit</button>
{role === "admin" && (
  <button onClick={() => handleDelete(c.id)}>Delete</button>
)}
</td>
</tr>
))}
</tbody>
</table>
{editingClient && <EditForm client={editingClient} />}
</div>
);
}
