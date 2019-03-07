import React from 'react';

export default function ProfilePic({ first, last, onClick, image='/avatar2.png'}) {
    return (
        <img
            src={image}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
    )
}
