import React from "react";
import '../styles/sponsorsTrail.css';

export default function SponsorsTrail() {
  const sponsors = [
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  ];

  return (
    <div className="sponsorTrailWrapper"> 
      <div className="sponsorTrail">
        {[...sponsors, ...sponsors].map((logo, index) => (
          <div className="trailItem" key={index}>
            <img src={logo} alt="Sponsor" />
          </div>
        ))}
      </div>
    </div>
  );
}