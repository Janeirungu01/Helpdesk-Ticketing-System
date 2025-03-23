import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login({ setUser }) {
    const navigate = useNavigate();

    const adminUser = { userType: "Admin", userName: "Jane", email: "jane@bristol.co.ke", password: "jane1234" };
    const regularUser = { userType: "Regular", userName: "John", email: "john@bristol.co.ke", password: "john1234" };

    const [logginData, setLoggedInUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoggedInUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!logginData.email || !logginData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (logginData.email === adminUser.email && logginData.password === adminUser.password) {
          setUser(adminUser);
          toast.success("Login successful!");
          navigate("/tickets");
        } else if (logginData.email === regularUser.email && logginData.password === regularUser.password) {
          setUser(regularUser);
          toast.success("Login successful!");
          navigate("/tickets");
        } else {
          toast.error("Invalid credentials!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

                <form onSubmit={handleSubmit}>  
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4 text-center">
                    Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
    </div>
  );
}

export default Login;
