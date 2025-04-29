import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { dummyTickets } from "./Helpers/DummyData";
import Login from "./components/Login";
import Tickets from "./components/Tickets/Tickets";
import Layout from "./components/Layout";
import TicketForm from "./components/User/TicketForm";
import KnowledgeBase from "./components/User/KnowledgeBase";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Dashboard from "./components/User/Dashboard";
import Department from "./components/ManageDepartments";
import TicketPage from "./components/User/TicketsPage";


function App() {
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

        <Route path="/" element={<Login setUser={setUser} />} />
        <Route
          path="/manage-users"
          element={
            <Layout>
              <ManageUsers />
            </Layout>
          }
        />
        <Route
          path="/view-users"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/add-departments"
          element={
            <Layout>
              <Department />
            </Layout>
          }
        />

<Route
          path="/faqs"
          element={
            <Layout>
              <KnowledgeBase />
            </Layout>
          }
        />

        <Route
          path="/ticket-page"
          element={
            <TicketPage
              tickets={tickets}
              loggedInUser={loggedInUser}
              setTickets={setTickets}
            />
          }
        />

        <Route path="/ticket-page" element={<TicketPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
