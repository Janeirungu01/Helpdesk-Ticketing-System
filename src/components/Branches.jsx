import { useState, useEffect } from 'react';
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
    <div className="mx-auto p-6 bg-white text-gray-600">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Manage Branches</h2>  
      <form onSubmit={handleAddBranch} >
        <div className="flex justify-between items-center mb-4">  
        <input
          type="text"
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-md w-1/3 focus:outline-none focus:border-gray-700 focus:ring-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Branch 
        </button>
          </div> 
      </form>
    

      <input
        type="text"
        placeholder="Search branches..."
        value={query}
        onChange={handleSearch}
        className="px-4 py-2 border rounded-md w-1/3 mb-4 focus:outline-none focus:border-gray-700 focus:ring-1"
      />

      <table className="w-full border-collapse border text-gray-700">
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
