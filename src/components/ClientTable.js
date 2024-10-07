// src/components/ClientTable.js
import React from 'react';
import StatusSelector from './StatusSelector'; // Assurez-vous d'importer le composant
import './ClientTable.css';

function ClientTable({ clients, onStatusChange, onEdit, onDelete, onOpenNotes, onSale }) {
    return (
        <table className="client-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Date d'entrée</th>
                    <th>Budget</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client, index) => (
                    <tr key={index}>
                        <td>{client.nom}</td>
                        <td>{client.dateEntree}</td>
                        <td>{client.budget}</td>
                        <td>
                            <StatusSelector
                                client={client}
                                onStatusChange={(updatedClient) => onStatusChange(updatedClient)}
                                onSale={onSale}
                            />
                        </td>
                        <td>
                            {/* Boutons d'actions */}
                            <button onClick={() => onEdit(client)}>Modifier</button>
                            <button onClick={() => onDelete(client)}>Supprimer</button>
                            <button onClick={() => onOpenNotes(client)}>Notes</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ClientTable;
