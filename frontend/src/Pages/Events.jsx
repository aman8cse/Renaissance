import React, { useEffect, useState } from 'react'
import '../styles/event.css';
import RegisterBtn from '../components/registerButton';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';

export default function Event() {
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getAllEvents() {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/events/get-all", {
                method: "GET",
                credentials: "include",
            })

            if(!res.ok) {
                const errorData = await res.json();
                setLoading(false)
                alert(errorData.message);
                return;
            }

            const data = await res.json();
            setLoading(false)
            setEventsData(data.events);

        } catch (err) {
            console.log("Error:", err);
            setLoading(false)
            alert(err);
        }
    }
    async function handleRegister(slug) {
        setLoading(true)
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
                setLoading(false)
                alert(errorData.message);
                return;
            }

            const response = await res.json();
            setLoading(false)
            alert(response.message);

        } catch (err) {
            console.log("Registration error: ", err);
            setLoading(false)
            alert("Registration service not working");
        }
    }
    useEffect(() => {
        getAllEvents();
    }, []);

    return (
        <div className="event">
            {loading && <Loader/>}
            {eventsData.map(event => (
                <EventCard
                    key={event._id}
                    title={event.title}
                    slug={event.slug}
                    eventType={event.eventType}
                    description={event.description}
                    bannerImage={event.bannerImage || null}
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