import React from 'react'
import '../styles/homepage.css';
import RegisterBtn from './registerButton';

export default function Homepage() {
    return(
        <div className="homepage">
            <h3>Presenting</h3>
            <div className="headline">Renaissance'26</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus vel assumenda accusantium vitae hic voluptas possimus maxime enim aliquam culpa atque sed tenetur ab, delectus saepe fugit pariatur. Dolores, omnis.</p>
            <br />
            <div className="cta">
                <RegisterBtn name={"Register"}/>
                <RegisterBtn name={"Buy Pass"} style={{background: "linear-gradient(90deg, #F1E821, #23C0AD, #487AFA)"}}/>
            </div>
        </div>
    )
}