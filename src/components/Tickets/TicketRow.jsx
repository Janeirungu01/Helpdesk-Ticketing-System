import React from "react";

const TicketRow = ({ ticket, userType, onResolve, onReopen }) => {
  const getRowStyle = () => {
    switch (ticket.status) {
      case "Resolved":
        return "bg-green-100";
      case "Closed":
        return "bg-gray-200";
      case "Reopened":
        return "bg-yellow-100";
      default:
        return "";
    }
  };

  return (
    <tr className={`${getRowStyle()} hover:bg-gray-50`}>
      <td className="border px-4 py-2">{ticket.id}</td>
      <td className="border px-4 py-2">{ticket.issue}</td>
      <td className="border px-4 py-2">{ticket.priority}</td>
      <td className="border px-4 py-2">{ticket.status}</td>
      <td className="border px-4 py-2">{ticket.notes || "-"}</td>
      <td className="border px-4 py-2">
        {userType === "admin" && ticket.status === "Open" && (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => onResolve(ticket.id)}
          >
            Resolve
          </button>
        )}
        {userType === "user" && ticket.status === "Closed" && (
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            onClick={() => onReopen(ticket.id)}
          >
            Reopen
          </button>
        )}
      </td>
    </tr>
  );
};

export default TicketRow;
