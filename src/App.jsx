import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import MyProfile from "./components/dashboard/MyProfile";
import WelnessGoals from "./components/dashboard/WelnessGoals";
import Messages from "./components/dashboard/Messages";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import "./App.css";
import Index from "./components/home/Index";
import Sidebar from "./components/dashboard/Sidebar";

function App() {
  const RoleLanding = ({ role }) => (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h2 style={{ color: "#87CEEB", fontWeight: 800 }}>Welcome, {role}!</h2>
      <p>Hook your {role.toLowerCase()} dashboard here.</p>
    </div>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/doctor" element={<RoleLanding role="Doctor" />} />
        <Route path="/user" element={<RoleLanding role="User" />} />
        <Route path="/user/" element={<Sidebar />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/my-profile" element={<MyProfile />} />
          <Route path="/user/welness-goals" element={<WelnessGoals />} />
          <Route path="/user/messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
