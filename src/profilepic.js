import React from 'react';

export default function ProfilePic({ first, last, onClick, image='https://www.focusshoulder.com.au/wp-content/uploads/2017/01/default-avatar-female.jpg'}) {
    return (
      <div className="prodiv">
      <p className="secp">click the image to change your avatar</p>


        <img className="profile"
            width={150}
            height={150}
            src={image}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
        </div>
    )
}
