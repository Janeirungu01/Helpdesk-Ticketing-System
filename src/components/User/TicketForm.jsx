import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";

const TicketForm = ({ setTickets }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      toast.error("User not logged in");
    }
  }, []);

  const [formData, setFormData] = useState({
    subject: "",
    department: "",
    category: "",
    priority: "Low",
    description: "",
    attachment: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "attachment") {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
  
      if (file && allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            attachment: {
              name: file.name,
              type: file.type,
              data: reader.result, 
            },
            updatedAt: new Date(),
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(
          "Invalid file type. Only PDF, Word (doc/docx), JPG, and PNG are allowed."
        );
        e.target.value = "";
      }
    } else {
      setFormData({ ...formData, [name]: value, updatedAt: new Date() });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["subject", "department", "priority", "description"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    const timestamp = new Date().toISOString();

    const newTicket = {
      ticketId: Date.now(),
      subject: formData.subject,
      category: formData.category,
      department: formData.department,
      priority: formData.priority,
      description: formData.description,
      branch: user?.branch || "Unknown",
      createdBy: {
        
        name: user?.userName || "Unknown",
        email: user?.email || "Unknown",
        userType: user?.userType || "User",
      },
      resolved: false,
      date: timestamp,
      attachment: formData.attachment?.name || null,
    };
  
    

    setTickets((prev) => [...prev, newTicket]);
    toast.success(`Ticket #${newTicket.ticketId} created successfully.`);
    navigate("/tickets");
  };

  return (
    <div className="min-h-screen max-w-5xl px-3 bg-blue-50 text-gray-500">
    

      <div className="max-w-5xl mx-auto bg-white p-6 mt-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-2xl font-bold">Create Ticket</h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-700"
              placeholder="Subject"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 px-3 py-2 rounded"
              required
            >
              <option value="">Select an option</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label className="block font-medium capitalize text-gray-600">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-3/4 border bg-white border-gray-300 p-2 mt-1 rounded focus:outline-none focus:border-gray-700"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block font-medium capitalize text-gray-600">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:border-gray-700"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Attachment (PDF, Word, Image)
            </label>
            <input
              type="file"
              name="attachment"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleChange}
              className="w-3/4 border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
