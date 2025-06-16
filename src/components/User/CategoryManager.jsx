import { useEffect, useState } from "react";
import { Axios } from "../../Helpers/Api/AxiosInstance";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data } = await Axios.get("/categories");
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
      const { data: added } = await Axios.post("/categories", {
        name: newCategory,
      });

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
      await Axios.delete(`/categories/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 mx-auto bg-white text-gray-600 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Manage Categories</h2>

      <form onSubmit={handleAddCategory}>
         <div className="flex justify-between items-center mb-4">  
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="px-4 py-2 border rounded-md w-1/3 focus:outline-none focus:border-gray-700 focus:ring-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600  text-white rounded hover:bg-blue-700">
          {loading ? "Adding..." : "+ Add Category"}
        </button>
        </div>
      </form>
       <table className="w-full border-collapse border text-gray-700 ">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td className="border px-4 py-2">{cat.name}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CategoryManager;
