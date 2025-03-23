import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Tickets from './components/Tickets';
import AddTicket from './components/AddTicket';

function App() {
    const dummyTickets = [
        {
          ticketId: "TCKT-001",
          title: "System Crash on Login",
          description: "User reports that the system crashes when attempting to log in.",
          priority: "High"
        },
        {
          ticketId: "TCKT-002",
          title: "Printer Not Responding",
          description: "The office printer is not responding to print commands.",
          priority: "Medium"
        },
        {
          ticketId: "TCKT-003",
          title: "Email Not Syncing",
          description: "User unable to sync company email with Outlook.",
          priority: "Low"
        },
        {
          ticketId: "TCKT-004",
          title: "VPN Connection Issues",
          description: "Remote employees report that the VPN connection drops frequently.",
          priority: "High"
        },
        {
          ticketId: "TCKT-005",
          title: "Software Installation Request",
          description: "Request to install the latest version of Microsoft Office.",
          priority: "Medium"
        }
      ];
      
    const [tickets, setTickets] = useState(dummyTickets)
    return (
        <Router>
          <Routes>
             <Route path='/' element={<Login />} />
             <Route path="/tickets" element={<Tickets tickets={tickets}/>} />
             <Route path='/add-ticket'
               element={<AddTicket /> } />
          </Routes> 
          <Toaster />
        </Router>
     )
 
}

export default App