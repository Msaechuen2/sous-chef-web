// import { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("site") || "");
//   const navigate = useNavigate();
//   const loginAction = async (data) => {
//     try {
//       const response = await fetch("http://localhost:5001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         setUser(res.username);
//         setToken(res.token);
//         localStorage.setItem("site", res.token);
//         navigate("/home");
//         return;
//       }
//       throw new Error(res.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     navigate("/signin");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );

// };

// export default AuthProvider;

// export const useAuth = () => {
//   return useContext(AuthContext);
// };



// import { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("site") || "");
//   const navigate = useNavigate();

//   const loginAction = async (data) => {
//     try {
//       const response = await fetch("http://localhost:5001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         setUser(res.username);
//         setToken(res.token);
//         localStorage.setItem("site", res.token);
//         navigate("/home");
//         return;
//       }
//       throw new Error(res.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const registerAction = async (userData) => {
//     try {
//       const response = await fetch("http://localhost:5001/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (data.success) {
//         // Set user and token after successful registration
//         setUser(data.username);
//         setToken(data.token);
//         localStorage.setItem("site", data.token);
//         navigate("/home"); // Redirect to home or desired page after registration
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("An error occurred during registration. Please try again later.");
//     }
//   };

//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     navigate("/home");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserProfile } from "../utils/api"; // Update the path


// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("site") || "");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!token) return; // Don't fetch if no token exists
//       try {
//         const profileData = await getUserProfile();
//         setUser(profileData);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//         localStorage.removeItem("site");
//         setUser(null);
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   const loginAction = async (data) => {
//     try {
//       const response = await fetch("http://localhost:5001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         setUser(res.username);
//         setToken(res.token);
//         localStorage.setItem("site", res.token);
//         localStorage.setItem("siteUser", res.username);
//         navigate("/home");
//       } else {
//         throw new Error(res.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     localStorage.removeItem("siteUser");
//     navigate("/home");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export const useAuth = () => useContext(AuthContext);




// import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserProfile } from "../utils/api"; // Ensure correct path
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const navigate = useNavigate();

//   // ✅ Persist authentication on page refresh
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!token) return;
//       try {
//         const profileData = await getUserProfile();
//         setUser(profileData);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//         localStorage.removeItem("token");
//         setUser(null);
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   // ✅ Login function (stores token & fetches user profile)
//   const loginAction = async (data) => {
//     try {
//       const response = await axios.post("http://localhost:5001/api/login", data, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.data.success) {
//         const { token, user } = response.data;

//         // Store token securely
//         localStorage.setItem("token", token);
//         setToken(token);
//         setUser(user); // Save user profile data

//         navigate("/home");
//       } else {
//         throw new Error(response.data.message);
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   // ✅ Logout function (clears storage & state)
//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("token");
//     navigate("/home");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export const useAuth = () => useContext(AuthContext);






// import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const navigate = useNavigate();

//   // ✅ Fetch user profile on page refresh (if token exists)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!token) return;

//       try {
//         const response = await axios.get("http://localhost:5001/api/users/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUser(response.data); // Store user profile data
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//         logOut(); // Clear auth state if token is invalid
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   // ✅ Login function (stores token & user data)
//   const loginAction = async (data) => {
//     try {
//       const response = await axios.post("http://localhost:5001/api/users/login", data, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.data.success) {
//         const { token, user } = response.data;

//         localStorage.setItem("token", token); // Store token securely
//         setToken(token);
//         setUser(user); // Store user profile

//         navigate("/home");
//       } else {
//         throw new Error(response.data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   // ✅ Register function (stores token & user data)
//   const registerAction = async (userData) => {
//     try {
//       const response = await axios.post("http://localhost:5001/api/users/register", userData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.data.success) {
//         const { token, user } = response.data;

//         localStorage.setItem("token", token);
//         setToken(token);
//         setUser(user);

//         navigate("/home");
//       } else {
//         throw new Error(response.data.message || "Registration failed");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//     }
//   };

//   // ✅ Logout function (clears storage & state)
//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("token"); // Clear token from storage
//     navigate("/home");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export const useAuth = () => useContext(AuthContext);






// import { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const navigate = useNavigate();

//   const loginAction = async (data) => {
//     try {
//       const response = await axios.post("http://localhost:5001/api/users/login", data, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.data.success) {
//         const { token, user } = response.data;
//         localStorage.setItem("token", token);
//         setToken(token);
//         setUser(user);
//         navigate("/home");
//       } else {
//         throw new Error(response.data.message);
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("token");
//     navigate("/home");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export const useAuth = () => useContext(AuthContext);





// //latest
// import { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("site") || "");
//   const navigate = useNavigate();

//   const loginAction = async (data) => {
//     try {
//       const response = await fetch("http://localhost:5001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         setUser(res.username);
//         setToken(res.token);
//         localStorage.setItem("site", res.token);
//         navigate("/home");
//         return;
//       }
//       throw new Error(res.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const registerAction = async (userData) => {
//     try {
//       const response = await fetch("http://localhost:5001/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (data.success) {
//         // Set user and token after successful registration
//         setUser(data.username);
//         setToken(data.token);
//         localStorage.setItem("site", data.token);
//         navigate("/home"); // Redirect to home or desired page after registration
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("An error occurred during registration. Please try again later.");
//     }
//   };

//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     navigate("/home");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// export const useAuth = () => {
//   return useContext(AuthContext);
// };









// import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   // ✅ Load user and token from localStorage on initial render
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("siteUser");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [token, setToken] = useState(localStorage.getItem("site") || "");

