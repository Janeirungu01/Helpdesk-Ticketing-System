import { getStatusClass, getPriorityClass, timeAgo } from "../../Helpers/DummyData";

const TicketRow = ({ ticket, loggedInUser, onView, onResolve, onTakeAction, onReopen }) => {
  const isAdmin = loggedInUser?.usertype === "Admin";
  const isAgent = loggedInUser?.usertype === "Agent";
  const isResolved = ticket.status === "resolved";
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
        <button onClick={() => onView(ticket)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</button>
        {isAdmin && !isResolved && !isClosed && (
          <button onClick={() => onResolve(ticket)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Resolve</button>
        )}
        {isAgent && isResolved && !isClosed && (
          <button onClick={() => onTakeAction(ticket)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Take Action</button>
        )}
        {isAgent && isClosed && (
          <button onClick={() => onReopen(ticket)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Reopen</button>
        )}
      </td>
    </tr>
  );
};

export default TicketRow;