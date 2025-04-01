import { useState } from "react";
import { FaBars, FaTicketAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export default function Layout({ children}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user=JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () =>{
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-blue-700 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <h2 className="text-lg font-bold">Bristol Desk</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white text-xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-2 space-y-2">
          <Link
           to="/tickets"
            className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
          >
            <FaTicketAlt />
            {!isCollapsed && <span>Tickets</span>}
          </Link>
          {user.userType=="Regular" && (<Link
            to="/add-ticket"
            className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
          >
            <FaPlus />
            {!isCollapsed && <span>Add Ticket</span>}
          </Link>)}

          {user.userType=="Admin" && (<Link
            to="/manage-users"
            className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
          >
            <FaPlus />
            {!isCollapsed && <span>Manage Users</span>}
          </Link>)}
        </nav>


        {/* Logout Button */}
        <div className="p-4">
          <button onClick={handleLogout} className="flex items-center space-x-3 w-full p-2 hover:bg-red-500 rounded-lg">
            <FaSignOutAlt />
            {!isCollapsed && <span>Logout</span>}
            
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen" >
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-end">
           <h2 className="text-gray-700">Welcome, {user.userName || "Guest"}</h2>
        </header>
        

        {/* Content */}
        <main className="flex-1 p-6 bg-blue-100 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}

