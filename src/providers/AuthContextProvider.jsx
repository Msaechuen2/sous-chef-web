import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../utils/api"; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("siteUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("site") || "");

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const profileData = await getUserProfile(); 
          if (profileData) {
            const updatedUser = {
              _id: profileData._id,
              username: profileData.username,
              displayName: profileData.displayName || profileData.username,
              bio: profileData.bio || "",
            };

            setUser(updatedUser);
            localStorage.setItem("siteUser", JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      fetchProfile();
    }
  }, [token]); 

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
        localStorage.setItem("siteUser", JSON.stringify(userData)); 

        navigate("/home");
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

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

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("siteUser");
    navigate("/login");
  };

  const updateUser = (updatedProfile) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedProfile };
      localStorage.setItem("siteUser", JSON.stringify(newUser)); 
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
