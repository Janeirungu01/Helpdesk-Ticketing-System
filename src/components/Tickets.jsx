import React, { useState } from "react";

function Tickets({ tickets, loggedInUser }) {
  const [ticketList, setTicketList] = useState(
    tickets.map((ticket) => ({ ...ticket, resolved: false }))
  );
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const resolveTicket = () => {
    setTicketList((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.ticketId === selectedTicket.ticketId
          ? { ...ticket, resolved: true }
          : ticket
      )
    );
    closeModal();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Tickets</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Ticket ID</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Priority</th>
                {loggedInUser?.userType === "Admin" && (<th className="p-3 border">Status</th>)}
                {loggedInUser?.userType === "Admin" && (<th className="border p-2">Actions</th>)}
                </tr>
            </thead>
            <tbody>
              {ticketList.map((ticket) => (
                <tr key={ticket.ticketId} className="text-gray-700">
                  <td className="p-3 border">{ticket.ticketId}</td>
                  <td className="p-3 border">{ticket.title}</td>
                  <td className="p-3 border">{ticket.description}</td>
                  <td
                    className={`p-3 border font-bold text-white text-center ${
                      ticket.priority === "High"
                        ? "bg-red-500"
                        : ticket.priority === "Medium"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {ticket.priority}
                  </td>
                {loggedInUser?.userType == "Admin" && (
                <td className="border p-2">
                  {ticket.resolved ? "Resolved": "Pending"}
                </td>
              )}
                {loggedInUser?.userType == "Admin" && (
                <td className="border p-2">
                  {!ticket.resolved ? (
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded"
                      onClick={() => openModal(ticket)}
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold">Resolved</span>
                  )}
                </td>
              )}
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Resolve Ticket
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to mark{" "}
              <span className="font-bold">{selectedTicket.title}</span> as
              resolved?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={resolveTicket}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tickets;
