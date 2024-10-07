// src/components/ClientNotes.js
import React from 'react';

function ClientNotes({ notes }) {
  return (
    <div>
      <p><strong>Notes:</strong></p>
      <p>{notes || 'Pas de notes disponibles.'}</p>
    </div>
  );
}

export default ClientNotes;
