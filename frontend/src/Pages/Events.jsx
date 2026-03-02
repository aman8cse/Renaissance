import React from 'react'
import '../styles/event.css';
import RegisterBtn from '../components/registerButton';
import EventCard from '../components/EventCard'

export default function Event() {
    const eventsData = [
        {
            id: 1,
            slug: "t1",
            title: "AI Innovation Summit",
            category: "Technical",
            date: "12 April 2026",
            time: "10:00 AM",
            venue: "Main Auditorium",
            description:
                "A deep dive into artificial intelligence, machine learning trends, and real-world industry applications.",
            image:
                "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
            badge: "Flagship",
        },
        {
            id: 2,
            slug: "t2",
            title: "Hack The Future",
            category: "Hackathon",
            date: "13 April 2026",
            time: "09:00 AM",
            venue: "Innovation Lab",
            description:
                "24-hour competitive coding hackathon focused on building impactful tech solutions.",
            image:
                "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
            badge: "Competitive",
        },
        {
            id: 3,
            slug: "t3",
            title: "Startup Pitch Arena",
            category: "Entrepreneurship",
            date: "14 April 2026",
            time: "02:00 PM",
            venue: "Seminar Hall",
            description:
                "Aspiring founders pitch their startup ideas to investors and industry experts.",
            image:
                "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
            badge: "Live Pitch",
        },
        {
            id: 4,
            slug: "t4",
            title: "Cyber Security Workshop",
            category: "Workshop",
            date: "15 April 2026",
            time: "11:30 AM",
            venue: "Tech Block - Room 204",
            description:
                "Hands-on workshop on ethical hacking, penetration testing, and modern cyber defense.",
            image:
                "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
            badge: "Workshop",
        },
        {
            id: 5,
            slug: "t5",
            title: "Robotics Showdown",
            category: "Competition",
            date: "16 April 2026",
            time: "01:00 PM",
            venue: "Open Arena",
            description:
                "Teams compete with autonomous robots in obstacle and combat challenges.",
            image:
                "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg",
            badge: "Battle",
        },
        {
            id: 6,
            slug: "t6",
            title: "UI/UX Design Sprint",
            category: "Creative",
            date: "17 April 2026",
            time: "03:00 PM",
            venue: "Design Studio",
            description:
                "Rapid design challenge to build intuitive and visually appealing digital experiences.",
            image:
                "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
            badge: "Design",
        },
    ]; 

    async function handleRegister(slug) {
        try{
            const res = await fetch(`http://localhost:5000/api/event/${slug}/register`, {
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

    return (
        <div className="event">
            {eventsData.map(event => (
                <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.venue}
                    description={event.description}
                    image={event.image}
                    badge={event.badge}
                    btn={<RegisterBtn onClick={() => handleRegister(event.slug)} name={"Register"}/>}
                />
            ))}
        </div>
    )
}