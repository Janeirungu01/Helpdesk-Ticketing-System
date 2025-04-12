export const dummyTickets =[
        {
          ticketId: "TCKT-001",
          subject: "Lab Results Not Uploading",
          description: "Lab results not syncing to the hospital database.",
          priority: "High",
          category: "Medical Software",
          email: "lab@hospital.com",
          department: "Laboratory",
          branch:"Tassia",
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

      export const dummyUsers =[
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
            }
          ]

