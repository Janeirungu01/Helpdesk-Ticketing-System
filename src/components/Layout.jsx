// import { useState } from "react";
// import {
//   FaBars,
//   FaTicketAlt,
//   FaPlus,
//   FaSignOutAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { MdDashboard, MdBusiness } from "react-icons/md";
// import { useNavigate, Link } from "react-router-dom"; 
// import { FaBell } from "react-icons/fa";

// export default function Layout({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside
//         className={`${
//           isCollapsed ? "w-16" : "w-64"
//         } bg-blue-700 text-white transition-all duration-300 flex flex-col`}
//       >
//         <div className="flex items-center justify-between p-4">
//           {!isCollapsed && <h2 className="text-lg font-bold">Bristol Desk</h2>}
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="text-white text-xl focus:outline-none"
//           >
//             <FaBars />
//           </button>
//         </div>

//         <nav className="flex-1 px-2 space-y-2">
//           <Link
//             to="/tickets"
//             className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
//           >
//             <FaTicketAlt />
//             {!isCollapsed && <span>Tickets</span>}
//           </Link>
//           {user.userType == "Regular" && (
//             <Link
//               to="/add-ticket"
//               className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
//             >
//               <FaPlus />
//               {!isCollapsed && <span>Add Ticket</span>}
//             </Link>
//           )}

//           {user.userType == "Admin" && (
//             <Link
//               to="/view-users"
//               className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
//             >
//               <MdDashboard />
//               {!isCollapsed && <span>Dashboard</span>}
//             </Link>
//           )}

//           {user.userType == "Admin" && (
//             <Link
//               to="/manage-users"
//               className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
//             >
//               <FaPlus />
//               {!isCollapsed && <span>Manage Users</span>}
//             </Link>
//           )}
//           {user.userType == "Admin" && (
//             <Link
//               to="/add-departments"
//               className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
//             >
//               <MdBusiness />
//               {!isCollapsed && <span>Departments</span>}
//             </Link>
//           )}
//         </nav>

//         <div className="p-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-3 w-full p-2 hover:bg-red-500 rounded-lg"
//           >
//             <FaSignOutAlt />
//             {!isCollapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       <div className="flex flex-col flex-1 h-screen">
//         <header className="bg-white shadow-md p-4 flex justify-end items-center relative">
//           <div className="relative">
//             <button onClick={toggleDropdown} className="focus:outline-none">
//               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
//                 {user?.userName?.substring(0, 1).toUpperCase() || "GU"}
//               </div>
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                 <div className="px-4 py-3 border-b border-gray-100">
//                   <h2 className="text-gray-700 mr-4">
//                     Welcome, {user?.userName || "Guest"}
//                   </h2>
//                 </div>
//                 <ul className="py-1">
//                   <button
//                     onClick={() => navigate("/tickets")}
//                     className="flex items-center w-full px-4 py-2 text-sm text-gray-600  hover:bg-gray-50"
//                   >
//                     My tickets
//                   </button>

//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-200 rounded"
//                     >
//                       {!isCollapsed && <span>Sign out</span>}
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-4 bg-blue-50 overflow-hidden">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTicketAlt,
  FaPlus,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";
import { MdDashboard, MdBusiness } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLogout = () => navigate("/");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
          {user?.userType === "Regular" && (
            <Link
              to="/add-ticket"
              className="flex items-center space-x-3 p-2 hover:bg-blue-500 rounded-lg"
            >
              <FaPlus />
              <span>Add Ticket</span>
            </Link>
          )}

          {user?.userType === "Admin" && (
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

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:justify-end gap-4">
          {/* Hamburger Menu on Mobile */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>

          {/* Notification Bell */}
          <div className="relative cursor-pointer">
            <FaBell className="text-xl text-gray-600" />
            {hasNotification && (
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            )}
          </div>

          {/* User Avatar */}
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
                {user?.userName?.substring(0, 1).toUpperCase() || "GU"}
              </div>
            </button>

            {/* Dropdown */}
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
        <main className="flex-1 p-4 bg-blue-50 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
