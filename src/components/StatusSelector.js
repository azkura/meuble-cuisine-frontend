// src/components/StatusSelector.js
import React, { useState } from 'react';
import SaleForm from './SaleForm';

function StatusSelector({ client, onStatusChange, onSale }) {
    const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

    if (!client) {
        return null; // Ne pas rendre le composant si le client n'est pas défini
    }

    const handleChange = (e) => {
        const newStatus = e.target.value;
        if (newStatus === 'vendu') {
            setIsSaleModalOpen(true);
        } else {
            // Appeler onStatusChange avec le client et le nouveau statut
            onStatusChange({ ...client, statut: newStatus });
        }
    };

    const handleSaveSale = (updatedClient) => {
        onSale(updatedClient);
        setIsSaleModalOpen(false);
    };

    return (
        <div className="status-selector">
            <select value={client.statut || ''} onChange={handleChange}>
                <option value="en cours">En cours</option>
                <option value="vendu">Vendu</option>
                <option value="perdu">Perdu</option>
            </select>
            {isSaleModalOpen && (
                <div className="modal">
                    <SaleForm client={client} onSave={handleSaveSale} onClose={() => setIsSaleModalOpen(false)} />
                </div>
            )}
        </div>
    );
}

export default StatusSelector;
