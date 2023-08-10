import React from 'react';
import {Link, usePage} from '@inertiajs/inertia-react';

export default function UserCard({ image, classes = null, text, secondText }) {

  const { appURL } = usePage().props

  return (
    <div className={`user-card ${classes && classes}`}>
      <div className="image">
        <img src={appURL + image} alt="Image" />
      </div>
      <div className="text">
        <h6>{text}</h6>
        <span>{secondText}</span>
      </div>
    </div>
  );
}
