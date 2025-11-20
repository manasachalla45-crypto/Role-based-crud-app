
import Form from "./Form";
import Clients from "./Clients";
export default function Admin() {
return (
<div>
<h2>Admin Dashboard</h2>
<Form />   
<Clients role="admin" /> 
</div>
);
}
