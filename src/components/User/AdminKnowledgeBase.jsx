import { useState } from "react";
import axios from "axios";

const initialForm = { question: "", answer: "", category: "", tags: "" };

function AdminKnowledgeBase({ articles = [], setArticles }) {
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState(initialForm);

  const handleChange = ({ target: { name, value } }) =>
    setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = (e) => {
  e.preventDefault();
  const tagsArray = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);

  const payload = {
    question: form.question.trim(),
    answer: form.answer.trim(),
    category: form.category.trim(),
    tags: tagsArray,
  };

  if (editingArticle) {
    axios
      .put(`http://127.0.0.1:3000/articles/${editingArticle.id}`, payload)
      .then((res) => {
        setArticles((prev) =>
          prev.map((a) => (a.id === res.data.id ? res.data : a))
        );
        setEditingArticle(null);
        setForm(initialForm);
      });
  } else {
    axios.post("http://127.0.0.1:3000/articles", payload).then((res) => {
      setArticles((prev) => [...prev, res.data]);
      setForm(initialForm);
    });
  }
};

const handleEdit = (article) => {
  setForm({
    question: article.question,
    answer: article.answer,
    category: article.category,
    tags: Array.isArray(article.tags) ? article.tags.join(", ") : article.tags,
  });
  setEditingArticle(article);
};


  const handleDelete = (id) => {
    if (window.confirm("Delete this article?")) {
      axios
        .delete(`http://127.0.0.1:3000/articles/${id}`)
        .then(() => setArticles((prev) => prev.filter((a) => a.id !== id)));
    }
  };

  const renderInput = (name, placeholder, type = "text") => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={form[name]}
      onChange={handleChange}
      required
      className="w-full p-2 mb-2 border rounded"
    />
  );

  return (
    <div className="max-w-5xl mx-auto p-4 text-gray-700">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded-md shadow mb-8 bg-gray-50"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingArticle ? "Edit Article" : "Add New Article"}
        </h2>

        {renderInput("question", "Question")}
        <textarea
          name="answer"
          placeholder="Answer"
          value={form.answer}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        {renderInput("category", "Category")}
        {renderInput("tags", "Tags (comma separated)")}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingArticle ? "Update Article" : "Add Article"}
        </button>
      </form>

      <div className="space-y-4">
        {articles.map(({ id, question, answer, category, tags }) => (
          <div key={id} className="p-4 border rounded shadow-sm bg-white">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{question}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleEdit({ id, question, answer, category, tags })
                  }
                  className="text-sm px-2 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2">{answer}</p>
            <p className="text-sm text-gray-500 mt-1">
              <strong>Category:</strong> {category}
            </p>

            <div className="flex flex-wrap mt-2 gap-1">
            {/* {tags.map((tag, idx) => ( */}
              {Array.isArray(tags) && tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminKnowledgeBase;
