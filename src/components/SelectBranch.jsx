import { useAuth } from "../Helpers/Api/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export function SelectBranch() {
  const { user, setCurrentBranch } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState("");
  const navigate = useNavigate();
  const branches = user?.branches;

  const handleSelect = () => {
    if (!selectedBranch) {
      toast.error("Please select a branch");
      return;
    }

    setCurrentBranch(selectedBranch);
    navigate("/tickets");
    toast.success(`You signed in at ${selectedBranch} branch`);
    localStorage.setItem('branch', selectedBranch);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-600 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Select Branch</h2>
        <select
          className="w-full px-4 py-2 border rounded mb-4"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">-- Choose a branch --</option>
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <button
          onClick={handleSelect}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Confirm Branch
        </button>
      </div>
    </div>
  );
}
