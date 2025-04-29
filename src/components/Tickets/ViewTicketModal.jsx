


import React from "react";
import { Modal, Backdrop, Fade, Box } from "@mui/material";

function ViewTicketModal({ open, onClose, selectedTicket }) {
  if (!selectedTicket) return null;

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition BackdropComponent={Backdrop}>
      <Fade in={open}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-2">{selectedTicket.title}</h2>
          <p className="mb-4 text-gray-700">{selectedTicket.description}</p>
          {selectedTicket.notes && (
            <div className="mt-4">
              <h3 className="font-semibold">Resolution Notes:</h3>
              <p className="text-gray-600">{selectedTicket.notes}</p>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
              Close
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ViewTicketModal;
