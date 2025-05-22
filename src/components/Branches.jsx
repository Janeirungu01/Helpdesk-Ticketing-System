import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');

  const fetchBranches = async (search = '') => {
    const res = await axios.get(`http://127.0.0.1:3000/branches?query=${search}`);
    setBranches(res.data);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleAddBranch = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await axios.post('http://127.0.0.1:3000/branches', { branch: { name } });
      setName('');
      fetchBranches();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/branches/${id}`);
      fetchBranches();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    fetchBranches(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Branches</h2>

      <form onSubmit={handleAddBranch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-1 w-1/3"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Add
        </button>
      </form>

      <input
        type="text"
        placeholder="Search branches..."
        value={query}
        onChange={handleSearch}
        className="border px-3 py-1 rounded w-full mb-4"
      />

      <table className="w-full border text-gray-600">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              <td className="border px-4 py-2">{branch.name}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(branch.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Branches;
