import React from 'react';

const ViewModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
        <h2 className="text-lg font-bold mb-4">Ticket Details</h2>
        <p><strong>Department:</strong> {ticket.department}</p>
        <p><strong>Issue:</strong> {ticket.issue}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        {ticket.reopenReason && <p><strong>Reopen Reason:</strong> {ticket.reopenReason}</p>}
        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;