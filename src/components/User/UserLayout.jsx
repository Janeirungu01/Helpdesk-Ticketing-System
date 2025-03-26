import { useState } from "react";
import UserSidebar from "./UserSidebar";
import TicketForm from "./TicketForm";

export default function App() {
  const [activeView, setActiveView] = useState("create");

  return (
    <div className="flex h-screen">
      <UserSidebar onSelect={setActiveView} />
      <div className="flex-1 p-6">
        {activeView === "create" ? <TicketForm /> : <h2 className="text-xl font-bold text-left">View Tickets Coming Soon...</h2>}
      </div>
    </div>
  );
}


