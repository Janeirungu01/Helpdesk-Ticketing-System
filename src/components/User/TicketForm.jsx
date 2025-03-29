import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TicketForm({setTickets}) {
  const navigate = useNavigate();


  const initialFormState = {
    subject: "",
    category: "",
    department: "",
    // email: "",
    description: "",
    priority: "Low",
  };

  const [formData, setFormData] = useState(initialFormState);
  // const [errors, setErrors] = useState({});


  // const validateForm = () => {
  //   let newErrors = {};
  //   Object.keys(formData).forEach((key) => {
  //     if (!formData[key].trim()) {
  //       newErrors[key] = `${key} is required`;
  //     }
  //   });
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.description || !formData.email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newTicket = {
      ticketId: Date.now(),
      subject: formData.subject,
      category: formData.category,
      department: formData.department,
      email: formData.email,
      priority: formData.priority,
      description: formData.description,
      resolved: false,
    };

    setTickets((prevTickets) => [...prevTickets, newTicket]);
    toast.success(`Your request was added with ID ${newTicket.ticketId}`);
    navigate("/tickets");
  };

  const handleCancel = () => {
    setFormData(initialFormState);
  };

  const renderInputField = (key) => (
    <div key={key}>
      <label className="block font-medium capitalize text-black">
        {key} <span className="text-red-500">*</span>
      </label>
      {key === "priority" ? (
        <select
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1 text-black bg-white"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      ) : (
        <input
          type={key === "email" ? "email" : "text"}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className={`w-full border p-2 rounded mt-1 text-black bg-white ${
            key === "description" ? "h-24" : ""
          }`}
        />
      )}
      {/* {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>} */}
    </div>
  );

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-600">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map(renderInputField)}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-3 py-2 rounded text-sm text-bold hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm text-bold hover:bg-blue-700"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
