// import React from 'react';

// const TicketRow = ({ ticket, index, handleView, handleResolve }) => {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Pending': return 'bg-yellow-100 text-yellow-800';
//       case 'In Progress': return 'bg-blue-100 text-blue-800';
//       case 'Resolved': return 'bg-green-100 text-green-800';
//       case 'Reopened': return 'bg-red-100 text-red-800';
//       case 'Closed': return 'bg-gray-200 text-gray-600';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <tr className={ticket.status === 'Reopened' ? 'bg-red-50' : ''}>
//       <td className="px-4 py-2 border text-sm">{ticket.subject}</td>
//       <td className="px-4 py-2 border text-sm">{ticket.department}</td>
//       <td className="px-4 py-2 border text-sm">{ticket.priority}</td>
//       <td className="px-4 py-2 border text-sm">
//         <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
//       </td>
//       <td className="px-4 py-2 border text-sm">
//         <button className="text-blue-600 hover:underline text-sm" onClick={() => handleView(ticket)}>View</button>
//         {(ticket.status === 'Reopened' || ticket.status === 'Pending') && (
//           <button className="text-green-600 hover:underline ml-2 text-sm" onClick={() => handleResolve(ticket)}>Resolve</button>
//         )}
//       </td>
//     </tr>
//   );
// };

// export default TicketRow;


import React from "react";
import { getPriorityClass, getStatusClass, timeAgo } from "../Helpers/DummyData";

function TicketRow({ ticket, index, loggedInUser, openModal, openViewModal, setSelectedTicket, setPromptOpen }) {
  const handleResolveClick = () => {
    openModal(ticket);
  };

  const handlePromptClick = () => {
    setSelectedTicket(ticket);
    setPromptOpen(true);
  };

  return (
    <tr className={`${ticket.closed ? "bg-red-100" : ""}`}>
      <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>
      <td
        className="px-3 py-2 text-blue-600 hover:underline cursor-pointer"
        onClick={() => openViewModal(ticket)}
      >
        {ticket.title}
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(ticket.priority)}`}>
          {ticket.priority}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(ticket.status)}`}>
          {ticket.status}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap">{timeAgo(ticket.updatedAt)}</td>
      <td className="px-3 py-2 whitespace-nowrap space-x-2">
        {loggedInUser?.userType === "Admin" && !ticket.closed && (
          <button
            onClick={handleResolveClick}
            className="px-2 py-1 text-white bg-green-500 hover:bg-green-600 rounded"
          >
            Resolve
          </button>
        )}
        {loggedInUser?.userType === "Regular" && ticket.status === "Resolved" && !ticket.closed && (
          <button
            onClick={handlePromptClick}
            className="px-2 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
          >
            Take Action
          </button>
        )}
      </td>
    </tr>
  );
}

export default TicketRow;
