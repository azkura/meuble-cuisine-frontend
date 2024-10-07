// src/components/StatusFilter.js
import React from 'react';
import './StatusFilter.css'; // Si vous avez besoin de styles spécifiques

function StatusFilter({ selectedStatus, onStatusChange }) {
  return (
    <div className="status-filter">
      <label className="status-filter-label">Statut :</label>
      <select
        className="status-filter-select" // Classe CSS pour le style
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">Tous</option>
        <option value="en cours">En cours</option>
        <option value="vendu">Vendu</option>
        <option value="perdu">Perdu</option>
      </select>
    </div>
  );
}

export default StatusFilter;
