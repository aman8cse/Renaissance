import React from 'react'
import '../styles/speakers.css';
import SpeakerCard from '../components/SpeakerCard'

export default function Speakers() {
    const speakersData = [
        {
            id: 1,
            name: "Dr. Arjun Mehta",
            role: "AI Research Scientist",
            company: "NeuroTech Labs",
            image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        },
        {
            id: 2,
            name: "Sara Williams",
            role: "Product Design Lead",
            company: "InnovateX",
            image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        },
        {
            id: 3,
            name: "Rahul Verma",
            role: "Cyber Security Expert",
            company: "SecureNet",
            image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
        },
        {
            id: 4,
            name: "Emily Chen",
            role: "Startup Founder",
            company: "FutureWave",
            image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        },
    ];

    return (
        <div className="speakers">
      {speakersData.map(speaker => (
        <SpeakerCard
          key={speaker.id}
          name={speaker.name}
          role={speaker.role}
          company={speaker.company}
          image={speaker.image}
        />
      ))}
    </div>
    )
}
