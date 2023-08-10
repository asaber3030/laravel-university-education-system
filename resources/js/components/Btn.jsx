import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Btn({ disabled, children, handleClick, icon, color = 'dark', classes }) {
  return (
    <button disabled={disabled} onClick={handleClick} className={`btn btn-${color} btn-sm ${classes && classes}`}>
      <FontAwesomeIcon icon={icon} fixedWidth style={{ marginRight: 4 }} />
      {children}
    </button>
  )
}
