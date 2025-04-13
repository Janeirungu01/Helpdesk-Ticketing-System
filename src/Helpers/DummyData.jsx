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

export const dummyUsers = [
  {
    id: 1,
    name: "Admin",
    userType: "Admin",
    email: "admin@hospital.com",
    status: "active",
  },
  {
    id: 4,
    name: "user",
    userType: "Regular",
    email: "user@hospital.com",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    userType: "Regular",
    email: "bob@hospital.com",
    status: "suspended",
  },
  {
    id: 3,
    name: "Charlie Brown",
    userType: "Admin",
    email: "charlie@hospital.com",
    status: "active",
  },
];

export const getStatusClass = (status) => {
  switch (status) {
    case "Resolved":
      return "bg-green-500 text-white";
    case "In Progress":
      return "bg-blue-400 text-white";
    case "Escalated":
      return "bg-red-500 text-white";
    case "Waiting for User":
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
