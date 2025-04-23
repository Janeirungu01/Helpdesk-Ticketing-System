import { useEffect, useState } from 'react';

const useLocalTickets = (key = 'tickets') => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setTickets(JSON.parse(stored));
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tickets));
  }, [tickets, key]);

  return [tickets, setTickets];
};

export default useLocalTickets;