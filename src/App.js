// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Rendezvous from './pages/Rendezvous';
import './App.css';

function App() {
  const [clients, setClients] = useState([
    {
      nom: 'Dupont',
      dateEntree: '2024-09-01',
      dateDecision: '2024-09-15',
      budget: 10000,
      statut: 'en cours',
      notes: 'Premier client.',
    },
    {
      nom: 'Martin',
      dateEntree: '2024-09-05',
      dateDecision: '2024-09-20',
      budget: 7500,
      statut: 'vendu',
      notes: 'Commande en cours.',
    },
    {
      nom: 'Durand',
      dateEntree: '2024-10-10',
      dateDecision: '2024-10-25',
      budget: 5000,
      statut: 'perdu',
      notes: 'Pas intéressé.',
    },
  ]);

  // Fonction pour ajouter un nouveau client
  const handleAddClient = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]);
  };

  // Fonction pour mettre à jour les informations d'un client
  const handleUpdateClient = (updatedClient) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.nom === updatedClient.nom ? updatedClient : client
      )
    );
  };

  // Fonction pour supprimer un client
  const handleDeleteClient = (clientToDelete) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.nom !== clientToDelete.nom)
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/clients"
            element={
              <Clients
                clients={clients}
                onAddClient={handleAddClient}
                onUpdateClient={handleUpdateClient}
                onDeleteClient={handleDeleteClient}
              />
            }
          />
          <Route path="/" element={<Dashboard />} />
          <Route path="/rendezvous" element={<Rendezvous />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
