// src/pages/Clients.js
import React, { useState, useCallback, useMemo } from 'react';
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

    // Ouvrir la modale
    const openModal = useCallback((type, client = null) => {
        setModalType(type);
        setSelectedClient(client);
        setIsModalOpen(true);
    }, []);

    // Fermer la modale
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedClient(null);
    }, []);

    // Gérer les changements dans les formulaires de la modale
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    // Gérer la sauvegarde des informations de vente
    const handleSaveSale = (updatedClient) => {
        onUpdateClient(updatedClient);
        toast.success(`Le client ${updatedClient.nom} a été mis à jour avec les informations de vente.`);
        closeModal();
    };

    // Gérer la soumission du formulaire de modification
    const handleSubmit = () => {
        if (modalType === 'edit') {
            if (selectedClient.statut === 'vendu') {
                setModalType('sale'); // Passe en mode "sale" pour entrer les détails de la vente
            } else {
                onUpdateClient(selectedClient);
                closeModal();
            }
        } else if (modalType === 'sale') {
            handleSaveSale(selectedClient);
        } else if (modalType === 'new') {
            onAddClient(selectedClient);
            closeModal();
        }
    };

    // Gérer la suppression du client
    const handleDelete = useCallback((client) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.nom} ?`)) {
            onDeleteClient(client);
            toast.success(`Le client ${client.nom} a été supprimé.`);
        }
    }, [onDeleteClient]);

    // Filtrer et trier les clients
    const filteredClients = useMemo(() => filterClients(clients, selectedMonth, selectedStatus), [clients, selectedMonth, selectedStatus]);
    const sortedClients = useMemo(() => sortClients(filteredClients, sortCriteria, sortOrder), [filteredClients, sortCriteria, sortOrder]);

    return (
        <div className="container">
            <h1>Liste des Clients</h1>

            <ToastContainer />

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

            <ClientTable
                clients={sortedClients}
                onEdit={(client) => openModal('edit', client)}
                onDelete={handleDelete}
                onOpenNotes={(client) => openModal('notes', client)}
                onStatusChange={(client, newStatus) => {
                    if (newStatus === 'vendu') {
                        setSelectedClient({ ...client, statut: newStatus });
                        openModal('sale');
                    } else {
                        onUpdateClient({ ...client, statut: newStatus });
                    }
                }}
            />

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
                onSubmit={handleSubmit}
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
                    <SaleForm client={selectedClient} onSave={handleSaveSale} onClose={closeModal} />
                )}
            </Modal>
        </div>
    );
}

export default Clients;
