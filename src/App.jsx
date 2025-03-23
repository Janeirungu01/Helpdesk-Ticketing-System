import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Tickets from './components/Tickets';
import AddTicket from './components/AddTicket';
import Layout from './components/Layout';

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
    const [loggedInUser, setUser] = useState(null);

    return (
        <Router>
          <Routes>
             <Route path='/' element={<Layout><Login setUser={setUser}/></Layout>} />
             <Route path="/tickets" element={<Layout><Tickets tickets={tickets} loggedInUser={loggedInUser}/></Layout>}/>
             <Route path='/add-ticket'
               element={<Layout><AddTicket setTickets={setTickets}/></Layout>} />
          </Routes> 
          <Toaster />
        </Router>
     )
 
}

export default App