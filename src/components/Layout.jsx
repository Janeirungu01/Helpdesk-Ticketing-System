import { useState } from "react";
import { FaBars, FaTimes, FaTicketAlt, FaPlus, FaSignOutAlt, FaBell} from "react-icons/fa";
import { FiBookOpen, FiGitBranch } from "react-icons/fi";
import { BiCategory } from "react-icons/bi"
import axios from "axios";

import { MdDashboard, MdBusiness } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Helpers/Api/AuthContext";
import toast from "react-hot-toast";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const { token, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      await axios.delete("http://127.0.0.1:3000/users/sign_out", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.warn("Logout request failed:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken("");
      navigate("/");
      toast.success("Logout successful");
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed z-50 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex w-64 bg-blue-700 text-white transition-transform duration-300 flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          <h2 className="text-lg font-bold">Bristol Desk</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white text-xl focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-2 mt-2">
          <Link
            to="/tickets"
            className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
          >
            <FaTicketAlt />
            <span>Tickets</span>
          </Link>
          {user?.usertype === "Agent" && (
            <>
            <Link
              to="/add-ticket"
              className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
            >
              <FaPlus />
              <span>Create Ticket</span>
            </Link>
            <Link
              to="/faqs"
              className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
            >
              <FiBookOpen />
              <span>Knowledge Base</span>
            </Link>
            </>
          )}
           

          {user?.usertype === "Admin" && (
            <>
              <Link
                to="/view-users"
                className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
              >
                <MdDashboard />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/manage-users"
                className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
              >
                <FaPlus />
                <span>Manage Users</span>
              </Link>
              <Link
                to="/add-departments"
                className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
              >
                <MdBusiness />
                <span>Departments</span>
              </Link>

            <Link
              to="/adminfaqs"
              className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
            >
              <FiBookOpen />
              <span>Knowledge Base</span>
            </Link>
            <Link
              to="/add-branches"
              className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
            >
              <FiGitBranch />
              <span>Branches</span>
            </Link>
             <Link
              to="/manage-categories"
              className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
            >
              <BiCategory />
              <span>Ticket Categories</span>
            </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-blue-600">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-2 hover:bg-red-500 rounded-lg"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:justify-end gap-4">
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>

          <div
            className="relative cursor-pointer"
            onClick={() => setHasNotification(false)}
          >
            <FaBell className="text-xl text-gray-600" />
            {hasNotification && (
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            )}
          </div>

          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
                {user?.userName?.substring(0, 1).toUpperCase() || "GU"}
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h2 className="text-gray-700 mr-4">
                    Welcome, {user?.userName || "Guest"}
                  </h2>
                </div>
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => navigate("/tickets")}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      My tickets
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-200 rounded"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 bg-blue-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
