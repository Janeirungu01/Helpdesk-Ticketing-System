import React, { useState } from "react";

const TicketPrompt = ({ showPrompt, onClose, onConfirm }) => {
  const [notes, setNotes] = useState("");

  if (!showPrompt) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <p className="mb-2">Provide notes for reopening the ticket (optional):</p>
        <textarea
          className="w-full border p-2 rounded"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <div className="mt-4 text-right">
          <button
            onClick={() => onConfirm(notes)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Confirm
          </button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPrompt;
