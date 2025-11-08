import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import MyProfile from './components/dashboard/MyProfile';
import WelnessGoals from './components/dashboard/WelnessGoals';
import Messages from './components/dashboard/Messages';
import Index from './components/home/Index';
import Sidebar from './components/dashboard/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Sidebar />} /> */}
        <Route path="/" element={<Index />} />
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
