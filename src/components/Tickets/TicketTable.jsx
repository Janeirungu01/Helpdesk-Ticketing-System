import React from "react";
import TicketRow from "./TicketRow";


function TicketsTable({ tickets, loggedInUser, openModal, openViewModal, setSelectedTicket, setPromptOpen }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((ticket, index) => (
            <TicketRow
              key={ticket.ticketId}
              ticket={ticket}
              index={index}
              loggedInUser={loggedInUser}
              openModal={openModal}
              openViewModal={openViewModal}
              setSelectedTicket={setSelectedTicket}
              setPromptOpen={setPromptOpen}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketsTable;


// import React, { useState, useMemo } from "react";
// import  useLocalTickets  from "./Tickets/hooks/useLocalTickets";
// import PromptBanner from "./Tickets/PromptBanner";
// import TicketRow from "./Tickets/TicketRow";
// import ResolveModal from "./Tickets/ResolveModal";
// import ViewModal from "./Tickets/ViewModal";

// const Tickets = () => {
//   const [ticketList, setTicketList] = useLocalTickets("tickets");
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [resolveModalOpen, setResolveModalOpen] = useState(false);

//   const loggedInUser = useMemo(() => {
//     return JSON.parse(localStorage.getItem("user"));
//   }, []);

//   const updateTicketStatus = (id, status, notes = "") => {
//     setTicketList((prevList) =>
//       prevList.map((ticket) =>
//         ticket.ticketId === id
//           ? {
//               ...ticket,
//               status,
//               notes: notes || ticket.notes,
//               updatedAt: new Date().toISOString(),
//               closed: status === "Closed",
//             }
//           : ticket
//       )
//     );
//   };

//   const reopenTicket = (id, notes = "") => {
//     updateTicketStatus(id, "Reopened", notes);
//   };

//   return (
//     <div className="p-4 text-gray-600">
//       {loggedInUser?.userType === "Regular" && <PromptBanner />}
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Department</th>
//               <th className="p-2">Priority</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ticketList.map((ticket) => (
//               <TicketRow
//                 key={ticket.ticketId}
//                 ticket={ticket}
//                 user={loggedInUser}
//                 onView={() => {
//                   setSelectedTicket(ticket);
//                   setViewModalOpen(true);
//                 }}
//                 onResolve={() => {
//                   setSelectedTicket(ticket);
//                   setResolveModalOpen(true);
//                 }}
//                 onReopen={reopenTicket}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {viewModalOpen && (
//         <ViewModal
//           ticket={selectedTicket}
//           onClose={() => setViewModalOpen(false)}
//         />
//       )}

//       {resolveModalOpen && (
//         <ResolveModal
//           ticket={selectedTicket}
//           onClose={() => setResolveModalOpen(false)}
//           onResolve={updateTicketStatus}
//         />
//       )}
//     </div>
//   );
// };

// export default Tickets;


