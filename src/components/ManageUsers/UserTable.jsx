import React from "react";

const UserTable = ({
  users,
  handleToggleStatus,
  openEditModal,
  handleResetPassword,
}) => {
  return (
    <table className="w-full border-collapse border text-gray-700">
      <thead>
        <tr className="bg-gray-200">
          {["Name", "Email", "User Name", "User Type", "Status", "Actions"].map(
            (header) => (
              <th key={header} className="p-3 border">
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-gray-700">
            <td className="p-3 border">{user.fullname}</td>
            <td className="p-3 border">{user.email}</td>
            <td className="p-3 border">{user.username}</td>
            <td className="p-3 border">{user.usertype}</td>
            <td className="p-3 border">{user.status}</td>
            <td className="p-3 border space-x-2">
              <button
                className={`px-3 py-1 rounded text-white ${
                  user.status === "Suspended"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onClick={() => user.status === "Active" && openEditModal(user)}
                disabled={user.status === "Suspended"}
              >
                Edit
              </button>

              <button
                className={`px-3 py-1 rounded text-white ${
                  user.status === "Active"
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-green-500 hover:bg-green-700"
                }`}
                onClick={() => handleToggleStatus(user.id)}
              >
                {user.status === "Active" ? "Suspend" : "Unsuspend"}
              </button>

              <button
                className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-700 text-white"
                onClick={() => handleResetPassword(user)}
              >
                Reset Password
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
