// src/components/SaleForm.js
import React from 'react';

function SaleForm({ clientData, onChange }) {
  return (
    <div>
      <input
        type="date"
        name="dateDecision"
        value={clientData.dateDecision || ''}
        onChange={onChange}
        placeholder="Date de vente"
      />
      <input
        type="number"
        name="pvHorsTaxes"
        value={clientData.pvHorsTaxes || ''}
        onChange={onChange}
        placeholder="Prix de vente HT (€)"
      />
      <select
        name="tva"
        value={clientData.tva || 20}
        onChange={onChange}
      >
        <option value={10}>10%</option>
        <option value={20}>20%</option>
      </select>
      <input
        type="number"
        name="prixPose"
        value={clientData.prixPose || ''}
        onChange={onChange}
        placeholder="Prix de pose (€)"
      />
      <input
        type="number"
        name="prixLivraison"
        value={clientData.prixLivraison || ''}
        onChange={onChange}
        placeholder="Prix de livraison (€)"
      />
      <input
        type="number"
        name="marge"
        value={clientData.marge || ''}
        onChange={onChange}
        placeholder="Marge (%)"
      />
    </div>
  );
}

export default SaleForm;
