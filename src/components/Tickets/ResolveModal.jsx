// import React, { useState } from 'react';

// const ResolveModal = ({ ticket, onConfirm, onCancel }) => {
//   const [notes, setNotes] = useState('');

//   if (!ticket) return null;

//   const handleConfirm = () => {
//     onConfirm(ticket.id, notes);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
//         <h2 className="text-lg font-bold mb-4">Resolve Ticket</h2>
//         <p>Are you sure you want to resolve the ticket from <strong>{ticket.department}</strong>?</p>
//         <textarea
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           placeholder="Enter resolution notes (optional)"
//           className="w-full border rounded mt-4 p-2"
//         />
//         <div className="mt-4 flex justify-end gap-2">
//           <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onCancel}>Cancel</button>
//           <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleConfirm}>Confirm</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResolveModal;


import React from "react";
import { Modal, Backdrop, Fade, Box } from "@mui/material";

function ResolveModal({ open, onClose, selectedTicket, notes, setNotes, onResolve }) {
  if (!selectedTicket) return null;

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition BackdropComponent={Backdrop}>
      <Fade in={open}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Resolve Ticket</h2>
          <p className="mb-4 text-gray-600">{selectedTicket.title}</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add resolution notes..."
            className="w-full h-24 p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
              Cancel
            </button>
            <button onClick={onResolve} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ResolveModal;
