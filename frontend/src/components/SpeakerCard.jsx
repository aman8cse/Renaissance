import React from "react";
import '../styles/speakerCard.css';

export default function SpeakerCard({ name, role, company, bio, image, featured, linkedin, twitter }) {

  return (
    <div className="speakerCard">
      {featured && <span className="speakerBadge">Featured</span>}

      <img src={image} alt={name} className="speakerImage" />

      <div className="speakerContent">
        <h3 className="speakerName">{name}</h3>
        <p className="speakerRole">{role}</p>
        <p className="speakerCompany">{company}</p>
        <p className="speakerBio">{bio}</p>

        <div className="speakerSocials">
          {linkedin && <a href={linkedin}>LinkedIn</a>}
          {twitter && <a href={twitter}>Twitter</a>}
        </div>
      </div>
    </div>
  );
}