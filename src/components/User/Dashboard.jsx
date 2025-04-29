import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  FiCheckCircle,
  FiClock,
  FiLoader,
  FiAlertCircle
} from "react-icons/fi";


const dummyTickets = [
  {
    ticketId: "TIC-001",
    createdBy: { name: "John Doe" },
    subject: "Login Issue",
    category: "Technical",
    branch: "Main Office",
    department: "IT",
    date: "2025-04-15T10:30:00Z",
    description: "Unable to login to the system after password reset",
    priority: "high",
    status: "Open",
    updatedAt: "2025-04-15T10:30:00Z"
  },
  {
    ticketId: "TIC-002",
    createdBy: { name: "Jane Smith" },
    subject: "Printer not working",
    category: "Hardware",
    branch: "Branch A",
    department: "Administration",
    date: "2025-04-17T14:20:00Z",
    description: "The main printer on the second floor is not responding",
    priority: "medium",
    status: "Closed",
    updatedAt: "2025-04-18T09:15:00Z"
  },
  {
    ticketId: "TIC-003",
    createdBy: { name: "Robert Johnson" },
    subject: "Email not syncing",
    category: "Software",
    branch: "Branch B",
    department: "Marketing",
    date: "2025-04-18T11:45:00Z",
    description: "Email not syncing on mobile device since this morning",
    priority: "low",
    status: "Open",
    updatedAt: "2025-04-19T10:00:00Z"
  },
  {
    ticketId: "TIC-004",
    createdBy: { name: "Lisa Wong" },
    subject: "VPN Connection Issue",
    category: "Network",
    branch: "Remote",
    department: "Sales",
    date: "2025-04-20T08:30:00Z",
    description: "Cannot connect to VPN when working remotely",
    priority: "high",
    status: "Open",
    updatedAt: "2025-04-20T08:30:00Z"
  },
  {
    ticketId: "TIC-005",
    createdBy: { name: "Michael Brown" },
    subject: "Missing files on shared drive",
    category: "Data",
    branch: "Main Office",
    department: "Finance",
    date: "2025-04-21T15:10:00Z",
    description: "Cannot access quarterly reports on shared drive",
    priority: "high",
    status: "Closed",
    updatedAt: "2025-04-22T09:20:00Z"
  },
  {
    ticketId: "TIC-006",
    createdBy: { name: "Emily Clark" },
    subject: "Software installation request",
    category: "Software",
    branch: "Branch C",
    department: "HR",
    date: "2025-04-22T13:40:00Z",
    description: "Need Adobe Creative Suite installed on new laptop",
    priority: "low",
    status: "Reopened",
    updatedAt: "2025-04-23T11:30:00Z"
  },
  {
    ticketId: "TIC-007",
    createdBy: { name: "David Wilson" },
    subject: "Website loading slowly",
    category: "Web",
    branch: "Main Office",
    department: "Marketing",
    date: "2025-04-23T09:15:00Z",
    description: "Company website taking too long to load",
    priority: "medium",
    status: "Resolved",
    updatedAt: "2025-04-25T16:45:00Z"
  },
  {
    ticketId: "TIC-008",
    createdBy: { name: "Sarah Martinez" },
    subject: "Password reset",
    category: "Access",
    branch: "Branch A",
    department: "Customer Service",
    date: "2025-04-24T10:50:00Z",
    description: "Need password reset for CRM system",
    priority: "medium",
    status: "Resolved",
    updatedAt: "2025-04-24T11:30:00Z"
  }
];

const COLORS = ['#F87171', '#FBBF24', '#60A5FA', '#34D399'];

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(dummyTickets);
  }, []);

  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  const totalTickets = tickets.length;
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: ((count / totalTickets) * 100).toFixed(2),
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-gray-600">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statusData.map((status, index) => (
          <div key={status.name} className="p-4 bg-gray-100 rounded shadow ">
            <div className='flex justify-between'>
            <h3 className="text-lg font-semibold mb-1">{status.name}</h3>
            <FiClock/>
            </div>
            <p className="text-2xl font-bold text-gray-800">{status.value}</p>
            <div className="flex justify-between text-sm text-gray-500 mt-2 mb-1">
              <span>{status.percentage}%</span>
            </div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5 ">
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

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">       
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Ticket Status Distribution</h3>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

      <div>
  <h3 className="text-xl font-semibold mb-4">Recent Tickets</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-600  tracking-wider">Id</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-600  tracking-wider">Subject</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-600  tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-600  tracking-wider">Date</th>
        </tr>
      </thead>
      <tbody >
        {tickets.slice(0, 5).map((ticket) => {
          const statusIcon = {
            Open: <FiAlertCircle className="text-red-500" />,
            "Closed": <FiLoader className="text-yellow-500 animate-spin" />,
            Reopened: <FiClock className="text-blue-500" />,
            Resolved: <FiCheckCircle className="text-green-500" />,
          }[ticket.status] || null;

          return (
            <tr key={ticket.ticketId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{ticket.ticketId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.subject}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-2">
                {statusIcon}
                {ticket.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(ticket.date).toLocaleDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>


    </div>
  );
};

export default Dashboard;