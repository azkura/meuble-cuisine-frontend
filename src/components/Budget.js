// src/components/Budget.js
import React from 'react';
import './Budget.css'; // Importer le fichier CSS pour les styles

function Budget({ amount }) {
  let className = '';

  if (amount <= 7000) {
    className = 'budget-orange';
  } else if (amount > 7000 && amount <= 10000) {
    className = 'budget-green'; // Changer en vert pour cette plage
  } else if (amount > 10000) {
    className = 'budget-red';
  }

  return <span className={className}>{amount} €</span>;
}

export default Budget;
