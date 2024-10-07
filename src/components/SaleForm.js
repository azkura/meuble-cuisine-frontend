// src/components/SaleForm.js
import React, { useState } from 'react';

function SaleForm({ client, onSave, onClose }) {
    const [saleData, setSaleData] = useState({
        dateVente: '',
        pvttc: '',
        tva: 20,
        pvht: '',
        prixPose: '',
        prixLivraison: '',
        marge: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...saleData, [name]: value };

        // Calculer le PVHT automatiquement en fonction du PVTTC et de la TVA
        if (name === 'pvttc' || name === 'tva') {
            const pvttcValue = name === 'pvttc' ? parseFloat(value) : parseFloat(updatedData.pvttc);
            const tvaValue = name === 'tva' ? parseFloat(value) : parseFloat(updatedData.tva);
            if (!isNaN(pvttcValue) && !isNaN(tvaValue)) {
                updatedData.pvht = (pvttcValue / (1 + tvaValue / 100)).toFixed(2);
            }
        }

        setSaleData(updatedData);
    };

    const handleSubmit = () => {
        onSave({ ...client, ...saleData, statut: 'vendu' });
        onClose();
    };

    return (
        <div className="sale-form">
            <h2>Informations de Vente</h2>
            <input
                type="date"
                name="dateVente"
                value={saleData.dateVente}
                onChange={handleChange}
                placeholder="Date de Vente"
            />
            <input
                type="number"
                name="pvttc"
                value={saleData.pvttc}
                onChange={handleChange}
                placeholder="Prix de Vente TTC (€)"
            />
            <select name="tva" value={saleData.tva} onChange={handleChange}>
                <option value={10}>10%</option>
                <option value={20}>20%</option>
            </select>
            <input
                type="number"
                name="pvht"
                value={saleData.pvht}
                readOnly
                placeholder="Prix de Vente HT (€)"
            />
            <input
                type="number"
                name="prixPose"
                value={saleData.prixPose}
                onChange={handleChange}
                placeholder="Prix de Pose (€)"
            />
            <input
                type="number"
                name="prixLivraison"
                value={saleData.prixLivraison}
                onChange={handleChange}
                placeholder="Prix de Livraison (€)"
            />
            <input
                type="number"
                name="marge"
                value={saleData.marge}
                onChange={handleChange}
                placeholder="Marge (%)"
            />
            <button onClick={handleSubmit}>Enregistrer</button>
            <button onClick={onClose}>Annuler</button>
        </div>
    );
}

export default SaleForm;
