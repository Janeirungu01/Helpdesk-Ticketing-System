import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Modal, Backdrop, Fade, Box } from "@mui/material";
import { getStatusClass, getPriorityClass, timeAgo } from "../../Helpers/DummyData";

function Tickets() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [ticketList, setTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);

  useEffect(() => {
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:3000/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();

    const sortedTickets = data
        .map(ticket => ({
          ...ticket,
          branch: ticket.branch || loggedInUser?.branch || "N/A"
        }))
        .sort((a, b) => new Date(b.updatedAt || b.date) - new Date(a.updatedAt || a.date));

      setTicketList(sortedTickets);
      localStorage.setItem("tickets", JSON.stringify(sortedTickets));
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  fetchTickets();
}, []);

  const handleModal = (ticket, type = "resolve") => {
    setSelectedTicket(ticket);
    if (type === "resolve") {
      setIsModalOpen(true);
      setNotes(ticket.notes || "");
    } else {
      setIsViewModalOpen(true);
    }
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedTicket(null);
    setNotes("");
  };

  const updateTicket = (id, updates) => {
    setTicketList(prev => prev.map(ticket => ticket.ticket_id === id ? { ...ticket, ...updates } : ticket));
  };

  const resolveTicket = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:3000/tickets/${selectedTicket.ticket_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket: {
          status: "resolved",
          notes,
          updated_at: new Date().toISOString()
        }
      })
    });

    if (!response.ok) throw new Error("Failed to resolve ticket");

    const updated = await response.json();
    updateTicket(updated.ticket_id, updated);
    setPromptOpen(true);
    closeModals();
  } catch (error) {
    console.error("Error resolving ticket:", error);
  }
};

