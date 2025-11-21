import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Manager from "./components/Manager";
import User from "./components/User";
import Clients from "./components/Clients";


const isTokenValid = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    
    if (decoded.exp < currentTime) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = isTokenValid(); 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    
    if (userRole === "admin") return <Navigate to="/admin" replace />;
    if (userRole === "manager") return <Navigate to="/manager" replace />;
    if (userRole === "user") return <Navigate to="/user" replace />;
    return <Navigate to="/" replace />;
  }

  return element;
};

import AddClientForm from "./components/Form"; 

import EditForm from "./components/EditForm"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} allowedRoles={["admin"]} />} />
        <Route path="/manager" element={<ProtectedRoute element={<Manager />} allowedRoles={["manager"]} />} />
        <Route path="/user" element={<ProtectedRoute element={<User />} allowedRoles={["user"]} />} />

      
        <Route path="/add-client" element={<ProtectedRoute element={<AddClientForm />} allowedRoles={["admin","manager"]} />} />

    
        <Route path="/edit-client/:id" element={<ProtectedRoute element={<EditForm />} allowedRoles={["admin","manager"]} />} />

        <Route path="/clients" element={<ProtectedRoute element={<Clients />} allowedRoles={["admin","manager"]} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
