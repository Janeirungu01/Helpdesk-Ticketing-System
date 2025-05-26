import { useEffect, useState } from "react";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) throw new Error("Failed to add category");

      const added = await res.json();
      setCategories([...categories, added]);
      setNewCategory("");
    } catch (err) {
      console.error("Add error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await fetch(`http://127.0.0.1:3000/categories/${id}`, { method: "DELETE" });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10 bg-white text-gray-600 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center mb-2">
            <span>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
