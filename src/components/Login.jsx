import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../Helpers/Api/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser, setToken, setCurrentBranch } = useAuth();


  const [logginData, setLoggedInUser] = useState(
  {
    username: "",
    password: "",
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("rememberedUsername");
    if (storedUsername) {
      setLoggedInUser((prev) => ({
        ...prev,
        username: storedUsername,
        rememberMe: true,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoggedInUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
  
    const { username, password } = logginData;
  
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
      // Call Auth API
      const response = await axios.post(
        "http://localhost:3000/users/sign_in",
        { user: { ...logginData } },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      const { token, user, message } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(token);

      if (user.branches.length === 1) {
        setCurrentBranch(user.branches[0]);
        navigate("/tickets");
      } else {
        navigate("/select-branch");
      }
      toast.success(message);
  
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
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
            <label className="block text-gray-600 text-sm mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={logginData.username}
              onChange={handleChange}
              placeholder="Enter your username"
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