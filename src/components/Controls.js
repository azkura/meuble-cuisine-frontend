// src/components/Controls.js
import React from 'react';
import './Controls.css';

function Controls({ selectedMonth, onMonthChange, sortCriteria, sortOrder, onSortChange, onOrderChange, onNewClient, selectedStatus, onStatusChange }) {
  return (
    <div className="controls-container">
      <select value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)} className="control-item">
        <option value="">Tous les mois</option>
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

      <select value={sortCriteria} onChange={(e) => onSortChange(e.target.value)} className={`control-item ${sortCriteria ? 'active-sort' : ''}`}>
        <option value="">Trier</option>
        <option value="budget">Budget</option>
        <option value="dateEntree">Date d'entrée</option>
        <option value="dateDecision">Date de décision</option>
      </select>

      <select value={sortOrder} onChange={(e) => onOrderChange(e.target.value)} className="control-item">
        <option value="asc">Ordre croissant</option>
        <option value="desc">Ordre décroissant</option>
      </select>

      <select value={selectedStatus} onChange={(e) => onStatusChange(e.target.value)} className="control-item">
        <option value="">Tous les statuts</option>
        <option value="en cours">En cours</option>
        <option value="vendu">Vendu</option>
        <option value="perdu">Perdu</option>
      </select>

      <button onClick={onNewClient} className="control-item new-client-button">Nouveau Client</button>
    </div>
  );
}

export default Controls;
