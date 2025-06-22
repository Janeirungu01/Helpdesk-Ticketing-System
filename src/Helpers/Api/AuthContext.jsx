// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [currentBranch, setCurrentBranch] = useState(null);
 

//   return (
//     <AuthContext.Provider value={{ user, setUser, token, setToken, currentBranch, setCurrentBranch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [currentBranch, setCurrentBranch] = useState(null);
 

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, currentBranch, setCurrentBranch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
