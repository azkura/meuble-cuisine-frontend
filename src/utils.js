// src/utils.js

// Fonction de filtrage des clients
export const filterClients = (clients, selectedMonth, selectedStatus) => {
    return clients.filter((client) => {
      const matchesMonth = selectedMonth ? client.dateEntree.split('-')[1] === selectedMonth : true;
      const matchesStatus = selectedStatus ? client.statut === selectedStatus : true;
      return matchesMonth && matchesStatus;
    });
  };
  
  // Fonction de tri des clients
  export const sortClients = (clients, sortCriteria, sortOrder) => {
    return clients.sort((a, b) => {
      if (!sortCriteria) return 0;
      let comparison = 0;
  
      if (sortCriteria === 'budget') {
        comparison = a.budget - b.budget;
      } else if (sortCriteria === 'dateEntree') {
        comparison = new Date(a.dateEntree) - new Date(b.dateEntree);
      } else if (sortCriteria === 'dateDecision') {
        comparison = new Date(a.dateDecision) - new Date(b.dateDecision);
      }
  
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };
  