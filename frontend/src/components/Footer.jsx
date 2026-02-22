import { Link } from "react-router-dom";
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footerGlass">
      <div className="footerContent">
        <div className="footerBrand">
          <h3>Renaissance 2026</h3>
          <p>Innovate • Inspire • Integrate</p>
        </div>

        <div className="footerLinks">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/speakers">Speakers</Link>
          <Link to="/sponsors">Sponsors</Link>
        </div>

        <div className="footerBottom">
          © 2026 Renaissance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}