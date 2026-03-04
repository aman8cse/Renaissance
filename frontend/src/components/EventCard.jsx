import React from "react";
import '../styles/registerButton.css';
import '../styles/eventCard.css';

export default function EventCard({ title, slug, eventType, description, bannerImage, startDatetime, endDatetime, location, entryFeeCoins, extraDetails, btn }) {

  return (
    <div className="eventCard">

      <img src={bannerImage} alt={title} className="eventImage" />

      <div className="eventContent">
        <h3>{title}</h3>
        <p className="eventMeta">{startDatetime} • {location}</p>
        <p className="eventDescription">{description}</p>
        {btn}
      </div>
    </div>
  );
}