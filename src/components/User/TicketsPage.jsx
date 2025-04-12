import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
  const navigate = useNavigate();
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
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
      updatedAt: new Date(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Created:", formData);
    navigate("/tickets");
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-600">
      {/* Header */}
      <header className="bg-white shadow px-4 sm:px-6 md:px-12 py-3 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-gray-700">Bristol Desk</h1>
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
          JD
        </div>
      </header>

      {/* Form container */}
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 mt-6 rounded shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h4 className="text-2xl font-bold">Create Ticket</h4>
          <button
            onClick={() => navigate("/tickets")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Return to Ticket List
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-700"
              placeholder="Enter the subject"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block font-semibold mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-700"
              required
            >
              <option value="">Select an option</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block font-semibold mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border bg-white border-gray-300 p-2 rounded focus:outline-none focus:border-gray-700"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-700"
              placeholder="Provide a detailed description of the issue"
              required
            />
          </div>

          {/* Attachment */}
          <div>
            <label className="block font-semibold mb-1">
              Attachment (PDF or Image)
            </label>
            <input
              type="file"
              name="attachment"
              accept=".pdf,image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: .pdf, .jpg, .jpeg, .png, .webp
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketPage;
