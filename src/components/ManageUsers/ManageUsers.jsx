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
    handleResetPassword,
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
        handleResetPassword={handleResetPassword}
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
