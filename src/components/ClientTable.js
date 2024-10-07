// src/components/ClientTable.js
import React from 'react';
import ClientRow from './ClientRow';
import './ClientTable.css';

function ClientTable({ clients, onEdit, onDelete, onOpenNotes, onStatusChange }) {
    return (
        <table className="client-table">
            <thead>
                <tr>
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
                        onEdit={() => onEdit(client)}
                        onDelete={() => onDelete(client)}
                        onOpenNotes={() => onOpenNotes(client)}
                        onStatusChange={onStatusChange}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ClientTable;
