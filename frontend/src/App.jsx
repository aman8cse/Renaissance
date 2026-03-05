import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Events from './Pages/Events.jsx';
import Speakers from './Pages/Speakers.jsx';
import Sponsors from './Pages/Sponsor.jsx'; 
import Login from "./components/Login.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import AddEvent from "./components/AddEvent.jsx";
import Users from "./components/Users.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";
import './App.css';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;