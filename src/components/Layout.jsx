import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">HelpDesk Ticketing System</div>
        <div className="flex space-x-6">
          <Link to="/tickets" className="hover:underline">
            Tickets
          </Link>
          <Link to="/add-ticket" className="hover:underline">
            Add Ticket
          </Link>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-blue-600 text-white text-center p-4">
        Bristol Park Hospital Help Desk Ticketing System
      </footer>
    </div>
  );
}

export default Layout;
