// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// function AddTicket({ setTickets }) {
//   const navigate = useNavigate();
//   const [ticketData, setTicketData] = useState({
//     title: "",
//     description: "",
//     priority: "Low",
//   });

//   const handleChange = (e) => {
//     setTicketData({ ...ticketData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!ticketData.title || !ticketData.description) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     const newTicket = {
//       ticketId: Date.now(),
//       title: ticketData.title,
//       description: ticketData.description,
//       priority: ticketData.priority,
//       resolved: false,
//     };

//     setTickets((prevTickets) => [...prevTickets, newTicket]);
//     toast.success(`Your request was added with id ${newTicket.ticketId}`);
//     navigate("/tickets");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           Add Ticket
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Enter ticket title"
//               className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700"
//               value={ticketData.title}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Enter ticket description"
//               className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700"
//               value={ticketData.description}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-2">Priority</label>
//             <select
//               name="priority"
//               className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700"
//               value={ticketData.priority}
//               onChange={handleChange}
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Submit Ticket
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddTicket;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddTicket({ setTickets }) {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({

    title: "",
    description: "",
    priority: "Low",

    department: "",
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ticketData.title || !ticketData.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newTicket = {
      ticketId: Date.now(),
      title: ticketData.title,
      description: ticketData.description,
      priority: ticketData.priority,
      resolved: false,
    };

    setTickets((prevTickets) => [...prevTickets, newTicket]);
    toast.success(`Your request was added with id ${newTicket.ticketId}`);
    navigate("/tickets");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add Ticket
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter ticket title"
              className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700"
              value={ticketData.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter ticket description"
              className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700"
              value={ticketData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Priority</label>
            <select
              name="priority"
              className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700"
              value={ticketData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTicket;


