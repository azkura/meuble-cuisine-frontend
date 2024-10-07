// src/components/StatusSelector.js
import React from 'react';
import './StatusSelector.css'; // Importer le fichier CSS pour les styles

function StatusSelector({ status, onStatusChange }) {
  // Gérer le changement de statut
  const handleChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(newStatus);
  };

  // Déterminer la classe de couleur en fonction du statut
  const getStatusClass = (status) => {
    switch (status) {
      case 'en cours':
        return 'status-in-progress';
      case 'vendu':
        return 'status-sold';
      case 'perdu':
        return 'status-lost';
      default:
        return '';
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className={`status-selector ${getStatusClass(status)}`}
    >
      <option value="en cours">En cours</option>
      <option value="vendu">Vendu</option>
      <option value="perdu">Perdu</option>
    </select>
  );
}

export default StatusSelector;
