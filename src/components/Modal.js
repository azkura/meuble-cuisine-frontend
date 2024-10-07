// src/components/Modal.js
import React from 'react';
import './Modal.css'; // Optionnel : Ajoutez des styles pour votre modale

function Modal({ title, isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null; // Ne rien rendre si la modale n'est pas ouverte

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={onSubmit}>Sauvegarder</button>
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
