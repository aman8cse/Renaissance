import React from "react";
import '../styles/sponsorCard.css';

export default function SponsorCard({ image, alt }) {
  return (
    <div className="sponsorCard">
      <img src={image} alt={alt} className="sponsorImage" />
    </div>
  );
}