// src/components/NewClient.js
import React, { useState } from 'react';
import './NewClient.css';

function NewClient({ onAddClient, onUpdateClient, onClose, client }) {
  const [formData, setFormData] = useState(client || {
    nom: '',
    dateEntree: '',
    dateDecision: '',
    budget: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = 'Le nom est obligatoire.';
    if (!formData.dateEntree) newErrors.dateEntree = 'La date d\'entrée est obligatoire.';
    if (!formData.budget || formData.budget <= 0) newErrors.budget = 'Le budget doit être supérieur à 0.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (client) {
      onUpdateClient(formData);
    } else {
      onAddClient({ ...formData, statut: 'en cours' });
    }
    onClose();
  };

  return (
    <div className="new-client-form">
      <input
        type="text"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        placeholder="Nom"
      />
      {errors.nom && <p className="error">{errors.nom}</p>}
      
      <input
        type="date"
        name="dateEntree"
        value={formData.dateEntree}
        onChange={handleChange}
        placeholder="Date d'entrée"
      />
      {errors.dateEntree && <p className="error">{errors.dateEntree}</p>}

      <input
        type="date"
        name="dateDecision"
        value={formData.dateDecision}
        onChange={handleChange}
        placeholder="Date de décision"
      />

      <input
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Budget (€)"
      />
      {errors.budget && <p className="error">{errors.budget}</p>}

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
      ></textarea>

      <div className="modal-footer">
        <button className="confirm" onClick={handleSubmit}>Confirmer</button>
        <button className="cancel" onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
}

export default NewClient;
