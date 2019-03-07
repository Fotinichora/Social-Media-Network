import React from 'react';

export default function ProfilePic({ first, last, onClick, image='https://www.focusshoulder.com.au/wp-content/uploads/2017/01/default-avatar-female.jpg'}) {
    return (
      <div>
      <p>click the image to change your avatar</p>


        <img
            width={200}
            height={200}
            src={image}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
        </div>
    )
}
