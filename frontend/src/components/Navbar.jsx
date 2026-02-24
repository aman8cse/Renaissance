import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
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

    function handleClick(option) {
        setMenu(false);
        if(option === "E-Cell") {
            window.open("https://www.edcjss.com/");
            return;
        }
         navigate(`/${option.toLowerCase()}`);
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    

    const mobileMenu = (<>
        <div ref={menuRef} className="mobileMenu">
            <br/>
            {options.map((option, i) => (
                <div onClick={() => handleClick(option)} key={i} ref={(el) => (mobileOptionRef.current[i] = el)} className='option'>{option}</div>
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
                    <div key={i} className='option' onClick={() => handleClick(option)}>{option}</div>
                ))}
                <RegisterBtn name={"Register"} />
                <br />
            </div> 
            <div className="hamburger" onClick={(e) => {e.stopPropagation(); setMenu(prev => !prev)}}>{menu ? "X" : "☰"}</div> 
            {menu && mobileMenu}
        </div>
    </>
    )
}