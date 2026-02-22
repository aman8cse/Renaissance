import React from 'react' 
import SponsorCard from '../components/sponsorCard.jsx';
import '../styles/sponsor.css';

export default function Sponsor() {
    const sponsorsData = [
        {
            id: 1,
            name: "Microsoft",
            tier: "Title Sponsor",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            website: "https://www.microsoft.com"
        },
        {
            id: 2,
            name: "Amazon",
            tier: "Gold Sponsor",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            website: "https://www.amazon.com"
        },
        {
            id: 3,
            name: "Google",
            tier: "Gold Sponsor",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            website: "https://www.google.com"
        },
        {
            id: 4,
            name: "IBM",
            tier: "Silver Sponsor",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
            website: "https://www.ibm.com"
        },
        {
            id: 5,
            name: "Netflix",
            tier: "Community Partner",
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            website: "https://www.netflix.com"
        },
        {
            id: 6,
            name: "Tesla",
            tier: "Innovation Partner",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
            website: "https://www.tesla.com"
        }
    ];

    return (
        <div className="sponsor">
            {sponsorsData.map(sponsor => (
                <SponsorCard
                    key={sponsor.id}
                    image={sponsor.logo}
                    alt={sponsor.name}
                />
            ))}
        </div>
    )
}