const UserFilters = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  openModal,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-gray-500"
      />
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        + Add User
      </button>
      <select
        onChange={(e) => setFilterType(e.target.value)}
        value={filterType}
        className="p-2 border rounded text-gray-700 focus:ring-2 focus:ring-gray-500"
      >
        <option value="">All Users</option>
        <option value="Admin">Admin</option>
        <option value="Agent">Agent</option>
        <option value="Client">Client</option>
      </select>
    </div>
  );
};

export default UserFilters;
