import React, { useState, useEffect } from 'react';

const TicketService = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [note, setNote] = useState('');

  const fetchTickets = async () => {
    const res = await fetch('http://127.0.0.1:3000/tickets');
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const resolveTicket = async () => {
    if (!selectedTicket) return;

    await fetch(`http://127.0.0.1:3000/tickets/${selectedTicket.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Resolved',
        notes: note,
        updated_at: new Date().toISOString(),
      }),
    });

    setSelectedTicket(null);
    setNote('');
    fetchTickets();
  };

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            #{ticket.ticket_id} - {ticket.subject} - {ticket.status}
            <button onClick={() => setSelectedTicket(ticket)}>Resolve</button>
          </li>
        ))}
      </ul>

      {selectedTicket && (
        <div>
          <h2>Resolve Ticket #{selectedTicket.ticket_id}</h2>
          <textarea
            placeholder="Resolution note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button onClick={resolveTicket}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default TicketService;
