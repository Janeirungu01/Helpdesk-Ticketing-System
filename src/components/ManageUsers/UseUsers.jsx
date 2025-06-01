// import { useState, useEffect } from "react";
// import axios from "axios";

// const UseUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editUser, setEditUser] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:3000/users/get_users",
//           {
//             headers: {
//               Accept: "application/json",
//             },
//           }
//         );
//         setUsers(response.data);
//         localStorage.setItem('users', JSON.stringify(response.data))
//       } catch (err) {
//         setError(err.message || "Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const openModal = () => {
//     setEditUser(null);
//     setIsModalOpen(true);
//   };

//   const openEditModal = (user) => {
//     setEditUser(user);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setEditUser(null);
//     setIsModalOpen(false);
//   };

//   const handleToggleStatus = (id) => {
//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === id
//           ? {
//               ...user,
//               status: user.status === "Active" ? "Suspended" : "Active",
//             }
//           : user
//       )
//     );
//   };

//   const handleResetPassword = (user) => {
//     const confirmReset = window.confirm(
//       `Are you sure you want to reset password for ${user.fullname}?`
//     );
//     if (confirmReset) {
//       console.log(`Password reset initiated for user: ${user.username}`);
//       // axios.post(`http://127.0.0.1:3000/users/reset-password/${user.id}`)
//     }
//   };

//   // const handleSaveUser = async (userData) => {
//   //   try {
//   //     const payload = {
//   //       user: {
//   //         fullname: userData.fullname,
//   //         email: userData.email,
//   //         username: userData.username,
//   //         password: userData.password,
//   //         password_confirmation: userData.password_confirmation,
//   //         usertype: userData.usertype,
//   //         branches: userData.branches,
//   //         status: "Active",
//   //       },
//   //     };
  
//   //     const res = await axios.post("http://127.0.0.1:3000/users", payload, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "application/json",
//   //       },
//   //     });
  
//   //     alert(`Registration successful.`);
//   //     console.log(res.data);
  
//   //     setUsers((prev) => [
//   //       ...prev,
//   //       {
//   //         ...res.data,
//   //         id: res.data.id || Date.now(),
//   //         status: res.data.status || "active",
//   //       },
//   //     ]);
  
//   //     return true; 
//   //   } catch (error) {
//   //     console.error(error);
//   //     alert(
//   //       "Registration failed: " +
//   //         (error.response?.data?.error?.join(", ") || "Server error")
//   //     );
//   //     throw error;
//   //   }
//   // };
//   const handleSaveUser = async (userData) => {
//   try {
//     const token = localStorage.getItem("token"); 

//     const userPayload = {
//       fullname: userData.fullname,
//       email: userData.email,
//       username: userData.username,
//       usertype: userData.usertype,
//       branches: userData.branches,
//       status: "Active",
//     };

//     // Only include password fields if they were entered
//     if (userData.password && userData.password_confirmation) {
//       userPayload.password = userData.password;
//       userPayload.password_confirmation = userData.password_confirmation;
//     }

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: token, 
//       },
//     };

//     let res;
//     if (userData.id) {
//       // Update existing user
//       res = await axios.put(
//         `http://127.0.0.1:3000/users/${userData.id}`,
//         { user: userPayload },
//         config
//       );

//       // Update the user in the state
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u.id === res.data.id ? { ...u, ...res.data } : u
//         )
//       );
//     } else {
      
//       res = await axios.post(
//         "http://127.0.0.1:3000/users",
//         { user: userPayload },
//         config
//       );

//       setUsers((prev) => [
//         ...prev,
//         {
//           ...res.data,
//           id: res.data.id || Date.now(),
//           status: res.data.status || "Active",
//         },
//       ]);
//     }

//     alert(`${userData.id ? "User updated" : "Registration successful"}.`);
//     // return true;
//   } catch (error) {
//     console.error("Save error:", error);
//     alert(
//       "Save failed: " +
//         (error.response?.data?.error?.join(", ") || "Server error")
//     );
//     throw error;
//   }
// };

  
//   const filteredUsers = users.filter(
//     (user) =>
//       user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterType ? user.usertype === filterType : true)
//   );

//   return {
//     users: filteredUsers,
//     searchTerm,
//     error,
//     loading,
//     setSearchTerm,
//     filterType,
//     setFilterType,
//     openModal,
//     openEditModal,
//     closeModal,
//     handleToggleStatus,
//     handleResetPassword,
//     handleSaveUser,
//     isModalOpen,
//     editUser,
//   };
// };

// export default UseUsers;


import { useState, useEffect } from "react";
import axios from "axios";

const UseUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/users/get_users",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
    setEditUser(null);
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    );
  };

  const handleResetPassword = (user) => {
    const confirmReset = window.confirm(
      `Are you sure you want to reset password for ${user.fullname}?`
    );
    if (confirmReset) {
      console.log(`Password reset initiated for user: ${user.username}`);
      // axios.post(`http://127.0.0.1:3000/users/reset-password/${user.id}`)
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      const payload = {
        user: {
          fullname: userData.fullname,
          email: userData.email,
          username: userData.username,
          password: userData.password,
          password_confirmation: userData.password_confirmation,
          usertype: userData.usertype,
          branches: userData.branches,
          status: "Active",
        },
      };

      const res = await axios.post("http://127.0.0.1:3000/users", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      alert(`Registration successful.`);
      console.log(res.data);

      setUsers((prev) => [
        ...prev,
        {
          ...res.data,
          id: res.data.id || Date.now(),
          status: res.data.status || "Active",
        },
      ]);

      closeModal();
    } catch (error) {
      console.error(error);
      alert(
        "Registration failed: " +
          (error.response?.data?.error?.join(", ") || "Server error")
      );
    }
  };

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (filterType ? user.usertype === filterType : true)
  // );

  return {
    users,
    searchTerm,
    error,
    loading,
    setSearchTerm,
    filterType,
    setFilterType,
    openModal,
    openEditModal,
    closeModal,
    handleToggleStatus,
    handleResetPassword,
    handleSaveUser,
    isModalOpen,
    editUser,
  };
};

export default UseUsers;