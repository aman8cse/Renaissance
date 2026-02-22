import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from "gsap";
import '../styles/navbar.css';
import RegisterBtn from '../components/registerButton.jsx'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const options = ["Events", "Speakers", "Itenary", "Sponsors", "E-Cell"];
    const[menu, setMenu] = useState(false); 
    const menuRef = useRef(null);
    const mobileOptionRef = useRef([]);
    

    const mobileMenu = (<>
        <div ref={menuRef} className="mobileMenu">
            <br/>
            {options.map((option, i) => (
                <div onClick={() => navigate(`/${option.toLowerCase()}`)} key={i} ref={(el) => (mobileOptionRef.current[i] = el)} className='option'>{option}</div>
            ))}
            <RegisterBtn name={"Register"} />
            <br />
        </div>
        </>
    )
    return (
    <>
        <div className="navbar">
            <div className="logo" onClick={() => navigate("/")}>Renaissance</div>
            <div className='options'>
                {options.map((option, i) => (
                    <div key={i} className='option' onClick={() => navigate(`/${option.toLowerCase()}`)}>{option}</div>
                ))}
                <RegisterBtn name={"Register"} />
                <br />
            </div> 
            <div className="hamburger" onClick={() => setMenu(!menu)}>{menu ? "=" : "X"}</div> 
            {menu && mobileMenu}
        </div>
    </>
    )
}