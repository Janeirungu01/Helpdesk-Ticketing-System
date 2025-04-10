// import { useState } from 'react';

// export default function Department() {
//   const [departmentName, setDepartmentName] = useState('');
//   const [allAgents, setAllAgents] = useState(false);
//   const [visibility, setVisibility] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ departmentName, allAgents, visibility });
//     // Add API call or state update here
//   };

//   return (
//     <div className=" mx-auto p-4 bg-white shadow rounded-lg mt-6">
//       <h2 className="text-2xl font-bold text-gray-600 mb-4">Create department</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Department details */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Department details</h3>
//           <label className="block mb-1 text-sm font-medium text-gray-600">Name</label>
//           <input
//             type="text"
//             value={departmentName}
//             onChange={(e) => setDepartmentName(e.target.value)}
//             className="w-full border border-gray-300 rounded p-2 text-gray-800"
//             placeholder="Name"
//           />
//         </div>

//         {/* All agents toggle */}
//         <div className="flex items-center justify-between">
//           <label className="text-gray-700 font-medium">All agents</label>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500">Only selected agents</span>
//             <input
//               type="checkbox"
//               checked={allAgents}
//               onChange={() => setAllAgents(!allAgents)}
//               className="toggle-checkbox"
//             />
//           </div>
//         </div>
//         <p className="text-sm text-gray-500">
//           Allows access to the department to all agents, or exclusively to a specific group of agents.
//         </p>

//         {/* Visibility toggle */}
//         <div className="flex items-center justify-between mt-4">
//           <label className="text-gray-700 font-medium">Visibility</label>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500">The department is public</span>
//             <input
//               type="checkbox"
//               checked={visibility}
//               onChange={() => setVisibility(!visibility)}
//               className="toggle-checkbox"
//             />
//           </div>
//         </div>
//         <p className="text-sm text-gray-500">
//           If the department is public, it allows users to select this department when creating the ticket,
//           otherwise only agents can reassign to this department.
//         </p>

//         {/* Department agents */}
//         <div className="border-t pt-4">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Department agents</h3>
//           <p className="text-sm text-gray-500 mb-2">List of agents assigned to the department.</p>
//           <div className="flex items-center space-x-3">
//             <span className="text-green-500 text-lg">✔</span>
//             <div>
//               <p className="text-gray-700 font-medium">Admin</p>
//               <p className="text-sm text-gray-500">admin@admin.com</p>
//             </div>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="flex justify-end space-x-4 pt-6">
//           <button
//             type="button"
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Create department
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Radiology", visible: true },
    { id: 2, name: "Cardiology", visible: false },
    { id: 3, name: "Pediatrics", visible: true },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDept, setEditDept] = useState(null);

  const openModal = () => {
    setEditDept(null);
    setIsModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditDept(dept);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleVisibility = (id) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id ? { ...dept, visible: !dept.visible } : dept
      )
    );
  };

  const handleSaveDepartment = (deptData) => {
    if (editDept) {
      setDepartments(
        departments.map((dept) =>
          dept.id === editDept.id ? deptData : dept
        )
      );
    } else {
      setDepartments([
        ...departments,
        { ...deptData, id: Date.now(), visible: true },
      ]);
    }
    closeModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Departments</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          + Add Department
        </button>
      </div>

      <table className="w-full border-collapse border text-gray-700">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Department Name</th>
            <th className="p-3 border">Visibility</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td className="p-3 border">{dept.id}</td>
              <td className="p-3 border">{dept.name}</td>
              <td className="p-3 border">{dept.visible ? "Visible" : "Hidden"}</td>
              <td className="p-3 border space-x-2">
                <button
                  className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                  onClick={() => openEditModal(dept)}
                >
                  Edit
                </button>
                <button
                  className={`px-3 py-1 rounded text-white ${
                    dept.visible ? "bg-red-500" : "bg-green-500"
                  }`}
                  onClick={() => handleToggleVisibility(dept.id)}
                >
                  {dept.visible ? "Hide" : "Show"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <DepartmentModal
          onSave={handleSaveDepartment}
          onClose={closeModal}
          editDept={editDept}
        />
      )}
    </div>
  );
};

const DepartmentModal = ({ onSave, onClose, editDept }) => {
  const [deptData, setDeptData] = useState(
    editDept || { name: "", visible: true }
  );

  const handleChange = (e) => {
    setDeptData({ ...deptData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setDeptData((prev) => ({ ...prev, visible: !prev.visible }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deptData.name) {
      alert("Please enter department name!");
      return;
    }
    onSave(deptData);
  };

  return (
    <div className="fixed inset-0 bg-blue-200 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {editDept ? "Edit Department" : "Add Department"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={deptData.name}
            onChange={handleChange}
            placeholder="Department Name"
            className="w-full p-2 border rounded text-gray-700"
          />

          <div className="flex items-center justify-between">
            <label className="text-gray-700">Visible</label>
            <input
              type="checkbox"
              checked={deptData.visible}
              onChange={handleToggle}
              className="w-5 h-5"
            />
          </div>

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
              {editDept ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageDepartments;
