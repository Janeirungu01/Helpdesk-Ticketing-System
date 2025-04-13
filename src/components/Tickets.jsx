import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getStatusClass, getPriorityClass, timeAgo } from "../Helpers/DummyData";

function Tickets({ tickets }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [ticketList, setTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const storedIds = new Set(storedTickets.map((t) => t.ticketId));

    const newTickets = tickets
      .filter((t) => !storedIds.has(t.ticketId))
      .map((t) => ({
        ...t,
        status: t.status || "Pending",
        notes: t.notes || "",
        updatedAt: t.updatedAt || t.date || new Date().toISOString(),
      }));

    const merged = [...storedTickets, ...newTickets];
    setTicketList(merged);
    localStorage.setItem("tickets", JSON.stringify(merged));
  }, [tickets]);

  // useEffect(() => {
  //   const updatedTickets = tickets.map((t) => ({
  //     ...t,
  //     status: t.status || "Pending",
  //     notes: t.notes || "",
  //   }));

  //   setTicketList(updatedTickets);
  // }, [tickets]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("tickets", JSON.stringify(ticketList));
    }, 300);
    return () => clearTimeout(timeout);
  }, [ticketList]);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
    setNotes(ticket.notes || "");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setNotes("");
  };

  const openViewModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedTicket(null);
    setIsViewModalOpen(false);
  };

  const resolveTicket = () => {
    const updatedTickets = ticketList.map((ticket) =>
      ticket.ticketId === selectedTicket.ticketId
        ? {
            ...ticket,
            status: "Resolved",
            notes,
            updatedAt: new Date().toISOString(),
          }
        : ticket
    );
    setTicketList(updatedTickets);
    closeModal();
  };

  const ticketRows = useMemo(
    () =>
      ticketList.map((ticket) => (
        <tr key={ticket.ticketId} className="text-gray-700">
          <td className="p-3 border">{ticket.ticketId}</td>
          <td className="p-2 border">
            {ticket.createdBy?.name || ticket.createdBy || "N/A"}
          </td>
          <td className="p-2 border">{ticket.subject}</td>
          <td className="p-2 border">{ticket.branch}</td>
          <td className="p-2 border">{ticket.department}</td>
          <td className="p-2 border">
            {new Date(ticket.date).toLocaleDateString()}
          </td>
          <td className="p-2 border text-sm italic text-gray-600">
  {ticket.updatedAt ? timeAgo(ticket.updatedAt) : "N/A"}
</td>


          <td
            className={`p-2 border text-white font-bold text-center ${getPriorityClass(
              ticket.priority
            )}`}
          >
            {ticket.priority}
          </td>
          <td className="p-2 border text-center">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
          </td>
          <td className="border p-2 space-x-2">
            <button
              onClick={() => openViewModal(ticket)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              View
            </button>
            {loggedInUser?.userType === "Admin" &&
              (ticket.status !== "Resolved" ? (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => openModal(ticket)}
                >
                  Resolve
                </button>
              ) : (
                <span className="text-green-600 font-bold">Resolved</span>
              ))}
          </td>
        </tr>
      )),
    [ticketList, loggedInUser?.userType]
  );

  return (
    <div className="flex justify-center items-center  md:px-2">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Tickets</h2>
        <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">Ticket ID</th>
              <th className="p-3 border">Created By</th>
              <th className="p-3 border">Subject</th>
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
        {loggedInUser?.userType === "Regular" && (
          <Link
            to="/add-ticket"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add New Ticket
          </Link>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-25 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Resolve Ticket
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to mark{" "}
              <span className="font-bold">{selectedTicket.subject}</span> as
              resolved?
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add resolution notes..."
              className="w-full p-2 border rounded mb-4 text-gray-700"
            />
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

      {isViewModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-30 flex justify-center text-gray-600 not-only:items-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Ticket Details
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {selectedTicket.ticketId}
              </p>
              <p>
                <strong>Created By:</strong>{" "}
                {selectedTicket.createdBy?.name ||
                  selectedTicket.createdBy ||
                  "N/A"}
              </p>
              <p>
                <strong>Subject:</strong> {selectedTicket.subject}
              </p>
              <p>
                <strong>Category:</strong> {selectedTicket.category}
              </p>
              <p>
                <strong>Branch:</strong> {selectedTicket.branch}
              </p>
              <p>
                <strong>Department:</strong> {selectedTicket.department}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedTicket.date).toLocaleString()}
              </p>

              <p>
                <strong>Description:</strong> {selectedTicket.description}
              </p>
              <p>
                <strong>Priority:</strong> {selectedTicket.priority}
              </p>
              {selectedTicket.attachment && (
                <div className="mt-4">
                  <strong>Attachment:</strong>
                  {typeof selectedTicket.attachment === "string" ? (
                    selectedTicket.attachment.match(/^data:image\//) ? (
                      <img
                        src={selectedTicket.attachment}
                        alt="Attachment"
                        className="mt-2 rounded max-h-60"
                      />
                    ) : (
                      <a
                        href={selectedTicket.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2 text-blue-600 underline"
                      >
                        View File
                      </a>
                    )
                  ) : (
                    <a
                      href={URL.createObjectURL(selectedTicket.attachment)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 underline"
                    >
                      View Attachment
                    </a>
                  )}
                </div>
              )}

              <p>
                <strong>Status:</strong> {selectedTicket.status}
              </p>
              <p>
                <strong>Notes:</strong> {selectedTicket.notes || "-"}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tickets;
