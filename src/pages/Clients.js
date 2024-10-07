// src/pages/Clients.js
import React, { useState, useMemo, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';
import Controls from '../components/Controls';
import ClientTable from '../components/ClientTable'; 
import NewClient from '../components/NewClient';
import SaleForm from '../components/SaleForm';
import ClientNotes from '../components/ClientNotes';
import { filterClients, sortClients } from '../utils';
import './Clients.css';

function Clients({ clients, onUpdateClient, onDeleteClient, onAddClient }) {
  const [modalType, setModalType] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Gérer l'ouverture de la modal
  const openModal = useCallback((type, client = null) => {
    setModalType(type);
    setSelectedClient(client);
    setIsModalOpen(true);
  }, []);

  // Gérer la fermeture de la modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedClient(null);
  }, []);

  // Gérer les changements dans les formulaires de la modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  // Gérer le changement de statut
  const handleStatusChange = useCallback((client, newStatus) => {
    const updatedClient = { ...client, statut: newStatus };
    onUpdateClient(updatedClient);
    if (newStatus === 'vendu') {
      openModal('sale', client);
    }
  }, [onUpdateClient, openModal]);

  // Gérer l'envoi du formulaire
  const handleSubmit = useCallback(() => {
    if (modalType === 'sale') {
      const updatedClient = {
        ...selectedClient,
        statut: 'vendu',
        pvttc: selectedClient.pvHorsTaxes ? selectedClient.pvHorsTaxes * (1 + selectedClient.tva / 100) : 0,
      };
      onUpdateClient(updatedClient);
    }
    closeModal();
  }, [modalType, selectedClient, onUpdateClient, closeModal]);

  // Gérer la suppression du client
  const handleDelete = useCallback((client) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.nom} ?`)) {
      onDeleteClient(client);
      toast.success(`Le client ${client.nom} a été supprimé.`);
    }
  }, [onDeleteClient]);

  // Filtrer les clients par mois et statut
  const filteredClients = useMemo(() => filterClients(clients, selectedMonth, selectedStatus), [clients, selectedMonth, selectedStatus]);

  // Trier les clients
  const sortedClients = useMemo(() => sortClients(filteredClients, sortCriteria, sortOrder), [filteredClients, sortCriteria, sortOrder]);

  return (
    <div className="container">
      <h1>Liste des Clients</h1>

      {/* Utiliser le composant ToastContainer */}
      <ToastContainer />

      {/* Utiliser le composant Controls */}
      <Controls
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        sortCriteria={sortCriteria}
        sortOrder={sortOrder}
        onSortChange={setSortCriteria}
        onOrderChange={setSortOrder}
        onNewClient={() => openModal('new')}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Tableau des clients */}
      <ClientTable
        clients={sortedClients}
        onStatusChange={handleStatusChange}
        onEdit={(client) => openModal('edit', client)}
        onDelete={handleDelete}
        onOpenNotes={(client) => openModal('notes', client)}
      />

      {/* Modale réutilisable */}
      <Modal
        title={
          modalType === 'new'
            ? 'Ajouter un Nouveau Client'
            : modalType === 'edit'
            ? 'Modifier le Client'
            : modalType === 'notes'
            ? 'Informations du Client'
            : 'Informations de Vente'
        }
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalType === 'new' || modalType === 'edit' ? null : handleSubmit}
      >
        {(modalType === 'new' || modalType === 'edit') && (
          <NewClient
            onAddClient={onAddClient}
            onUpdateClient={onUpdateClient}
            onClose={closeModal}
            client={modalType === 'edit' ? selectedClient : null}
          />
        )}

        {modalType === 'notes' && selectedClient && (
          <ClientNotes notes={selectedClient.notes} />
        )}

        {modalType === 'sale' && selectedClient && (
          <SaleForm clientData={selectedClient} onChange={handleChange} />
        )}
      </Modal>
    </div>
  );
}

export default Clients;
