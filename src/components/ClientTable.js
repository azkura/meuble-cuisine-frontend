// src/components/ClientTable.js
import React from 'react';
import ClientRow from './ClientRow';
//import './ClientTable.css'; // Ajouter des styles spécifiques si nécessaire

function ClientTable({ clients, onStatusChange, onEdit, onDelete, onOpenNotes }) {
  const totalClients = clients.length;
  const totalBudget = clients.reduce((acc, client) => acc + (parseFloat(client.budget) || 0), 0);

  return (
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
        {clients.map((client, index) => (
          <ClientRow
            key={index}
            client={client}
            index={index}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
            onOpenNotes={() => onOpenNotes(client)}
          />
        ))}
        <tr className="total-row">
          <td colSpan="3"><strong>Total</strong></td>
          <td>{totalClients} clients</td>
          <td>{totalBudget} €</td>
          <td colSpan="2"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default ClientTable;
