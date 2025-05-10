import React, { useState } from "react";

function KnowledgeBase({ articles =[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  const uniqueCategories = ["All", ...new Set(articles.map((article) => article.category))];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleArticle = (id) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto text-gray-600">
      <h1 className="text-3xl font-bold mb-6 text-center">Knowledge Base</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions or tags..."
          className="w-full max-w-xl p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-300 rounded-md p-4 shadow-sm transition-all"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleArticle(article.id)}
            >
              <h2 className="text-lg font-semibold">{article.question}</h2>
              <span className="text-blue-500">
                {expandedArticleId === article.id ? "−" : "+"}
              </span>
            </div>

            {expandedArticleId === article.id && (
              <div className="mt-2 text-gray-700">
                {article.answer}
                <div className="mt-2 flex flex-wrap gap-1">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredArticles.length === 0 && (
          <p className="text-gray-600 text-center">No articles found.</p>
        )}
      </div>
    </div>
  );
}

export default KnowledgeBase;
