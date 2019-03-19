import React from 'react';

export default function ProfilePic({ first, last, onClick, image})
   {
    image = image || '/avatar2.png';
    return (
      <div className="prodiv">
      <p className="secp">click the image to change your avatar</p>


        <img className="profile"
            width={100}
            height={100}
            src={image}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
        </div>
    )
}

//i need to fix this
