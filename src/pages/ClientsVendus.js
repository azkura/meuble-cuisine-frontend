// src/pages/ClientsVendus.js
import React from 'react';

function ClientsVendus({ clients }) {
  // Filtrer les clients vendus
  const clientsVendus = clients.filter((client) => client.statut === 'vendu');

  return (
    <div>
      <h1>Clients Vendus</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date d'entrée</th>
            <th>Date de vente</th>
            <th>Budget (€)</th>
            <th>PV Hors Taxes (€)</th>
            <th>TVA (%)</th>
            <th>PV TTC (€)</th>
            <th>Marge (%)</th>
            <th>Prix de Pose (€)</th>
            <th>Prix de Livraison (€)</th>
            <th>Prime (€)</th>
            <th>Date de Livraison</th>
            <th>Date de Pose</th>
            <th>Montant Poseur (€)</th>
          </tr>
        </thead>
        <tbody>
          {clientsVendus.map((client, index) => {
            // Calculs pour les champs supplémentaires
            const pvTTC = client.pvHorsTaxes * (1 + client.tva / 100);
            const prime = client.pvHorsTaxes * 0.03;

            return (
              <tr key={index}>
                <td>{client.nom}</td>
                <td>{client.dateEntree}</td>
                <td>{client.dateDecision}</td>
                <td>{client.budget}</td>
                <td>{client.pvHorsTaxes}</td>
                <td>{client.tva}</td>
                <td>{pvTTC.toFixed(2)}</td>
                <td>{client.marge}</td> {/* Affiche la marge personnalisée */}
                <td>{client.prixPose}</td>
                <td>{client.prixLivraison}</td>
                <td>{prime.toFixed(2)}</td>
                <td>{client.dateLivraison}</td>
                <td>{client.datePose}</td>
                <td>{client.montantPoseur}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsVendus;
