import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Tickets from "./components/Tickets";
import Layout from "./components/Layout";
import UserLayout from "./components/User/UserLayout";

function App() {
  const dummyTickets = [
    {
      ticketId: "TCKT-001",
      subject: "System Crash on Login",
      description:
        "User reports that the system crashes when attempting to log in.",
      priority: "High",
      category: "System Issue",
      department: "IT Support",
      email: "it.support@hospital.com",
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
      subject: "Email Not Syncing",
      description: "User unable to sync company email with Outlook.",
      priority: "Low",
      category: "Email & Communication",
      department: "Human Resources",
      email: "hr@hospital.com",
    },
    {
      ticketId: "TCKT-004",
      subject: "Email Login Failed!",
      description:
        "Currently unable to login to the email. Incorrect password error!",
      priority: "High",
      category: "Email & Communication",
      department: "Finance",
      email: "finance@hospital.com",
    },
    {
      ticketId: "TCKT-005",
      subject: "Software Installation Request",
      description: "Request to install the latest version of Microsoft Office.",
      priority: "Medium",
      category: "Software Installation",
      department: "IT Support",
      email: "it.support@hospital.com",
    },
    {
      ticketId: "TCKT-006",
      subject: "PACS System Not Loading",
      description:
        "Radiology department unable to access patient scans on PACS system.",
      priority: "High",
      category: "Medical Software",
      department: "Radiology",
      email: "radiology@hospital.com",
    },
    {
      ticketId: "TCKT-007",
      subject: "Electronic Health Records (EHR) Access Denied",
      description: "Doctor unable to access patient records in the EHR system.",
      priority: "High",
      category: "Medical Software",
      department: "Outpatient Services",
      email: "outpatient@hospital.com",
    },
    {
      ticketId: "TCKT-008",
      subject: "Network Downtime in Emergency Room",
      description:
        "No network connection in the ER, affecting patient admission.",
      priority: "Critical",
      category: "Network",
      department: "Emergency Room",
      email: "er@hospital.com",
    },
    {
      ticketId: "TCKT-009",
      subject: "Lab Results Not Uploading",
      description: "Lab results not syncing to the hospital database.",
      priority: "High",
      category: "Medical Software",
      department: "Laboratory",
      email: "lab@hospital.com",
    },
    {
      ticketId: "TCKT-010",
      subject: "CCTV Camera Not Recording",
      description: "Security cameras in the main entrance are not recording.",
      priority: "Medium",
      category: "Security",
      department: "Security",
      email: "security@hospital.com",
    },
  ];

  const [tickets, setTickets] = useState(dummyTickets);
  const [loggedInUser, setUser] = useState(null);
  const [userLayout, setUserLayout] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route
          path="/tickets"
          element={
            <Layout>
              <Tickets tickets={tickets} loggedInUser={loggedInUser} />
            </Layout>
          }
        />

        <Route
          path="/create-ticket"
          element={
            <UserLayout
              tickets={tickets}
              loggedInUser={loggedInUser}
              setTickets={setTickets}
            />
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
