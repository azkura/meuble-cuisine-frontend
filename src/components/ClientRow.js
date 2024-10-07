// src/components/ClientRow.js
import React from 'react';
import Budget from './Budget';
import StatusSelector from './StatusSelector';
import Actions from './Actions';

function ClientRow({ client, index, onStatusChange, onEdit, onDelete, onOpenNotes }) {
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.nom} ?`)) {
      onDelete(client);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <span
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => onOpenNotes(client)}
        >
          {client.nom}
        </span>
      </td>
      <td>{client.dateEntree}</td>
      <td>{client.dateDecision}</td>
      <td><Budget amount={client.budget} /></td>
      <td>
        <StatusSelector
          status={client.statut}
          onStatusChange={(newStatus) => onStatusChange(client, newStatus)}
        />
      </td>
      <td>
        <Actions
          onEdit={() => onEdit(client)}
          onDelete={handleDelete}
        />
      </td>
    </tr>
  );
}

export default ClientRow;
