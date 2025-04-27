import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CgLogIn } from "react-icons/cg";

function Login({ setUser }) {
  const navigate = useNavigate();

  const adminUser = {
    userType: "Admin",
    userName: "Admin",
    email: "admin@hospital.com",
    password: "Admin",
  };

  const regularUser = {
    userType: "Regular",
    userName: "User",
    email: "user@hospital.com",
    password: "User",
  };

  const [logginData, setLoggedInUser] = useState({
    email: "",
    password: "",
    branch: "",
    rememberMe: false,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setLoggedInUser((prev) => ({
        ...prev,
        email: storedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoggedInUser((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, branch, rememberMe } = logginData;

    if (!email || !password || !branch) {
      toast.error("Please fill in all fields including branch");
      return;
    }

    if (email === adminUser.email && password === adminUser.password) {
      setUser({ ...adminUser, branch });
      localStorage.setItem("user", JSON.stringify({ ...adminUser, branch }));
      toast.success("Login successful!");
      rememberMe
        ? localStorage.setItem("rememberedEmail", email)
        : localStorage.removeItem("rememberedEmail");
      navigate("/tickets");
    } else if (
      email === regularUser.email &&
      password === regularUser.password
    ) {
      setUser({ ...regularUser, branch });
      localStorage.setItem("user", JSON.stringify({ ...regularUser, branch }));
      toast.success("Login successful!");
      rememberMe
        ? localStorage.setItem("rememberedEmail", email)
        : localStorage.removeItem("rememberedEmail");
      navigate("/tickets");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-lg tracking-wide">
          Bristol Desk
        </h2>

        <h3 className="text-xl font-bold text-center text-gray-700 mb-4 mt-6">
          Login Here
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={logginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700 bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={logginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700 bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">
              Select Branch
            </label>
            <select
              name="branch"
              value={logginData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
            >
              <option value="">-- Choose branch --</option>
              <option value="FEDHA">FEDHA</option>
              <option value="TASSIA">TASSIA</option>
              <option value="UTAWALA">UTAWALA</option>
              <option value="MACHAKOS">MACHAKOS</option>
              <option value="KITENGELA">KITENGELA</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={logginData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-600 text-sm">Remember Me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Help Desk Ticketing System
        </p>
      </div>
    </div>
  );
}

export default Login;