//   // ✅ Ensure user persists on refresh
//   useEffect(() => {
//     if (token && !user) {
//       const storedUser = localStorage.getItem("siteUser");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }
//   }, [token]);

//   // ✅ Fix `loginAction` to store user correctly
//   const loginAction = async (data) => {
//     try {
//       const response = await fetch("http://localhost:5001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         const userData = { _id: res._id, username: res.username }; // ✅ Store only necessary user data

//         setUser(userData);
//         setToken(res.token);

//         localStorage.setItem("site", res.token);
//         localStorage.setItem("siteUser", JSON.stringify(userData)); // ✅ Store user properly

//         navigate("/home");
//       } else {
//         throw new Error(res.message);
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   // ✅ Fix `registerAction` to store user correctly
//   const registerAction = async (userData) => {
//     try {
//       const response = await fetch("http://localhost:5001/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       const res = await response.json();
//       if (res.success) {
//         const newUserData = { _id: res._id, username: res.username };

//         setUser(newUserData);
//         setToken(res.token);

//         localStorage.setItem("site", res.token);
//         localStorage.setItem("siteUser", JSON.stringify(newUserData));

//         navigate("/home");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("An error occurred during registration. Please try again later.");
//     }
//   };

//   // ✅ Fix `logOut` to remove both user & token from localStorage
//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     localStorage.removeItem("siteUser");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export const useAuth = () => useContext(AuthContext);




// import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   // ✅ Load user and token from localStorage on initial render
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("siteUser");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [token, setToken] = useState(localStorage.getItem("site") || "");

//   // ✅ Ensure user persists on refresh
//   useEffect(() => {
//     if (token && !user) {
//       const storedUser = localStorage.getItem("siteUser");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }
//   }, [token]);

//   // ✅ Fix `loginAction` to store user correctly
//   const loginAction = async (data) => {
//     try {
//       const response = await fetch("http://localhost:5001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         const userData = {
//           _id: res._id,
//           username: res.username,
//           displayName: res.displayName || res.username,
//           bio: res.bio || "",
//         };

//         setUser(userData);
//         setToken(res.token);

//         localStorage.setItem("site", res.token);
//         localStorage.setItem("siteUser", JSON.stringify(userData));

//         navigate("/home");
//       } else {
//         throw new Error(res.message);
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   // ✅ Fix `registerAction` to store user correctly
//   const registerAction = async (userData) => {
//     try {
//       const response = await fetch("http://localhost:5001/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       const res = await response.json();
//       if (res.success) {
//         const newUserData = {
//           _id: res._id,
//           username: res.username,
//           displayName: res.displayName || res.username,
//           bio: res.bio || "",
//         };

//         setUser(newUserData);
//         setToken(res.token);

//         localStorage.setItem("site", res.token);
//         localStorage.setItem("siteUser", JSON.stringify(newUserData));

//         navigate("/home");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("An error occurred during registration. Please try again later.");
//     }
//   };

//   // ✅ Fix `logOut` to remove both user & token from localStorage
//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     localStorage.removeItem("siteUser");
//     navigate("/login");
//   };

//   // ✅ Function to update the user profile
//   const updateUser = (updatedProfile) => {
//     setUser((prevUser) => ({
//       ...prevUser,
//       displayName: updatedProfile.displayName,
//       bio: updatedProfile.bio,
//     }));
//     localStorage.setItem("siteUser", JSON.stringify({
//       ...user,
//       displayName: updatedProfile.displayName,
//       bio: updatedProfile.bio,
//     }));
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, setUser, loginAction, registerAction, logOut, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export const useAuth = () => useContext(AuthContext);




import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../utils/api"; // ✅ Import function to fetch user profile

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Load user and token from localStorage on initial render
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("siteUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("site") || "");

  // ✅ Fetch user profile on refresh to keep localStorage updated
  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const profileData = await getUserProfile(); // ✅ Fetch latest profile from DB
          if (profileData) {
            const updatedUser = {
              _id: profileData._id,
              username: profileData.username,
              displayName: profileData.displayName || profileData.username,
              bio: profileData.bio || "",
            };

            setUser(updatedUser);
            localStorage.setItem("siteUser", JSON.stringify(updatedUser)); // ✅ Fix localStorage update
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      fetchProfile();
    }
  }, [token]); // ✅ Runs when token changes

  // ✅ Fix `loginAction` to store user correctly
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        const userData = {
          _id: res._id,
          username: res.username,
          displayName: res.displayName || res.username,
          bio: res.bio || "",
        };

        setUser(userData);
        setToken(res.token);

        localStorage.setItem("site", res.token);
        localStorage.setItem("siteUser", JSON.stringify(userData)); // ✅ Fix storage issue

        navigate("/home");
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // ✅ Fix `registerAction` to store user correctly
  const registerAction = async (userData) => {
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const res = await response.json();
      if (res.success) {
        const newUserData = {
          _id: res._id,
          username: res.username,
          displayName: res.displayName || res.username,
          bio: res.bio || "",
        };

        setUser(newUserData);
        setToken(res.token);

        localStorage.setItem("site", res.token);
        localStorage.setItem("siteUser", JSON.stringify(newUserData));

        navigate("/home");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  // ✅ Fix `logOut` to remove both user & token from localStorage
  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("siteUser");
    navigate("/login");
  };

  // ✅ Fix `updateUser` to properly update `user` state and `localStorage`
  const updateUser = (updatedProfile) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedProfile };
      localStorage.setItem("siteUser", JSON.stringify(newUser)); // ✅ Fix persistence
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, loginAction, registerAction, logOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
