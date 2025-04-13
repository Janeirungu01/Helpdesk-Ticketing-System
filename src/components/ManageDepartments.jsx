import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";

const ManageDepartments = () => {
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem("departments");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Radiology", visible: true },
          { id: 2, name: "Cardiology", visible: false },
          { id: 3, name: "Pediatrics", visible: true },
        ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDept, setEditDept] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    setEditDept(null);
    setIsModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditDept(dept);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleToggleVisibility = (id) => {
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === id ? { ...dept, visible: !dept.visible } : dept
      )
    );
  };

  const handleSaveDepartment = (deptData) => {
    if (editDept) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editDept.id ? { ...deptData, id: editDept.id } : dept
        )
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        { ...deptData, id: Date.now(), visible: true },
      ]);
    }
    closeModal();
  };

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">
        Manage Departments
      </h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search departments..."
          className="px-4 py-2 border rounded-md w-1/3 focus:outline-none focus:border-gray-700 focus:ring-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          + Add Department
        </button>
      </div>

      <table className="w-full border-collapse border text-gray-700">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Department Name</th>
            <th className="p-3 border">Visibility</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((dept) => (
            <tr key={dept.id}>
              <td className="p-3 border">{dept.name}</td>
              <td className="p-3 border">
                {dept.visible ? "Visible" : "Private"}
              </td>
              <td className="p-3 border space-x-2">
                <button
                  className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                  onClick={() => openEditModal(dept)}
                >
                  Edit
                </button>
                <button
                  className={`px-3 py-1 rounded text-white ${
                    dept.visible ? "bg-red-500" : "bg-green-500"
                  }`}
                  onClick={() => handleToggleVisibility(dept.id)}
                >
                  {dept.visible ? "Hide" : "Show"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <DepartmentModal
          onSave={handleSaveDepartment}
          onClose={closeModal}
          editDept={editDept}
        />
      )}
    </div>
  );
};

const DepartmentModal = ({ onSave, onClose, editDept }) => {
  const [deptData, setDeptData] = useState(
    editDept || { name: "", visible: true }
  );

  const handleChange = (e) => {
    setDeptData({ ...deptData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setDeptData((prev) => ({ ...prev, visible: !prev.visible }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deptData.name.trim()) {
      alert("Please enter department name!");
      return;
    }
    onSave(deptData);
  };

  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    width: 600,
    height: "auto",
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "gray", fontWeight: "bold", textAlign: "center" }}
        >
          {editDept ? "Edit Department" : "Add Department"}
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "1rem",
          }}
        >
          <TextField
            fullWidth
            label="Department Name"
            name="name"
            value={deptData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "gray" } }}
            InputProps={{ style: { color: "gray" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "darkgray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              "& label.Mui-focused": {
                color: "gray",
              },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={deptData.visible}
                onChange={handleToggle}
                color="primary"
              />
            }
            label="Visible"
            sx={{ color: "gray" }}
          />

          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                backgroundColor: "#6b7280",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained" color="primary">
              {editDept ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ManageDepartments;
