import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Helpers/Api/AuthContext";
import Login from "./components/Login";
import Tickets from "./components/Tickets/Tickets";
import Layout from "./components/Layout";
import TicketForm from "./components/Tickets/TicketForm";
import KnowledgeBaseWrapper from "./components/KnowledgeBaseWrapper";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Dashboard from "./components/User/Dashboard";
import Department from "./components/ManageDepartments";
import Branches from "./components/Branches";
import { SelectBranch } from "./components/SelectBranch";
import CategoryManager from "./components/User/CategoryManager";

function App() {
  const [tickets, setTickets] = useState([]);

  return (
    <AuthProvider> 
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/select-branch" element={<SelectBranch />} />
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
              <TicketForm setTickets={setTickets} />
            </Layout>
          }
        />
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
              <KnowledgeBaseWrapper view="Agent" />
            </Layout>
          }
        />
        <Route
          path="/adminfaqs"
          element={
            <Layout>
              <KnowledgeBaseWrapper view="Admin" />
            </Layout>
          }
        />
        <Route
          path="/add-branches"
          element={
            <Layout>
              <Branches />
            </Layout>
          }
        />
        <Route
          path="/manage-categories"
          element={
            <Layout>
              <CategoryManager />
            </Layout>
          }
        />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;