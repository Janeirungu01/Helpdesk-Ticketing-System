import { Modal, Backdrop, Fade, Box } from "@mui/material";
import { useState } from "react";

export const ResolveModal = ({ isOpen, onClose, ticket, onResolve }) => {
  const [notes, setNotes] = useState(ticket?.notes || "");

  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
      <Fade in={isOpen}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[95%] sm:w-[90%] max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg text-gray-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Resolve Ticket</h3>
          <p className="mb-4">Are you sure you want to mark <span className="font-bold">{ticket?.subject}</span> as resolved?</p>
          <textarea 
            value={notes} 
            onChange={e => setNotes(e.target.value)} 
            placeholder="Add resolution notes..." 
            className="w-full p-2 border rounded mb-4 min-h-[120px]" 
          />
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
            <button onClick={() => onResolve(notes)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Confirm</button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export const ViewModal = ({ isOpen, onClose, ticket }) => {
  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
      <Fade in={isOpen}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[95%] sm:w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto text-gray-500">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Ticket Details</h2>
          <div className="space-y-2 text-sm">
            <p><strong>ID:</strong> {ticket?.ticket_id}</p>
            <p><strong>Created By:</strong> {ticket?.created_by?.username || ticket?.created_by_id?.username || ticket?.created_by_id || "N/A"}</p>
            <p><strong>Subject:</strong> {ticket?.subject}</p>
            <p><strong>Category:</strong> {ticket?.category}</p>
            <p><strong>Branch:</strong> {ticket?.branch}</p>
            <p><strong>Department:</strong> {ticket?.department?.name || ticket?.department_id}</p>
            <p><strong>Date:</strong> {new Date(ticket?.created_at).toLocaleString()}</p>
            <p><strong>Description:</strong> {ticket?.description}</p>
            <p><strong>Priority:</strong> {ticket?.priority}</p>
            {ticket?.attachment && (
              <div className="mt-4">
                <strong>Attachment:</strong>
                {typeof ticket.attachment === "string" ? (
                  ticket.attachment.match(/^data:image\//) ? (
                    <img src={ticket.attachment} alt="Attachment" className="mt-2 rounded max-h-60" />
                  ) : (
                    <a href={ticket.attachment} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 underline">View File</a>
                  )
                ) : (
                  <a href={URL.createObjectURL(ticket.attachment)} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 underline">View Attachment</a>
                )}
              </div>
            )}
            <p><strong>Status:</strong> {ticket?.status}</p>
            <p><strong>Notes:</strong> {ticket?.notes}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export const ActionPrompt = ({ isOpen, onClose, ticket, onCloseTicket, onReopenTicket }) => {
  if (!isOpen) return null;
  
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-4">
      <p className="text-sm font-medium">
        Your ticket, <strong>{ticket?.ticket_id}</strong> has been resolved. Take action?
      </p>
      <div className="mt-2 flex justify-end space-x-2">
        <button onClick={onCloseTicket} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Close</button>
        <button onClick={onReopenTicket} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Reopen</button>
      </div>
    </div>
  );
};