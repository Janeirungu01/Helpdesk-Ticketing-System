
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { dummyTickets } from "../Helpers/DummyData";
import Login from "./components/Login";
import Tickets from "./components/Tickets";
import Layout from "./components/Layout";
import TicketForm from "./components/User/TicketForm";
import ManageUsers from "./components/User/ManageUsers";

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
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
