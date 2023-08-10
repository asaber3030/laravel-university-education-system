import React from 'react';

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NotFoundAlert({ type = 'secondary', text, icon = faExclamationTriangle }) {
  return (
    <div className={`alert alert-sm alert-${type}`}><FontAwesomeIcon icon={icon} style={{ marginRight: 7 }} /> {text}</div>
  );
}

export default NotFoundAlert;
