// src/components/Filter.js
import React from 'react';
import './Filters.css'; // Si vous avez besoin de styles spécifiques

function Filter({ selectedMonth, onMonthChange }) {
  return (
    <div className="filter">
      <label className="filter-label">Mois :</label>
      <select
        className="filter-select" // Classe CSS pour le style
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
      >
        <option value="">Tous</option>
        <option value="01">Janvier</option>
        <option value="02">Février</option>
        <option value="03">Mars</option>
        <option value="04">Avril</option>
        <option value="05">Mai</option>
        <option value="06">Juin</option>
        <option value="07">Juillet</option>
        <option value="08">Août</option>
        <option value="09">Septembre</option>
        <option value="10">Octobre</option>
        <option value="11">Novembre</option>
        <option value="12">Décembre</option>
      </select>
    </div>
  );
}

export default Filter;
