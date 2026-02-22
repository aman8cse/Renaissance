import { Outlet } from "react-router-dom";
import TorchLight from "./TorchLight.jsx";
import Background from "./Background";
import Theme from "../components/Theme.jsx";
import Navbar from "../components/Navbar";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <> 
      <Theme />
      <Navbar />
      <main className="pageContent">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}