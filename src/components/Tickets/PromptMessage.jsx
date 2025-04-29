

import React from "react";

function PromptMessage({ ticket, onCloseTicket, onReopenTicket }) {
  return (
    <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
      <p>
        Ticket "<strong>{ticket.title}</strong>" has been resolved. Would you like to close or reopen it?
      </p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => onCloseTicket(ticket.ticketId)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Close Ticket
        </button>
        <button
          onClick={() => onReopenTicket(ticket.ticketId)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reopen Ticket
        </button>
      </div>
    </div>
  );
}

export default PromptMessage;
