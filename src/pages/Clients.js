// src/pages/Clients.js
import React, { useState } from 'react';

function Clients({ clients, onUpdateClient, onDeleteClient, onAddClient }) {
  const [showModal, setShowModal] = useState(false); // État pour gérer l'ouverture de la modale d'ajout de client
  const [newClient, setNewClient] = useState({
    nom: '',
    dateEntree: '',
    dateDecision: '',
    budget: '',
    notes: '',
  });
  const [showNotesModal, setShowNotesModal] = useState(false); // État pour gérer l'ouverture de la modale des notes
  const [selectedClientNotes, setSelectedClientNotes] = useState(''); // Stocker les notes du client sélectionné

  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Fonction pour déterminer la couleur de fond en fonction du statut
  const getRowBackgroundColor = (statut) => {
    switch (statut) {
      case 'en cours':
        return '#e6f7ff';
      case 'vendu':
        return '#e6ffe6';
      case 'perdu':
        return '#ffe6e6';
      default:
        return 'white';
    }
  };

  // Fonction pour changer la couleur du budget
  const getBudgetColor = (budget) => {
    if (budget > 10000) {
      return 'red';
    } else if (budget >= 8000) {
      return 'green';
    } else {
      return 'orange';
    }
  };

  // Gérer l'ajout d'un nouveau client
  const handleAddClient = () => {
    if (newClient.nom && newClient.dateEntree && newClient.dateDecision && newClient.budget) {
      onAddClient({ ...newClient, statut: 'en cours' });
      setShowModal(false);
      setNewClient({ nom: '', dateEntree: '', dateDecision: '', budget: '', notes: '' });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  // Gérer les changements dans le formulaire d'ajout
  const handleNewClientChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  // Ouvrir la modale des notes
  const handleShowNotes = (notes) => {
    setSelectedClientNotes(notes);
    setShowNotesModal(true);
  };

  // Filtrer et trier les clients
  const getMonthFromDate = (date) => new Date(date).getMonth() + 1;
  const filteredClients = clients.filter((client) => {
    if (selectedMonth === '') return true;
    return getMonthFromDate(client.dateEntree) === parseInt(selectedMonth, 10);
  });
  const sortedClients = filteredClients.sort((a, b) => {
    let comparison = 0;
    switch (sortCriteria) {
      case 'nom':
        comparison = a.nom.localeCompare(b.nom);
        break;
      case 'dateEntree':
        comparison = new Date(a.dateEntree) - new Date(b.dateEntree);
        break;
      case 'dateDecision':
        comparison = new Date(a.dateDecision) - new Date(b.dateDecision);
        break;
      case 'budget':
        comparison = a.budget - b.budget;
        break;
      default:
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Calculer le nombre total de clients et le budget total
  const totalClients = filteredClients.length;
  const totalBudget = filteredClients.reduce((sum, client) => sum + Number(client.budget), 0);

  return (
    <div>
      <h1>Liste des Clients</h1>

      {/* Bouton pour ouvrir la modale d'ajout de client */}
      <button onClick={() => setShowModal(true)}>Nouveau Client</button>

      {/* Sélecteurs de tri et de filtre */}
      <div className="sorting-controls">
        <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
          <option value="">Trier par...</option>
          <option value="nom">Nom</option>
          <option value="dateEntree">Date d'entrée</option>
          <option value="dateDecision">Date de décision</option>
          <option value="budget">Budget</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
        <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
          <option value="">Filtrer par mois...</option>
          <option value="1">Janvier</option>
          <option value="2">Février</option>
          <option value="3">Mars</option>
          <option value="4">Avril</option>
          <option value="5">Mai</option>
          <option value="6">Juin</option>
          <option value="7">Juillet</option>
          <option value="8">Août</option>
          <option value="9">Septembre</option>
          <option value="10">Octobre</option>
          <option value="11">Novembre</option>
          <option value="12">Décembre</option>
        </select>
      </div>

      {/* Tableau des clients */}
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Date d'entrée</th>
            <th>Date de décision</th>
            <th>Budget (€)</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client, index) => (
            <tr key={index} style={{ backgroundColor: getRowBackgroundColor(client.statut) }}>
              <td>{index + 1}</td>
              <td>
                <button className="client-name-button" onClick={() => handleShowNotes(client.notes)}>
                  {client.nom}
                </button>
              </td>
              <td>{client.dateEntree}</td>
              <td>{client.dateDecision}</td>
              <td style={{ color: getBudgetColor(client.budget) }}>{client.budget}</td>
              <td>
                <select
                  name="statut"
                  value={client.statut}
                  onChange={(e) =>
                    onUpdateClient({ ...client, statut: e.target.value })
                  }
                >
                  <option value="en cours">En cours</option>
                  <option value="vendu">Vendu</option>
                  <option value="perdu">Perdu</option>
                </select>
              </td>
              <td>
                <button onClick={() => onDeleteClient(client)}>Supprimer</button>
              </td>
            </tr>
          ))}
          {/* Ligne pour le total des clients et du budget */}
          <tr style={{ backgroundColor: '#d9d9d9' }}> {/* Gris légèrement foncé */}
            <td colSpan="4"><strong>Total</strong></td>
            <td><strong>{totalBudget} €</strong></td>
            <td colSpan="2"><strong>Total Clients: {totalClients}</strong></td>
          </tr>
        </tbody>
      </table>

      {/* Modale d'ajout de nouveau client */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ajouter un Nouveau Client</h2>
            <input
              type="text"
              name="nom"
              value={newClient.nom}
              onChange={handleNewClientChange}
              placeholder="Nom"
            />
            <input
              type="date"
              name="dateEntree"
              value={newClient.dateEntree}
              onChange={handleNewClientChange}
            />
            <input
              type="date"
              name="dateDecision"
              value={newClient.dateDecision}
              onChange={handleNewClientChange}
            />
            <input
              type="number"
              name="budget"
              value={newClient.budget}
              onChange={handleNewClientChange}
              placeholder="Budget (€)"
            />
            <textarea
              name="notes"
              value={newClient.notes}
              onChange={handleNewClientChange}
              placeholder="Notes"
            ></textarea>
            <button onClick={handleAddClient}>Ajouter Client</button>
            <button onClick={() => setShowModal(false)}>Annuler</button>
          </div>
        </div>
      )}

      {/* Modale pour afficher les notes */}
      {showNotesModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Notes du Client</h2>
            <p>{selectedClientNotes}</p>
            <button onClick={() => setShowNotesModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;
