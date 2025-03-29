import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Tickets from "./components/Tickets";
import Layout from "./components/Layout";
import TicketForm from "./components/User/TicketForm";

function App() {
  const dummyTickets = [
    {
      ticketId: "TCKT-001",
      subject: "Lab Results Not Uploading",
      description: "Lab results not syncing to the hospital database.",
      priority: "High",
      category: "Medical Software",
      department: "Laboratory",
      email: "lab@hospital.com",
    },
    {
      ticketId: "TCKT-002",
      subject: "Printer Not Responding",
      description: "The office printer is not responding to print commands.",
      priority: "Medium",
      category: "Hardware",
      department: "Administration",
      email: "admin.office@hospital.com",
    },
    {
      ticketId: "TCKT-003",
      subject: "Email Login Failed!",
      description:
        "Currently unable to login to the email. Incorrect password error!",
      priority: "Low",
      category: "Email & Communication",
      department: "Finance",
      email: "finance@hospital.com",
    },
    {
      ticketId: "TCKT-004",
      subject: "Software Installation Request",
      description: "Request to install the latest version of Microsoft Office.",
      priority: "Medium",
      category: "Software Installation",
      department: "IT Support",
      email: "it.support@hospital.com",
    },
  ];

  const [tickets, setTickets] = useState(dummyTickets);
  const [loggedInUser, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route
          path="/tickets"
          element={
            <Layout>
              <Tickets tickets={tickets} />
            </Layout>
          }
        />
        <Route
          path="/add-ticket"
          element={
            <Layout>
              <TicketForm
                tickets={tickets}
                loggedInUser={loggedInUser}
                setTickets={setTickets}
              />
            </Layout>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
