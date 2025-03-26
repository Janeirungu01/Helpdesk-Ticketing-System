// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// function Login({ setUser }) {
//   const navigate = useNavigate();

//   const adminUser = {
//     userType: "Admin",
//     userName: "Admin",
//     email: "admin@gmail.com",
//     password: "Admin",
//   };
//   const regularUser = {
//     userType: "Regular",
//     userName: "User",
//     email: "user@gmail.com",
//     password: "User",
//   };

//   const [logginData, setLoggedInUser] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoggedInUser((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!logginData.email || !logginData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     if (
//       logginData.email === adminUser.email &&
//       logginData.password === adminUser.password
//     ) {
//       setUser(adminUser);
//       toast.success("Login successful!");
//       navigate("/tickets");
//     } else if (
//       logginData.email === regularUser.email &&
//       logginData.password === regularUser.password
//     ) {
//       setUser(regularUser);
//       toast.success("Login successful!");
//       navigate("/tickets");
//     } else {
//       toast.error("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-2">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               name="email"
//               className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-500"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-500"
//               onChange={handleChange}
//             />
//           </div>

         
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 p-4 transition"
//           >
//             Login
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    rememberMe: false,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setLoggedInUser((prev) => ({ ...prev, email: storedEmail, rememberMe: true }));
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

    if (!logginData.email || !logginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (
      logginData.email === adminUser.email &&
      logginData.password === adminUser.password
    ) {
      setUser(adminUser);
      toast.success("Login successful!");
      if (logginData.rememberMe) {
        localStorage.setItem("rememberedEmail", logginData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate("/tickets");
    } else if (
      logginData.email === regularUser.email &&
      logginData.password === regularUser.password
    ) {
      setUser(regularUser);
      toast.success("Login successful!");
      if (logginData.rememberMe) {
        localStorage.setItem("rememberedEmail", logginData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate("/tickets");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={logginData.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700 bg-gray-50"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-700 bg-gray-50"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={logginData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-red-600 text-sm">Remember Me</label>
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
