import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import MyProfile from './components/dashboard/MyProfile';
import WelnessGoals from './components/dashboard/WelnessGoals';
import Messages from './components/dashboard/Messages';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/welness-goals" element={<WelnessGoals />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
