import React from 'react'
import '../styles/about.css';
import RegisterBtn from './registerButton';

export default function About() {
    return(
        <div className="about"> 
            <div className="headline">About Renaissance'26</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus vel assumenda accusantium vitae hic voluptas possimus maxime enim aliquam culpa atque sed tenetur ab, delectus saepe fugit pariatur. Dolores, omnis.</p>
            <p className='liner'>"Rangers will always be there as Saviours"</p>
            <p className="outro">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam provident commodi architecto libero recusandae? Voluptatibus tempore nobis ipsam eaqueor</p>
        </div>
    )
}