const closeTicket = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:3000/tickets/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket: {
          status: "closed"
        }
      })
    });

    if (!response.ok) throw new Error("Failed to close ticket");

    const updated = await response.json();
    updateTicket(updated.ticket_id, updated);
    setPromptOpen(false);
  } catch (error) {
    console.error("Error closing ticket:", error);
  }
};


  const reopenTicket = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:3000/tickets/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket: {
          closed: false,
          status: "reopened",
          updated_at: new Date().toISOString()
        }
      })
    });

    if (!response.ok) throw new Error("Failed to reopen ticket");

    const updated = await response.json();
    updateTicket(updated.ticket_id, updated);
    setPromptOpen(false);
  } catch (error) {
    console.error("Error reopening ticket:", error);
  }
};


  const shouldDisplayTicket = ticket => loggedInUser?.usertype === "Admin" || !ticket.closed;

  const ticketRows = useMemo(() => ticketList.filter(shouldDisplayTicket).map(ticket => {
    const isAdmin = loggedInUser?.usertype === "Admin";
    const isAgent = loggedInUser?.usertype === "Agent";
    const isResolved = ticket.status === "resolved";
    // const isClosed = ticket.closed;
    const isClosed = ticket.closed === true || ticket.closed === "true";


    return (
      <tr
        key={ticket.ticket_id}
        className={`text-gray-700 ${isClosed && isAdmin ? "" : isResolved ? "bg-yellow-100" : "bg-green-50"}`}
      >
        <td className="p-3 border">{ticket.ticket_id}</td>
        <td className="p-2 border">{ticket.created_by?.username || ticket.created_by_id?.username || ticket.created_by_id || "N/A"}</td>
        <td className="p-2 border">{ticket.subject}</td>
        <td className="p-2 border">{ticket.category}</td>
        <td className="p-2 border">{ticket.branch || 'N/A'}</td>
        <td className="p-2 border">{ticket.department?.name || ticket.department_id}</td>
        <td className="p-2 border">{new Date(ticket.created_at).toLocaleDateString()}</td>
        <td className="p-2 border text-sm italic text-gray-600">{ticket.updated_at ? timeAgo(ticket.updated_at) : "N/A"}</td>
        <td className={`p-2 border font-bold text-white capitalize text-center ${getPriorityClass(ticket.priority)}`}>{ticket.priority}</td>
        <td className="p-2 border text-center capitalize">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(isClosed && isAdmin ? "closed" : ticket.status)}`}>
            {isClosed && isAdmin ? "closed" : ticket.status}
          </span>
        </td>
        <td className="border p-2 space-x-2">
          <button onClick={() => handleModal(ticket, "view")} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</button>
          {isAdmin && !isResolved && !isClosed && (
            <button onClick={() => handleModal(ticket)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Resolve</button>
          )}
          {isAgent && isResolved && !isClosed && (
            <button onClick={() => { setSelectedTicket(ticket); setPromptOpen(true); }} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Take Action</button>
          )}
          {isAgent && isClosed && (
            <button onClick={() => reopenTicket(ticket.ticket_id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Reopen</button>
          )}
        </td>
      </tr>
    );
  }), [ticketList, loggedInUser?.usertype]);

  return (
    <div className="flex justify-center items-center md:px-2">
      <div className="w-full max-w-8xl bg-white p-6 rounded-lg shadow-md overflow-x-auto relative">
        {loggedInUser?.usertype === "Agent" && promptOpen && selectedTicket && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-4">
            <p className="text-sm font-medium">
              Your ticket, <strong>{selectedTicket.ticket_id}</strong> has been resolved. Take action?
            </p>
            <div className="mt-2 flex justify-end space-x-2">
              <button onClick={() => closeTicket(selectedTicket.ticket_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Close</button>
              <button onClick={() => reopenTicket(selectedTicket.ticket_id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Reopen</button>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-700 mb-4">Tickets</h2>

        <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">Ticket No.</th>
              <th className="p-3 border">Created By</th>
              <th className="p-3 border">Subject</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Branch</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Updated At</th>
              <th className="p-3 border">Priority</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>{ticketRows}</tbody>
        </table>

        {loggedInUser?.usertype === "Agent" && (
          <Link to="/add-ticket" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add New Ticket
          </Link>
        )}
      </div>

      {/* Resolve Modal */}
      <Modal open={isModalOpen} onClose={(e, reason) => reason !== "backdropClick" && closeModals()} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
        <Fade in={isModalOpen}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[95%] sm:w-[90%] max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg text-gray-500">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Resolve Ticket</h3>
            <p className="mb-4">Are you sure you want to mark <span className="font-bold">{selectedTicket?.subject}</span> as resolved?</p>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add resolution notes..." className="w-full p-2 border rounded mb-4 min-h-[120px]" />
            <div className="flex justify-end space-x-2">
              <button onClick={closeModals} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
              <button onClick={resolveTicket} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Confirm</button>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* View Modal */}
      <Modal open={isViewModalOpen} onClose={(e, reason) => reason !== "backdropClick" && closeModals()} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
        <Fade in={isViewModalOpen}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[95%] sm:w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto text-gray-500">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Ticket Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selectedTicket?.ticket_id}</p>
              <p><strong>Created By:</strong> {selectedTicket?.created_by?.username || selectedTicket?.created_by_id?.username || selectedTicket?.created_by_id || "N/A"}</p>
              <p><strong>Subject:</strong> {selectedTicket?.subject}</p>
              <p><strong>Category:</strong> {selectedTicket?.category}</p>
              <p><strong>Branch:</strong> {selectedTicket?.branch}</p>
              <p><strong>Department:</strong> {selectedTicket?.department?.name || selectedTicket?.department_id}</p>
              <p><strong>Date:</strong> {new Date(selectedTicket?.created_at).toLocaleString()}</p>
              <p><strong>Description:</strong> {selectedTicket?.description}</p>
              <p><strong>Priority:</strong> {selectedTicket?.priority}</p>
              {selectedTicket?.attachment && (
                <div className="mt-4">
                  <strong>Attachment:</strong>
                  {typeof selectedTicket.attachment === "string" ? (
                    selectedTicket.attachment.match(/^data:image\//) ? (
                      <img src={selectedTicket.attachment} alt="Attachment" className="mt-2 rounded max-h-60" />
                    ) : (
                      <a href={selectedTicket.attachment} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 underline">View File</a>
                    )
                  ) : (
                    <a href={URL.createObjectURL(selectedTicket.attachment)} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 underline">View Attachment</a>
                  )}
                </div>
              )}
              <p><strong>Status:</strong> {selectedTicket?.status}</p>
              <p><strong>Notes:</strong> {selectedTicket?.notes}</p>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={closeModals} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Tickets;

