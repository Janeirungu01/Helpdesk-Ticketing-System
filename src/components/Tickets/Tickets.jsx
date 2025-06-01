import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTickets } from "./useTickets";
import TicketRow from "./TicketRow";
import { ResolveModal, ViewModal, ActionPrompt } from "./TicketModals";
import DateSearchForm from "./DateSearchForm";

function Tickets() {
  const today = new Date().toISOString().split("T")[0];
  const [isFiltering, setIsFiltering] = useState(true);

  const {
    ticketList,
    filteredTickets,
    selectedTicket,
    setSelectedTicket,
    updateTicket,
    filterTicketsByDate,
    loggedInUser,
  } = useTickets();


  useEffect(() => {
  const filter = async () => {
    setIsFiltering(true);
    await filterTicketsByDate(today, today); 
    setIsFiltering(false);
  };

  if (ticketList.length > 0) {
    filter();
  }
}, [ticketList]);


  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const shouldDisplayTicket = (ticket) =>
    loggedInUser?.usertype === "Admin" || !ticket.closed;

  const handleResolveTicket = async (notes) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:3000/tickets/${selectedTicket.ticket_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket: {
              status: "resolved",
              notes,
              updated_at: new Date().toISOString(),
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to resolve ticket");

      const updated = await response.json();
      updateTicket(updated.ticket_id, updated);
      setPromptOpen(true);
      setIsResolveModalOpen(false);
    } catch (error) {
      console.error("Error resolving ticket:", error);
    }
  };

  const handleCloseTicket = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:3000/tickets/${selectedTicket.ticket_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket: {
              status: "closed",
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to close ticket");

      const updated = await response.json();
      updateTicket(updated.ticket_id, updated);
      setPromptOpen(false);
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  };

  const handleReopenTicket = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:3000/tickets/${selectedTicket.ticket_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket: {
              closed: false,
              status: "reopened",
              updated_at: new Date().toISOString(),
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to reopen ticket");

      const updated = await response.json();
      updateTicket(updated.ticket_id, updated);
      setPromptOpen(false);
    } catch (error) {
      console.error("Error reopening ticket:", error);
    }
  };

  return (
    <div className="flex justify-center items-center md:px-2">
      <div className="w-full max-w-8xl bg-white p-6 rounded-lg shadow-md overflow-x-auto relative">
        <ActionPrompt
          isOpen={promptOpen && loggedInUser?.usertype === "Agent"}
          ticket={selectedTicket}
          onCloseTicket={handleCloseTicket}
          onReopenTicket={handleReopenTicket}
        />

        <h2 className="text-2xl font-bold text-gray-700 text-center">Tickets</h2>

        <div>
          <DateSearchForm
            onSearch={filterTicketsByDate}
            initialStartDate={today}
            initialEndDate={today}
          />
        </div>

        <div className="overflow-x-auto">
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
            {!isFiltering && (
            <tbody>
              {filteredTickets.filter(shouldDisplayTicket).map((ticket) => (
                <TicketRow
                  key={ticket.ticket_id}
                  ticket={ticket}
                  loggedInUser={loggedInUser}
                  onView={() => {
                    setSelectedTicket(ticket);
                    setIsViewModalOpen(true);
                  }}
                  onResolve={() => {
                    setSelectedTicket(ticket);
                    setIsResolveModalOpen(true);
                  }}
                  onTakeAction={(ticket) => {
                    setSelectedTicket(ticket);
                    setPromptOpen(true);
                  }}
                  onReopen={() => {
                    setSelectedTicket(ticket);
                    handleReopenTicket();
                  }}
                />
              ))}
            </tbody>
            )}

          </table>
        </div>
        {loggedInUser?.usertype === "Agent" && (
          <div className="mt-4 flex justify-start">
            <Link
              to="/add-ticket"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
            >
              Add New Ticket
            </Link>
            </div>
          )}
      </div>

      <ResolveModal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        ticket={selectedTicket}
        onResolve={handleResolveTicket}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}

export default Tickets;
