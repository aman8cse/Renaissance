import React from "react";
import RegisterBtn from "./registerButton";
import '../styles/registerButton.css';
import '../styles/eventCard.css';

export default function EventCard({ title, date, location, description, image, badge, onClick }) {

  const btn = (<div className='button'>Register</div>);

  return (
    <div className="eventCard">

      <img src={image} alt={title} className="eventImage" />

      <div className="eventContent">
        <h3>{title}</h3>
        <p className="eventMeta">{date} • {location}</p>
        <p className="eventDescription">{description}</p>
        {btn}
      </div>
    </div>
  );
}