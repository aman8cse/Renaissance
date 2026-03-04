import React, { useEffect, useState } from 'react'
import '../styles/event.css';
import RegisterBtn from '../components/registerButton';
import EventCard from '../components/EventCard'

export default function Event() {
    const [eventsData, setEventsData] = useState([]);

    async function getAllEvents() {
        try {
            const res = await fetch("http://localhost:5000/api/events/get-all", {
                method: "GET",
                credentials: "include",
            })

            if(!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                return;
            }

            const data = await res.json();
            setEventsData(data.events);

        } catch (err) {
            console.log("Error:", err);
            alert(err);
        }
    }
    async function handleRegister(slug) {
        try{
            const res = await fetch(`http://localhost:5000/api/events/${slug}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            if(!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                return;
            }

            const response = await res.json();
            alert(response.message);

        } catch (err) {
            console.log("Registration error: ", err);
            alert("Registration service not working");
        }
    }
    useEffect(() => {
        getAllEvents();
    }, []);

    return (
        <div className="event">
            {eventsData.map(event => (
                <EventCard
                    key={event._id}
                    title={event.title}
                    slug={event.slug}
                    eventType={event.eventType}
                    description={event.description}
                    bannerImage={event.bannerImage}
                    startDatetime={event.startDatetime}
                    endDatetime={event.endDatetime}
                    location={event.location}
                    entryFeeCoins={event.entryFeeCoins}
                    extraDetails={event.extraDetails}
                    btn={<RegisterBtn onClick={() => handleRegister(event.slug)} name={"Register"}/>}
                />
            ))}
        </div>
    )
}