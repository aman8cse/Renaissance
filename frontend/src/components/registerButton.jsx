import React from 'react';
import '../styles/registerButton.css';

export default function RegisterBtn({ name, style, onClick }) {

    return (
        <div onClick={onClick} style={style} className='button'>{name}</div>
    )
}