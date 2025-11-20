import { useEffect, useState } from "react";

export default function User() {
const [clients, setClients] = useState([]);
useEffect(() => {
fetch("http://localhost:5000/clients")
.then((res) => res.json())
.then((data) => setClients(data))
.catch((err) => console.error(err));
}, []);

return (
<div style={{ padding: 20 }}>
<h1>User Dashboard</h1>
<h2>Client List</h2>
<table border="1" cellPadding="8">
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Job Role</th>
</tr>
</thead>
<tbody>
  
{clients.map((c) => (
<tr key={c.id}>
  <td>{c.id}</td>
  <td>{c.name}</td>
  <td>{c.job_role}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}

