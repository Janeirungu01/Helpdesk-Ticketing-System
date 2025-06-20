import { useState, useEffect } from 'react';
import AxiosInstance from "../../Helpers/Api/AxiosInstance"

export const useTickets = () => {
  const abortController = new AbortController();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [ticketList, setTicketList] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    console.log("CLICKED")
    try {
      setIsLoading(true);
      const response = await AxiosInstance.get("/tickets", 
        {
          signal: abortController.signal
        }
      )

      const data = response?.data;
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
      console.log("FETCH ERR: "+err.message)
      abortController.abort();
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