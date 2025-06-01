import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Helpers/Api/AuthContext";
import axios from "axios";

const TicketForm = () => {
  const { token, branch } = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    subject: "",
    department_id: "",
    category: "",
    priority: "low",
    description: "",
    attachment: null,
    branch: branch,
    status: "open",
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
        setFormData({ ...formData, attachment: files[0] });
      } else {
        toast.error(
          "Invalid file type. Only PDF, Word (doc/docx), JPG, and PNG are allowed."
        );
        e.target.value = "";
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const branch = localStorage.getItem("branch");
    if (!branch) {
      toast.error("Branch not selected. Please log in again.");
      navigate("/select-branch");
      return;
    }
    const data = new FormData();
    data.append("ticket[subject]", formData.subject.trim());
    data.append("ticket[category]", formData.category);
    data.append("ticket[department_id]", formData.department_id);
    data.append("ticket[description]", formData.description);
    data.append("ticket[priority]", formData.priority);
    data.append("ticket[branch]", branch);
    data.append("ticket[status]", formData.status);
    if (formData.attachment) {
      data.append("ticket[attachment]", formData.attachment);
    }

    try {
      await axios.post("http://127.0.0.1:3000/tickets", data, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,

          Accept: "application/json",
        },
      });
      alert("Ticket submitted!");
      navigate("/tickets");
    } catch (error) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        alert(
          `Failed to submit ticket: ${
            error.response.data?.error || "Server Error"
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response received from the server.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("Error setting up the request.");
      }
    }
  };

  useEffect(() => {
    const fetchDepartmentsAndCategories = async () => {
      try {
        const [deptRes, catRes] = await Promise.all([
          axios.get("http://127.0.0.1:3000/departments", {
            headers: { Authorization: `Bearer ${token.trim()}` },
          }),
          axios.get("http://127.0.0.1:3000/categories", {
            headers: { Authorization: `Bearer ${token.trim()}` },
          }),
        ]);
        setDepartments(deptRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load departments or categories");
      }
    };

    fetchDepartmentsAndCategories();
  }, [token]);

  return (
    <div className="p-4 max-w-6xl mx-auto text-gray-600">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-lg font-semibold capitalize text-gray-600 ">
            Subject <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Subject"
            required
          />
        </div>

        <div>
          <label className="block font-semibold capitalize text-gray-600">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            className="w-3/4 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select an option</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold capitalize text-gray-600">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-3/4 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select an option</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold capitalize text-gray-600">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            // className="w-3/4 border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:border-gray-700"
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold capitalize text-gray-600">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Attachment (PDF or Image)
          </label>
          <input
            type="file"
            name="attachment"
            accept=".pdf,image/*"
            onChange={handleChange}
            // className="w-3/4 border border-gray-300 p-2 rounded"
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: .pdf, .jpg, .jpeg, .png
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 font-semibold hover:bg-blue-700 text-white px-6 py-2 rounded mr-[25%]"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default TicketForm;
