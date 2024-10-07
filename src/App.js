// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import ClientsVendus from './pages/ClientsVendus'; // Nouvelle page
import Footer from './components/Footer'; // Importer le composant Footer
import './App.css';

function App() {
  const [clients, setClients] = useState([
    {
      nom: 'Dupont',
      dateEntree: '2024-09-01',
      dateDecision: '2024-09-15',
      budget: 10000,
      statut: 'vendu',
      notes: 'Premier client.',
      pvHorsTaxes: 9000,
      tva: 20,
      prixPose: 500,
      prixLivraison: 300,
      dateLivraison: '2024-09-20',
      datePose: '2024-09-22',
      montantPoseur: 400,
    },
    {
      nom: 'Automne',
      dateEntree: '2024-08-01',
      dateDecision: '2024-11-15',
      budget: 8000,
      statut: 'vendu',
      notes: 'Premier client.',
      pvHorsTaxes: 9000,
      tva: 20,
      prixPose: 500,
      prixLivraison: 300,
      dateLivraison: '2024-09-20',
      datePose: '2024-09-22',
      montantPoseur: 400,
    },
    {
      nom: 'glize',
      dateEntree: '2024-09-20',
      dateDecision: '2024-10-15',
      budget: 10000,
      statut: 'vendu',
      notes: 'Premier client.',
      pvHorsTaxes: 9000,
      tva: 20,
      prixPose: 500,
      prixLivraison: 300,
      dateLivraison: '2024-09-20',
      datePose: '2024-09-22',
      montantPoseur: 400,
    },
    // Ajoutez d'autres clients si nécessaire
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
        {/* Navbar */}
        <Navbar />

        {/* Contenu principal */}
        <div className="main-content">
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
            <Route
              path="/clients-vendus"
              element={<ClientsVendus clients={clients} />}
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
