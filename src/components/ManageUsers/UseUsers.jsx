import { useState, useEffect } from "react";
import { Axios } from "../../Helpers/Api/AxiosInstance";

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
        const response = await Axios.get("/users/get_users");
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
      // Axios.post(`/users/reset-password/${user.id}`)
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

      const res = await Axios.post("/users", payload);

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