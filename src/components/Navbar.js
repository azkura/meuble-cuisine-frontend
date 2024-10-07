// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importer le CSS pour le style du navbar

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Gestion des Clients</h1>
      <div className="nav-links">
        <Link to="/" className="nav-button">Accueil</Link>
        <Link to="/clients" className="nav-button">Clients</Link>
        <Link to="/clients-vendus" className="nav-button">Clients Vendus</Link>
      </div>
    </nav>
  );
}

export default Navbar;
