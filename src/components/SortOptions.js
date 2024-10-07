// src/components/SortOptions.js
import React from 'react';
import './SortOptions.css'; // Si vous avez besoin de styles spécifiques

function SortOptions({ sortCriteria, sortOrder, onSortChange, onOrderChange }) {
  return (
    <div className="sort">
      <label className="sort-label">Trier :</label>
      <select
        className="sort-select" // Classe CSS pour le style
        value={sortCriteria}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Aucun</option>
        <option value="budget">Budget</option>
        <option value="dateEntree">Date d'entrée</option>
        <option value="dateDecision">Date de décision</option>
      </select>

      <label className="sort-label">Ordre :</label>
      <select
        className="sort-select" // Classe CSS pour le style
        value={sortOrder}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value="asc">Croissant</option>
        <option value="desc">Décroissant</option>
      </select>
    </div>
  );
}

export default SortOptions;
