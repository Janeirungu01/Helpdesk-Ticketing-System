import { useState, useEffect } from "react";
import axios from "axios";

const useUsers = () => {
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
        const response = await axios.get('http://127.0.0.1:3000/users/get_users', {
          headers: {
            'Accept': 'application/json',
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
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
              status: user.status === "active" ? "suspended" : "active",
            }
          : user
      )
    );
  };

  // const handleSaveUser = (userData) => {
  //   if (editUser) {
  //     setUsers((prev) =>
  //       prev.map((user) => (user.id === editUser.id ? userData : user))
  //     );
  //   } else {
  //     setUsers((prev) => [
  //       ...prev,
  //       { ...userData, id: Date.now(), status: "active" },
  //     ]);
  //   }
  //   closeModal();
  // };

  const handleSaveUser = async (userData) => {
    try {
      const payload = {
        user : {
        fullname: userData.fullname,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        usertype: userData.usertype,
        branches: userData.branches,
      }
      };
  
      const res = await axios.post('http://127.0.0.1:3000/users', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      alert(`Registration successful.`);
      console.log(res.data);
  
      setUsers((prev) => [
        ...prev,
        { ...res.data, id: res.data.id || Date.now(), status: "active" },
      ]);
  
      closeModal();
    } catch (error) {
      console.error(error);
      alert(
        'Registration failed: ' +
          (error.response?.data?.error?.join(', ') || 'Server error')
      );
    }
  };
  

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? user.userType === filterType : true)
  );

  return {
    users: filteredUsers,
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
    handleSaveUser,
    isModalOpen,
    editUser,
  };
};

export default useUsers;
