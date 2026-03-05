// OverlayLoader.jsx
import "../styles/loader.css";

export default function Loader() {
  return (
    <div className="overlayLoader">

      <div className="loaderCore">

        <div className="orbit orbit1"></div>
        <div className="orbit orbit2"></div>

        <div className="logoBreath">
          <img
            src="/renaissance-logo.png"
            alt="Renaissance"
            className="loaderLogo"
          />
        </div>

      </div>

    </div>
  );
}