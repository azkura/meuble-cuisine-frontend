// src/components/Actions.js
import React from 'react';
//import './Actions.css'; // Si vous avez besoin de styles spécifiques

function Actions({ onEdit, onDelete }) {
  return (
    <div className="actions-container">
      <button onClick={onEdit}>Modifier</button>
      <button onClick={onDelete}>Supprimer</button>
    </div>
  );
}

export default Actions;
