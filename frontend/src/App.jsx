import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Events from './Pages/Events.jsx';
import Speakers from './Pages/Speakers.jsx';
import Sponsors from './Pages/Sponsor.jsx'; 
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<LandingPage/>} /> 
          <Route path="/events" element={<Events/>} /> 
          <Route path="/speakers" element={<Speakers/>} /> 
          <Route path="/sponsors" element={<Sponsors/>} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;