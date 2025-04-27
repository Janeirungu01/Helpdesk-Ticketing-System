// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import { dummyUsers } from "../../Helpers/DummyData";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
// } from "@mui/material";

// const defaultUserData = {
//   fullname: "",
//   email: "",
//   username: "",
//   password: "",
//   password_confirmation: "",
//   usertype: "Regular",
//   branches: [],
// };

// const branchesList = ["FEDHA", "TASSIA", "UTAWALA", "KITENGELA", "MACHAKOS"];

// const ManageUsers = () => {
//   const [users, setUsers] = useState(dummyUsers);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editUser, setEditUser] = useState(null);

//   const openModal = () => {
//     setEditUser(null);
//     setIsModalOpen(true);
//   };

//   const openEditModal = (user) => {
//     setEditUser(user);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditUser(null); 
//   };

//   const handleToggleStatus = (id) => {
//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === id
//           ? {
//               ...user,
//               status: user.status === "active" ? "suspended" : "active",
//             }
//           : user
//       )
//     );
//   };

//   const handleSaveUser = (userData) => {
//     if (editUser) {
//       setUsers((prev) =>
//         prev.map((user) => (user.id === editUser.id ? userData : user))
//       );
//     } else {
//       setUsers((prev) => [
//         ...prev,
//         { ...userData, id: Date.now(), status: "active" },
//       ]);
//     }
//     closeModal();
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterType ? user.userType === filterType : true)
//   );

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Users</h2>

//       <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Search users by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="px-4 py-2 border rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-gray-500"
//         />

//         <button
//           onClick={openModal}
//           className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
//         >
//           + Add User
//         </button>

//         <select
//           onChange={(e) => setFilterType(e.target.value)}
//           value={filterType}
//           className="p-2 border rounded text-gray-700 focus:ring-2 focus:ring-gray-500"
//         >
//           <option value="">All Users</option>
//           <option value="Admin">Admin</option>
//           <option value="Agent">Agent</option>
//         </select>
//       </div>

