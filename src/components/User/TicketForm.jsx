// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function TicketForm({ setTickets }) {
//   const navigate = useNavigate();

//   const initialFormState = {
//     subject: "",
//     category: "",
//     branch: "",

//     date: "",
//     description: "",
//     priority: "Low",
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const today = new Date().toISOString().split("T")[0]; 
 
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.subject || !formData.category || !formData.branch) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     const newTicket = {
//       ticketId: Date.now(),
//       subject: formData.subject,
//       category: formData.category,
//       branch: formData.branch,
//       date: formData.date,
//       priority: formData.priority,
//       description: formData.description,
//       resolved: false,
//     };

//     setTickets((prevTickets) => [...prevTickets, newTicket]);
//     toast.success(`Your request was added with ID ${newTicket.ticketId}`);
//     navigate("/tickets");
//   };

//   const handleCancel = () => {
//     setFormData(initialFormState);
//   };

//   return (
//     <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg ">
//       <h2 className="text-xl font-bold mb-4 text-gray-600">Create Ticket</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 ">
//         <div>
//           <label className="block capitalize text-gray-600">
//             Subject <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
//           />
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Category <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
//           >
//             <option value="">Select Category</option>
//             <option value="Hardware Problem">Hardware Problem</option>
//             <option value="Software Problem">Software Problem</option>
//             <option value="User Account">Account Problem</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//           Branch <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="branch"
//             value={formData.branch}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 text-sm bg-white"
//           >
//             <option value="">Select Branch</option>
//             <option value="Fedha">Fedha</option>
//             <option value="Tassia">Tassia</option>
//             <option value="Utawala">Utawala</option>
//             <option value="Kitengela">Kitengela</option>
//             <option value="Machakos">Machakos</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="date"
//             min={today}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
//           />
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white h-24"
            
//           />
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Priority <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 bg-white "
//           >
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="bg-gray-500 text-white px-3 py-2 rounded text-sm text-bold hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-3 py-1 rounded text-sm text-bold hover:bg-blue-700"
//           >
//             Submit Ticket
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function TicketForm({ setTickets }) {
//   const navigate = useNavigate();

//   const initialFormState = {
//     subject: "",
//     category: "",
//     branch: "",
//     date: "",
//     description: "",
//     priority: "Low",
//     attachment: null,
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const today = new Date().toISOString().split("T")[0]; 
 
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check file type
//       if (file.type === "application/pdf" || file.type === "image/png") {
//         setFormData({ ...formData, attachment: file });
//       } else {
//         toast.error("Please upload only PDF or PNG files");
//         e.target.value = ""; // Reset the file input
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.subject || !formData.category || !formData.branch) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     const newTicket = {
//       ticketId: Date.now(),
//       subject: formData.subject,
//       category: formData.category,
//       branch: formData.branch,
//       date: formData.date,
//       priority: formData.priority,
//       description: formData.description,
//       resolved: false,
//       attachment: formData.attachment ? formData.attachment.name : null,
//     };

//     setTickets((prevTickets) => [...prevTickets, newTicket]);
//     toast.success(`Your request was added with ID ${newTicket.ticketId}`);
//     navigate("/tickets");
//   };

//   const handleCancel = () => {
//     setFormData(initialFormState);
//   };

//   return (
//     <div className="w-full h-screen overflow-hidden bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-4 text-gray-600">Create Ticket</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block capitalize text-gray-600">
//             Subject <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
//           />
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Category <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
//           >
//             <option value="">Select Category</option>
//             <option value="Hardware Problem">Hardware Problem</option>
//             <option value="Software Problem">Software Problem</option>
//             <option value="User Account">Account Problem</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Branch <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="branch"
//             value={formData.branch}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 text-sm bg-white"
//           >
//             <option value="">Select Branch</option>
//             <option value="Fedha">Fedha</option>
//             <option value="Tassia">Tassia</option>
//             <option value="Utawala">Utawala</option>
//             <option value="Kitengela">Kitengela</option>
//             <option value="Machakos">Machakos</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="date"
//             min={today}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
//           />
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 text-gray-600 bg-white h-24"
//           />
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Attachment (PDF or PNG)
//           </label>
//           <div className="flex items-center mt-1">
//             <input
//               type="file"
//               accept=".pdf,.png"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//             />
//             {formData.attachment && (
//               <span className="ml-2 text-sm text-gray-600">
//                 {formData.attachment.name}
//               </span>
//             )}
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium capitalize text-gray-600">
//             Priority <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1 bg-white"
//           >
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="bg-gray-500 text-white px-3 py-2 rounded text-sm text-bold hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-3 py-1 rounded text-sm text-bold hover:bg-blue-700"
//           >
//             Submit Ticket
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TicketForm({ setTickets }) {
  const navigate = useNavigate();

  const initialFormState = {
    subject: "",
    category: "",
    branch: "",
    date: "",
    description: "",
    priority: "Low",
    attachment: null, // new
  };

  const [formData, setFormData] = useState(initialFormState);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "image/png")) {
      setFormData({ ...formData, attachment: file });
    } else {
      toast.error("Only .png or .pdf files are allowed.");
      e.target.value = ""; // reset the file input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.category || !formData.branch) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newTicket = {
      ticketId: Date.now(),
      subject: formData.subject,
      category: formData.category,
      branch: formData.branch,
      date: formData.date,
      priority: formData.priority,
      description: formData.description,
      resolved: false,
      attachment: formData.attachment?.name || null, // just store filename for now
    };

    setTickets((prevTickets) => [...prevTickets, newTicket]);
    toast.success(`Your request was added with ID ${newTicket.ticketId}`);
    navigate("/tickets");
  };

  const handleCancel = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-600">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block capitalize text-gray-600">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
          />
        </div>


        <div>
          <label className="block font-medium capitalize text-gray-600">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
          >
            <option value="">Select Category</option>
            <option value="Hardware Problem">Hardware Problem</option>
            <option value="Software Problem">Software Problem</option>
            <option value="User Account">Account Problem</option>
          </select>
        </div>

        {/* Branch */}
        <div>
          <label className="block font-medium capitalize text-gray-600">
            Branch <span className="text-red-500">*</span>
          </label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
          >
            <option value="">Select Branch</option>
            <option value="Fedha">Fedha</option>
            <option value="Tassia">Tassia</option>
            <option value="Utawala">Utawala</option>
            <option value="Kitengela">Kitengela</option>
            <option value="Machakos">Machakos</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium capitalize text-gray-600">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            min={today}
            defaultValue="2025-04-07"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-gray-600 bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium capitalize text-gray-600">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-gray-600 bg-white h-18"
          />
        </div>

        {/* File Upload */}
        {/* <div>
          <label className="block font-medium text-gray-600">
            Attach File (PDF or PNG only)
          </label>
          <input
            type="file"
            accept=".pdf,.png"
            onChange={handleFileChange}
            className="w-full border p-2 rounded mt-1 bg-white text-gray-600"
          />
          {formData.attachment && (
            <p className="text-sm text-gray-500 mt-1">
              Selected file: <span className="font-medium">{formData.attachment.name}</span>
            </p>
          )}
        </div> */}

        {/* Priority */}
        <div>
          <label className="block font-medium capitalize text-gray-600">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-white"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-3 py-2 rounded text-sm font-bold hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-blue-700"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
