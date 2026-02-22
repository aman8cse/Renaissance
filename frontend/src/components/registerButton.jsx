import React from 'react';
import '../styles/registerButton.css';

export default function RegisterBtn({ name, style }) {

    return (
        <div style={style} className='button'>{name}</div>
    )
}