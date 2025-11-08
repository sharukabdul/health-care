import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import MyProfile from './components/dashboard/MyProfile';
import WelnessGoals from './components/dashboard/WelnessGoals';
import Messages from './components/dashboard/Messages';
import Sidebar from './components/dashboard/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="welness-goals" element={<WelnessGoals />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
