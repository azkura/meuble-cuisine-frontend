// src/components/NewClient.js
import React, { useState, useEffect } from 'react';
import SaleForm from './SaleForm';
import './NewClient.css';

function NewClient({ onAddClient, onUpdateClient, onClose, client, onSale }) {
    const [formData, setFormData] = useState({
        nom: '',
        dateEntree: '',
        dateDecision: '',
        budget: '',
        notes: '',
        statut: 'en cours', // Par défaut, "en cours"
    });

    const [isSaleModalOpen, setIsSaleModalOpen] = useState(false); // Pour gérer l'ouverture de la modal de vente

    useEffect(() => {
        if (client) {
            setFormData(client);
        }
    }, [client]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Ouvrir la modal de vente si le statut est modifié en "vendu"
        if (name === 'statut' && value === 'vendu') {
            setIsSaleModalOpen(true);
        }
    };

    const handleSubmit = () => {
        if (client) {
            onUpdateClient(formData);
        } else {
            onAddClient({ ...formData });
        }
        onClose();
    };

    const handleSaveSale = (updatedClient) => {
        onSale(updatedClient);
        setIsSaleModalOpen(false);
    };

    return (
        <div className="new-client-form">
            <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
            />
            <input
                type="date"
                name="dateEntree"
                value={formData.dateEntree}
                onChange={handleChange}
            />
            <input
                type="date"
                name="dateDecision"
                value={formData.dateDecision}
                onChange={handleChange}
            />
            <input
                type="number"
                name="budget"
                placeholder="Budget (€)"
                value={formData.budget}
                onChange={handleChange}
            />
            <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
            ></textarea>
            {/* Sélection du statut */}
            <select name="statut" value={formData.statut} onChange={handleChange}>
                <option value="en cours">En cours</option>
                <option value="vendu">Vendu</option>
                <option value="perdu">Perdu</option>
            </select>
            <button onClick={handleSubmit}>{client ? 'Mettre à jour' : 'Ajouter'}</button>
            <button onClick={onClose}>Annuler</button>

            {/* Modal de vente pour entrer les informations du client vendu */}
            {isSaleModalOpen && (
                <div className="modal">
                    <SaleForm client={formData} onSave={handleSaveSale} onClose={() => setIsSaleModalOpen(false)} />
                </div>
            )}
        </div>
    );
}

export default NewClient;
