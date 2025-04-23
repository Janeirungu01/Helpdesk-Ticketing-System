import React, { useState } from 'react';

const ResolveModal = ({ ticket, onConfirm, onCancel }) => {
  const [notes, setNotes] = useState('');

  if (!ticket) return null;

  const handleConfirm = () => {
    onConfirm(ticket.id, notes);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
        <h2 className="text-lg font-bold mb-4">Resolve Ticket</h2>
        <p>Are you sure you want to resolve the ticket from <strong>{ticket.department}</strong>?</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter resolution notes (optional)"
          className="w-full border rounded mt-4 p-2"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ResolveModal;
