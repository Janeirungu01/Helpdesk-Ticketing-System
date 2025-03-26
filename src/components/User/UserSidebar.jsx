import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function UserSidebar({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Button for Mobile and smaller screen*/}
      <button
        className="absolute top-4 left-4 text-white bg-gray-800 p-2 rounded md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white p-6 flex flex-col justify-between 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform md:translate-x-0 md:w-1/8 w-3/4 h-full`}
      >
        <div>
          <h2 className="text-xl font-bold mb-6">Bristol Desk</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => onSelect("create")}
                className="w-full text-left hover:text-gray-300"
              >
                📝 Create Ticket
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelect("view")}
                className="w-full text-left hover:text-gray-300"
              >
                📄 View Tickets
              </button>
            </li>
          </ul>
        </div>
        <div>
          <button className="w-full text-left hover:text-gray-300">⚙️ Settings</button>
          <button className="w-full text-left mt-4 hover:text-red-400">🚪 Logout</button>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