//       <table className="w-full border-collapse border text-gray-700">
//         <thead>
//           <tr className="bg-gray-200">
//             {["Name", "Email", "User Type", "Status", "Actions"].map(
//               (header) => (
//                 <th key={header} className="p-3 border">
//                   {header}
//                 </th>
//               )
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user) => (
//             <tr key={user.id} className="text-gray-700">
//               <td className="p-3 border">{user.name}</td>
//               <td className="p-3 border">{user.email}</td>
//               <td className="p-3 border">{user.userType}</td>
//               <td className="p-3 border">{user.status}</td>
//               <td className="p-3 border space-x-2">
//                 <button
//                   className={`px-3 py-1 rounded text-white ${
//                     user.status === "suspended"
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-blue-500 hover:bg-blue-700"
//                   }`}
//                   onClick={() =>
//                     user.status === "active" && openEditModal(user)
//                   }
//                   disabled={user.status === "suspended"}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className={`px-3 py-1 rounded text-white ${
//                     user.status === "active"
//                       ? "bg-red-500 hover:bg-red-700"
//                       : "bg-green-500 hover:bg-green-700"
//                   }`}
//                   onClick={() => handleToggleStatus(user.id)}
//                 >
//                   {user.status === "active" ? "Suspend" : "Unsuspend"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <UserModal
//         open={isModalOpen}
//         handleClose={closeModal}
//         onSave={handleSaveUser}
//         editUser={editUser}
//       />
//     </div>
//   );
// };

// const modalStyle = {
//   position: "absolute",
//   top: "10%",
//   left: "50%",
//   transform: "translate(-50%, 0%)",
//   width: 600,
//   bgcolor: "#f8fafc",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
//   maxHeight: "80vh",
//   overflowY: "auto",
// };

// const UserModal = ({ open, handleClose, editUser }) => {
//   const [userData, setUserData] = useState(defaultUserData);

//   useEffect(() => {
//     setUserData(editUser || defaultUserData);
//   }, [editUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBranchToggle = (branch) => {
//     setUserData((prev) => ({
//       ...prev,
//       branches: prev.branches.includes(branch)
//         ? prev.branches.filter((b) => b !== branch)
//         : [...prev.branches, branch],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { fullname, username, password, password_confirmation, branches, email, usertype } = userData;

//     if (
//       !fullname ||
//       !username ||
//       !email ||
//       !usertype ||
//       !password ||
//       !password_confirmation ||
//       !branches
//     ) {
//       alert("Please fill all required fields!");
//       return;
//     }

//     if (password !== password_confirmation) {
//       alert("Passwords do not match!");
//       return;
//     }
//     //save user to DB
//     const payload = {
//       user: {
//         ...userData,
//       }
//     };

//     try {
//       const res = await axios.post('http://127.0.0.1:3000/users', payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });

//       alert(`Registration successful.`);
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//       alert(
//         'Registration failed: ' +
//           (error.response?.data?.error?.join(', ') || 'Server error')
//       );
//     }
//   };


//   const handleCancel = () => {
//     setUserData(defaultUserData);
//     handleClose();
//   };

//   return (
//     <Modal open={open} onClose={handleCancel}>
//       <Box sx={modalStyle}>
//         <Typography
//           variant="h6"
//           className="text-sm font-semibold mb-4 text-gray-700"
//         >
//           {editUser ? "Edit User" : "Add User"}
//         </Typography>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-3 text-gray-600 text-sm"
//         >
//           {[
//             { label: "Full Name", name: "fullname", type: "text", required: true },
//             { label: "Email", name: "email", type: "email", required: false },
//             {
//               label: "Username",
//               name: "username",
//               type: "text",
//               required: true,
//             },
//             {
//               label: "Password",
//               name: "password",
//               type: "password",
//               required: true,
//             },
//             {
//               label: "Confirm Password",
//               name: "password_confirmation",
//               type: "password",
//               required: true,
//             },
//           ].map(({ label, name, type, required }) => (
//             <Box key={name} display="flex" alignItems="center" gap={2}>
//               <Box width="35%">
//                 <span className="text-xs text-gray-600">
//                   {label}
//                   {required && <span className="text-red-500"> *</span>}
//                 </span>
//               </Box>
//               <TextField
//                 fullWidth
//                 name={name}
//                 type={type}
//                 value={userData[name]}
//                 onChange={handleChange}
//                 variant="outlined"
//                 size="small"
//                 inputProps={{ style: { fontSize: "0.8rem" } }}
//               />
//             </Box>
//           ))}

//           <Box display="flex" alignItems="center" gap={2}>
//             <Box width="35%">
//               <span className="text-xs text-gray-600">
//                 User Type <span className="text-red-500">*</span>
//               </span>
//             </Box>
//             <FormControl fullWidth size="small">
//               <Select
//                 name="usertype"
//                 value={userData.userType}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Client">Admin</MenuItem>
//                 <MenuItem value="Client">Agent</MenuItem>
//                 <MenuItem value="Admin">Client</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <Box display="flex" alignItems="center" gap={2}>
//             <Box width="35%">
//               <span className="text-xs text-gray-600">
//                 Branches <span className="text-red-500">*</span>
//               </span>
//             </Box>
//             <Box display="flex" gap={2} flexWrap="wrap">
//               {branchesList.map((branch) => (
//                 <label key={branch} className="flex items-center text-xs gap-1">
//                   <input
//                     type="checkbox"
//                     checked={userData.branches.includes(branch)}
//                     onChange={() => handleBranchToggle(branch)}
//                   />
//                   {branch}
//                 </label>
//               ))}
//             </Box>
//           </Box>

//           <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//             <Button
//               variant="outlined"
//               color="inherit"
//               size="small"
//               onClick={handleCancel}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="small"
//             >
//               {editUser ? "Update" : "Add"}
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default ManageUsers;





import useUsers from "./useUsers";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import UserFilters from "./UserFilters";

const ManageUsers = () => {
  const {
    users,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    openModal,
    openEditModal,
    closeModal,
    handleToggleStatus,
    handleSaveUser,
    isModalOpen,
    editUser,
  } = useUsers();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Users</h2>

      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        openModal={openModal}
      />

      <UserTable
        users={users}
        handleToggleStatus={handleToggleStatus}
        openEditModal={openEditModal}
      />

      <UserModal
        open={isModalOpen}
        handleClose={closeModal}
        editUser={editUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default ManageUsers;
