import React, { useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      userType: "Admin",
      email: "alice@hospital.com",
    },
    {
      id: 2,
      name: "Bob Smith",
      userType: "Regular",
      email: "bob@hospital.com",
    },
    {
      id: 3,
      name: "Charlie Brown",
      userType: "Admin",
      email: "charlie@hospital.com",
    },
    {
      id: 4,
      name: "David Lee",
      userType: "Regular",
      email: "david@hospital.com",
    },
  ]);

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

  // Handle delete user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Handle add/update user
  const handleSaveUser = (userData) => {
    if (editUser) {
      setUsers(
        users.map((user) => (user.id === editUser.id ? userData : user))
      );
    } else {
      setUsers([...users, { ...userData, id: Date.now() }]);
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

      {/* Search, Add & Filter Section */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-1/3 text-gray-700"
        />

        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          + Add User
        </button>

        <select
          onChange={handleFilterChange}
          value={filterType}
          className="p-2 border rounded text-gray-700"
        >
          <option value="">All Users</option>
          <option value="Admin">Admin</option>
          <option value="Regular">Regular</option>
        </select>
      </div>

      <table className="w-full border-collapse border text-gray-700">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">User Type</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-gray-700">
              <td className="p-3 border">{user.id}</td>
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.userType}</td>
              <td className="p-3 border">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                  onClick={() => openEditModal(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <UserModal
          onSave={handleSaveUser}
          onClose={closeModal}
          editUser={editUser}
        />
      )}
    </div>
  );
};

const UserModal = ({ onSave, onClose, editUser }) => {
  const [userData, setUserData] = useState(
    editUser || { name: "", email: "", userType: "Regular" }
  );

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
    <div className="fixed inset-0 bg-blue-200  flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {editUser ? "Edit User" : "Add User"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded text-gray-700"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded text-gray-700"
          />
          <select
            name="userType"
            value={userData.userType}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-700"
          >
            <option value="Admin">Admin</option>
            <option value="Regular">Regular</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              {editUser ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageUsers;
