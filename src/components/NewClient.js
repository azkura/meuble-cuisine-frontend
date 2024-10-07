// src/components/NewClient.js
import React, { useState, useEffect } from 'react';
import './NewClient.css';

function NewClient({ onAddClient, onUpdateClient, onClose, client }) {
  const [clientData, setClientData] = useState({
    nom: '',
    dateEntree: '',
    dateDecision: '',
    budget: '',
    notes: '',
  });

  // Initialiser les champs avec les données du client si nous sommes en mode modification
  useEffect(() => {
    if (client) {
      setClientData(client);
    }
  }, [client]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = () => {
    if (clientData.nom) {
      if (client) {
        // Mode édition
        onUpdateClient({ ...clientData, budget: parseFloat(clientData.budget) || 0 });
      } else {
        // Mode ajout
        onAddClient({ ...clientData, statut: 'en cours', budget: parseFloat(clientData.budget) || 0 });
      }
      onClose(); // Fermer la modal après l'ajout ou la modification
    }
  };

  return (
    <div className="new-client-form">
      <h2>{client ? 'Modifier le Client' : 'Ajouter un Nouveau Client'}</h2>
      <input
        type="text"
        name="nom"
        value={clientData.nom}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input
        type="date"
        name="dateEntree"
        value={clientData.dateEntree}
        onChange={handleChange}
        placeholder="Date d'entrée"
      />
      <input
        type="date"
        name="dateDecision"
        value={clientData.dateDecision}
        onChange={handleChange}
        placeholder="Date de décision"
      />
      <input
        type="number"
        name="budget"
        value={clientData.budget}
        onChange={handleChange}
        placeholder="Budget (€)"
      />
      <textarea
        name="notes"
        value={clientData.notes}
        onChange={handleChange}
        placeholder="Notes"
      ></textarea>
      <button onClick={handleSubmit}>{client ? 'Modifier Client' : 'Ajouter Client'}</button>
    </div>
  );
}

export default NewClient;
