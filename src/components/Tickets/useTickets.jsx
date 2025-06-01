import { useState, useEffect } from 'react';

export const useTickets = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [ticketList, setTicketList] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:3000/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Failed to fetch tickets");

      const data = await response.json();
      const sortedTickets = data
        .map(ticket => ({
          ...ticket,
          branch: ticket.branch || loggedInUser?.branch || "N/A"
        }))
        .sort((a, b) => new Date(b.updatedAt || b.date) - new Date(a.updatedAt || a.date));

      setTicketList(sortedTickets);
      setFilteredTickets(sortedTickets); 
      localStorage.setItem("tickets", JSON.stringify(sortedTickets));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
    
  const updateTicket = (id, updates) => {
    setTicketList(prev => prev.map(ticket => 
      ticket.ticket_id === id ? { ...ticket, ...updates } : ticket
    ));
    setFilteredTickets(prev => prev.map(ticket => 
      ticket.ticket_id === id ? { ...ticket, ...updates } : ticket
    ));
  };

  const filterTicketsByDate = (startDate, endDate) => {
    const filtered = ticketList.filter(ticket => {
      const ticketDate = new Date(ticket.created_at).toISOString().split('T')[0];
      return ticketDate >= startDate && ticketDate <= endDate;
    });
    setFilteredTickets(filtered);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    ticketList,
    filteredTickets,
    selectedTicket,
    setSelectedTicket,
    isLoading,
    error,
    updateTicket,
    filterTicketsByDate,
    fetchTickets,
    loggedInUser
  };
};