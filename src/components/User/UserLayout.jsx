import { useState } from "react";
import UserSidebar from "./UserSidebar";
import TicketForm from "./TicketForm";

export default function UserLayout({loggedInUser, tickets, setTickets}) {
   const [ticketList, setTicketList] = useState(
      tickets.map((ticket) => ({ ...ticket, resolved: false }))
    );
  const [activeView, setActiveView] = useState("create");

  return (
    <div className="flex h-screen">
      <UserSidebar onSelect={setActiveView} />
      <div className="flex-1 p-6">
        {activeView === "create" ? <TicketForm setActiveView = {setActiveView} setTickets= {setTickets}/> : <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Ticket ID</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Priority</th>
                {loggedInUser?.userType === "Admin" && (
                  <th className="p-3 border">Status</th>
                )}
                {loggedInUser?.userType === "Admin" && (
                  <th className="border p-2">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {ticketList.map((ticket) => (
                <tr key={ticket.ticketId} className="text-gray-700">
                  <td className="p-3 border">{ticket.ticketId}</td>
                  <td className="p-3 border">{ticket.subject}</td>
                  <td className="p-3 border">{ticket.category}</td>
                  <td className="p-3 border">{ticket.department}</td>
                  <td className="p-3 border">{ticket.email}</td>
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
                      Regular
                      {ticket.resolved ? "Resolved" : "Pending"}
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
                        <span className="text-green-600 font-bold">
                          Resolved
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  );
}


