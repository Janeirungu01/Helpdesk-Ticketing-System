import { useState } from "react";

export default function TicketForm() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    category: "",
    priority: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
      alert("Ticket Created Successfully");
    }
  };

  const handleCancel = () => {
    setFormData({
        email: "",
        subject: "",
        category: "",
        priority: "",
        description: "",
    });
  };

  return (
    <div className="w-3/4 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-black">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
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
                <option value="">Select Priority</option>
                <option value="Urgent">Urgent</option>
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
            {errors[key] && (
              <p className="text-red-500 text-sm">{errors[key]}</p>
            )}
          </div>
        ))}
        {/* <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button> */}

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
