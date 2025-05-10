import React, { useState } from "react";
import KnowledgeBase from "./User/KnowledgeBase";
import AdminKnowledgeBase from "./User/AdminKnowledgeBase";

function KnowledgeBaseWrapper({ view }) {
  const [articles, setArticles] = useState([
    {
      id: 1,
      question: "How to submit a support ticket?",
      answer: "Click on 'Create Ticket' from the dashboard...",
      category: "Support Process",
      tags: ["ticket", "support", "submit"],
    },
    {
      id: 2,
      question: "How to update email?",
      answer: "Go to profile settings and change your email.",
      category: "Account Management",
      tags: ["email", "profile", "account"],
    },
    {
      id: 3,
      question: "What is the response time for tickets?",
      answer:
        "Our average response time is within 24 hours during business days.",
      category: "Support Process",
      tags: ["response", "support", "time"],
    },
    {
      id: 4,
      question: "How do I update my email address?",
      answer: "Navigate to Profile Settings > Email > Update Email Address.",
      category: "Account Management",
      tags: ["email", "update", "account"],
    },
    {
      id: 5,
      question: "What happens if I close a ticket?",
      answer:
        "Closing a ticket marks it as resolved. You can reopen it within 7 days if needed.",
      category: "Support Process",
      tags: ["close", "ticket", "resolved"],
    },
    {
      id: 6,
      question: "How do I add attachments to my ticket?",
      answer:
        "When creating or updating a ticket, use the 'Add Attachment' button to upload files like screenshots or documents.",
      category: "Tickets",
      tags: ["attachments", "upload", "files"],
    },
  ]);

  return view === "Admin" ? (
    <AdminKnowledgeBase articles={articles} setArticles={setArticles} />
  ) : (
    <KnowledgeBase articles={articles} />
  );
}

export default KnowledgeBaseWrapper;


// import React, { useEffect, useState } from "react";
// import KnowledgeBase from "./KnowledgeBase";
// import AdminKnowledgeBase from "./AdminKnowledgeBase";

// function KnowledgeBaseWrapper({ view }) {
//   const [articles, setArticles] = useState(() => {
//     const saved = localStorage.getItem("knowledgeArticles");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("knowledgeArticles", JSON.stringify(articles));
//   }, [articles]);

//   return view === "Admin" ? (
//     <AdminKnowledgeBase articles={articles} setArticles={setArticles} />
//   ) : (
//     <KnowledgeBase articles={articles} />
//   );
// }

// export default KnowledgeBaseWrapper;
