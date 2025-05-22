import React, { useEffect, useState } from "react";
import KnowledgeBase from "./User/KnowledgeBase";
import AdminKnowledgeBase from "./User/AdminKnowledgeBase";
import axios from "axios";

function KnowledgeBaseWrapper({ view }) {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("knowledgeArticles");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  return view === "Admin" ? (
    <AdminKnowledgeBase articles={articles} setArticles={setArticles} />
  ) : (
    <KnowledgeBase articles={articles} />
  );
}

export default KnowledgeBaseWrapper;
