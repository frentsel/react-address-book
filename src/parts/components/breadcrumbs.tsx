import React from 'react';
import { NavLink } from 'react-router-dom';

function Breadcrumbs({ label }: { label: string }) {
  return (
    <ul className="breadcrumbs">
      <li><NavLink to={'/'}>Home</NavLink></li>
      <li>{label}</li>
    </ul>
  );
}

export default Breadcrumbs;
