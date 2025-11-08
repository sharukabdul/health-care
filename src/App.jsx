import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import MyProfile from "./components/dashboard/MyProfile";
import WelnessGoals from "./components/dashboard/WelnessGoals";
import Messages from "./components/dashboard/Messages";
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
        <Route path="/" element={<Sidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/welness-goals" element={<WelnessGoals />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/doctor" element={<RoleLanding role="Doctor" />} />
          <Route path="/user" element={<RoleLanding role="User" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
