import React from 'react'
import Navbar from '../components/Navbar'
import Homepage from '../components/Homepage'
import About from '../components/About'
import SponsorsTrail from '../components/SponsorsTrail'
import '../styles/landingPage.css';

export default function LandingPage() {
    return (
        <div className="LandingPage"> 
            <Homepage className={"homepage"}></Homepage>
            <About className={"about"}></About>
            <div className="heading">Past Sponsors</div>
            <SponsorsTrail></SponsorsTrail>
        </div>
    )
}