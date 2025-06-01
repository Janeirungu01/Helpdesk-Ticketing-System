import { useEffect, useState } from "react";
import {Modal, Box, Typography, TextField, Button, Select,  MenuItem,
  FormControl, } from "@mui/material";

// const [branchesList, setBranchesList] = useState([]);
const branchesList = ["FEDHA", "TASSIA", "UTAWALA", "KITENGELA", "MACHAKOS"];

const defaultUserData = {
  fullname: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
  usertype: "Agent",
  branches: [],
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

const UserModal = ({ open, handleClose, editUser, onSave }) => {
  const [userData, setUserData] = useState(defaultUserData);
  
  useEffect(() => {
  setUserData(editUser ? { ...defaultUserData, ...editUser } : defaultUserData);
}, [editUser]);

// useEffect(() => {
//   const fetchBranches = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:3000/branches");
//       const data = await response.json();
//       setBranchesList(data);
//     } catch (error) {
//       console.error("Failed to fetch branches:", error);
//     }
//   };

//   fetchBranches();
// }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBranchToggle = (branch) => {
    setUserData((prev) => ({
      ...prev,
      branches: prev.branches.includes(branch)
        ? prev.branches.filter((b) => b !== branch)
        : [...prev.branches, branch],
    }));
  };
 
   const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.password_confirmation) {
      alert("Passwords do not match!");
      return;
    }
    onSave(userData);
  };

  const handleCancel = () => {
    setUserData(defaultUserData);  
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box sx={modalStyle}>
        <Typography variant="h6" className="text-sm font-semibold mb-4 text-gray-700">
          {editUser ? "Edit User" : "Add User"}
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-3 text-gray-600 text-sm">
          {[
            { label: "Full Name", name: "fullname", type: "text", required: true },
            { label: "Email", name: "email", type: "email", required: false },
            { label: "Username", name: "username", type: "text", required: true },
            { label: "Password", name: "password", type: "password", required: true },
            { label: "Confirm Password", name: "password_confirmation", type: "password", required: true },
          ].map(({ label, name, type, required }) => (
            <Box key={name} display="flex" alignItems="center" gap={2}>
              <Box width="35%">
                <span className="text-xs text-gray-600">
                  {label}
                  {required && <span className="text-red-500"> *</span>}
                </span>
              </Box>
              <TextField
                fullWidth
                name={name}
                type={type}
                value={userData[name]}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Box>
          ))}

          <Box display="flex" alignItems="center" gap={2}>
            <Box width="35%">
              <span className="text-xs text-gray-600">
                User Type <span className="text-red-500">*</span>
              </span>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                name="usertype"
                value={userData.usertype}
                onChange={handleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Agent">Agent</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Box width="35%">
              <span className="text-xs text-gray-600">
                Branches <span className="text-red-500">*</span>
              </span>
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
{/* 
              {branchesList.map((branch) => {
              const branchName = typeof branch === "string" ? branch : branch.name;
              return (
                <label key={branchName} className="flex items-center text-xs gap-1">
                  <input
                    type="checkbox"
                    checked={userData.branches.includes(branchName)}
                    onChange={() => handleBranchToggle(branchName)}
                  />
                  {branchName}
                </label>
              );
            })} */}

              {branchesList.map((branch) => (
                <label key={branch} className="flex items-center text-xs gap-1">
                  <input
                    type="checkbox"
                    checked={userData.branches.includes(branch)}
                    onChange={() => handleBranchToggle(branch)}
                  />
                  {branch}
                </label>
              ))}
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button variant="outlined" color="inherit" size="small" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" size="small">
              {editUser ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;
