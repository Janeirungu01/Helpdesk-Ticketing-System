import React, { useState } from "react";
import { dummyUsers } from "../../Helpers/DummyData";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const ManageUsers = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const openModal = () => {
    setEditUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "suspended" : "active",
            }
          : user
      )
    );
  };

  const handleSaveUser = (userData) => {
    if (editUser) {
      setUsers(
        users.map((user) => (user.id === editUser.id ? userData : user))
      );
    } else {
      setUsers([...users, { ...userData, id: Date.now(), status: "active" }]);
    }
    closeModal();
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? user.userType === filterType : true)
    );
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Users</h2>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          + Add User
        </button>

        <select
          onChange={handleFilterChange}
          value={filterType}
          className="p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="">All Users</option>
          <option value="Admin">Admin</option>
          <option value="Regular">Regular</option>
        </select>
      </div>

      <table className="w-full border-collapse border text-gray-700">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">User Type</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-gray-700">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.userType}</td>
              <td className="p-3 border">{user.status}</td>
              <td className="p-3 border space-x-2">
                <button
                  className={`px-3 py-1 rounded text-white ${
                    user.status === "suspended"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700"
                  }`}
                  onClick={() =>
                    user.status === "active" && openEditModal(user)
                  }
                  disabled={user.status === "suspended"}
                >
                  Edit
                </button>
                <button
                  className={`px-3 py-1 rounded text-white ${
                    user.status === "active"
                      ? "bg-red-500 hover:bg-red-700"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
                  onClick={() => handleToggleStatus(user.id)}
                >
                  {user.status === "active" ? "Suspend" : "Unsuspend"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        open={isModalOpen}
        handleClose={closeModal}
        onSave={handleSaveUser}
        editUser={editUser}
      />
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 0%)",
  width: 600,
  bgcolor: "#f8fafc",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

const UserModal = ({ open, handleClose, onSave, editUser }) => {
  const [userData, setUserData] = useState(
    editUser || { name: "", email: "", userType: "Regular", status: "active" }
  );

  React.useEffect(() => {
    setUserData(
      editUser || { name: "", email: "", userType: "Regular", status: "active" }
    );
  }, [editUser]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email) {
      alert("Please fill all fields!");
      return;
    }
    onSave(userData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          className="text-lg font-semibold mb-4"
        >
          {editUser ? "Edit User" : "Add User"}
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            variant="outlined"
            sx={{ bgcolor: "#fff" }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            variant="outlined"
            sx={{ bgcolor: "#fff" }}
          />
          <FormControl fullWidth>
            <InputLabel>User Type</InputLabel>
            <Select
              name="userType"
              value={userData.userType}
              label="User Type"
              onChange={handleChange}
              sx={{
                bgcolor: "#fff",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  borderColor: "#d1d5db",
                },
              }}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editUser ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ManageUsers;
