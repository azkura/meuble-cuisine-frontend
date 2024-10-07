// src/components/ClientRow.js
import React from 'react';
import StatusSelector from './StatusSelector';
import Budget from './Budget';

function ClientRow({ client, onEdit, onDelete, onStatusChange, onSale }) {
    return (
        <tr>
            <td>{client.nom}</td>
            <td>{client.dateEntree}</td>
            <td>{client.dateDecision}</td>
            <td><Budget budget={client.budget} /></td>
            <td>{client.statut}</td>
            <td>
                <StatusSelector client={client} onStatusChange={onStatusChange} onSale={onSale} />
            </td>
            <td>
                <button onClick={() => onEdit(client)}>Modifier</button>
                <button onClick={() => onDelete(client)}>Supprimer</button>
            </td>
        </tr>
    );
}

export default ClientRow;
