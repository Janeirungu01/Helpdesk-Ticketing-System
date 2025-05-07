export const dummyTickets = [
  {
    ticketId: "TCKT-001",
    subject: "Lab Results Not Uploading",
    description: "Lab results not syncing to the hospital database.",
    priority: "High",
    category: "Medical Software",
    email: "lab@hospital.com",
    department: "Laboratory",
    branch: "Tassia",
    date: "2025-03-28",
  },
  {
    ticketId: "TCKT-002",
    subject: "Printer Not Responding",
    description: "The office printer is not responding to print commands.",
    priority: "Medium",
    category: "Hardware",
    department: "Administration",
    email: "reception@hospital.com",
    branch: "Fedha",
    date: "2025-03-29",
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
    branch: "Utawala",
    date: "2025-03-31",
  },
  {
    ticketId: "TCKT-004",
    subject: "Software Installation Request",
    description: "Request to install the latest version of Microsoft Office.",
    priority: "Medium",
    category: "Software Installation",
    department: "IT Support",
    email: "it.support@hospital.com",
    branch: "Machakos",
    date: "2025-03-20",
  },
];

export const dashboardTickets = [
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

export const getStatusClass = (status) => {
  switch (status) {
    case "Resolved":
      return "bg-green-500 text-white";
    case "In Progress":
      return "bg-blue-400 text-white";
    case "Escalated":
      return "bg-red-500 text-white";
      case "Open":
        return "bg-red-400 text-white";
        case "Pending":
          return "bg-red-400 text-white";
          case "Reopened":
            return "bg-blue-400 text-white";
    case "Closed":
      return "bg-yellow-400 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

export const getPriorityClass = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-amber-500";
    default:
      return "bg-blue-500";
  }
};

export const timeAgo = (dateString) => {
  if (!dateString) return "N/A";
  const now = new Date();
  const updated = new Date(dateString);
  const diffMs = now - updated;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
};
