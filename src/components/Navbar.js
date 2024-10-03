// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h2>Meuble Cuisine Suivi</h2>
      <ul>
        <li><Link to="/">Tableau de Bord</Link></li>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/rendezvous">Rendez-vous</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
