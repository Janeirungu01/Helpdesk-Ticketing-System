import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar,XAxis,YAxis,
  Tooltip, Legend, ResponsiveContainer,} from "recharts";
import {
  FiCheckCircle, FiClock, FiLoader,
  FiAlertCircle,} from "react-icons/fi";
import axios from "axios";

const COLORS = ["#F87171", "#FBBF24", "#60A5FA", "#34D399"];

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:3000/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const ticketDate = new Date(ticket.created_at).toISOString().split("T")[0];
    return ticketDate >= startDate && ticketDate <= endDate;
  });

  const statusCounts = filteredTickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  const totalTickets = filteredTickets.length;

  const statusData = ["open", "resolved", "reopened", "closed"].map((status) => {
    const count = statusCounts[status] || 0;
    return {
      name: status,
      value: count,
      percentage:
        totalTickets > 0 ? ((count / totalTickets) * 100).toFixed(2) : 0,
    };
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-gray-600">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border font-semibold  border-gray-500 rounded px-4 py-2 w-full bg-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            End Date:
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border font-semibold  border-gray-500 rounded px-4 py-2 w-full bg-blue-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 capitalize">
        {statusData.map((status, index) => (
          <div
            key={status.name}
            className={`p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200 transition ${
              selectedStatus === status.name ? "ring-2 ring-blue-400" : ""
            }`}
            onClick={() => setSelectedStatus(status.name)}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold mb-1">{status.name}</h3>
              <FiClock />
            </div>
            <p className="text-2xl font-bold text-gray-800">{status.value}</p>
            <div className="flex justify-between text-sm text-gray-500 mt-2 mb-1">
              <span>{status.percentage}%</span>
            </div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${status.percentage}%`,
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Tickets</h3>
        <div className="overflow-x-auto">
          <table className="overflow-hidden w-full border-collapse border text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Ticket No.</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets
                .filter(
                  (ticket) =>
                    !selectedStatus ||
                    ticket.status.toLowerCase() === selectedStatus)
                .slice(0, 5)
                .map((ticket) => {
                  const statusIcon =
                    {
                      open: <FiAlertCircle className="text-red-500" />,
                      closed: <FiLoader className="text-yellow-500" />,
                      reopened: <FiClock className="text-blue-500" />,
                      resolved: <FiCheckCircle className="text-green-500" />,
                    }[ticket.status] || null;

                  return (
                    <tr key={ticket.ticket_id}>
                      <td className="px-6 py-4 border font-semibold text-gray-900">
                        {ticket.ticket_id}
                      </td>
                      <td className="px-6 py-4 border">{ticket.subject}</td>
                      <td className="px-6 py-4 border flex items-center gap-2 capitalize">
                        {statusIcon}
                        {ticket.status}
                      </td>
                      <td className="px-6 py-4 border">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            Ticket Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Tickets per Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
