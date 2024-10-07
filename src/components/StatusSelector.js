// src/components/StatusSelector.js
import React from 'react';

function StatusSelector({ client, onStatusChange }) {
    const handleChange = (e) => {
        const newStatus = e.target.value;
        onStatusChange(client, newStatus);
    };

    return (
        <select value={client.statut} onChange={handleChange}>
            <option value="en cours">En cours</option>
            <option value="vendu">Vendu</option>
            <option value="perdu">Perdu</option>
        </select>
    );
}

export default StatusSelector;
