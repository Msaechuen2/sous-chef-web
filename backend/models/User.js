// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: [true, "Please add a name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please add an email"],
//     unique: true,
//     match: [
//       /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//       "Please add a valid email",
//     ],
//   },
//   password: {
//     type: String,
//     required: [true, "Please add a password"],
//     minLength: 6,
//     select: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("users", UserSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: [true, "Please add a name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please add an email"],
//     unique: true,
//     match: [
//       /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//       "Please add a valid email",
//     ],
//   },
//   password: {
//     type: String,
//     required: [true, "Please add a password"],
//     minLength: 6,
//     select: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   // **Store Meal Planner**: Array of objects with date and meals
//   mealPlanner: [
//     {
//       date: { type: String, required: true },
//       meals: [
//         {
//           title: { type: String, required: true },
//           recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
//         }
//       ]
//     }
//   ],

//   // **Store Favorite Recipes**
//   favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
// });

// // **Hash password before saving**
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // **Generate JWT Token**
// UserSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || "7d",
//   });
// };

// // **Compare entered password with stored hashed password**
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", UserSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: [true, "Please add a name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please add an email"],
//     unique: true,
//     match: [
//       /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//       "Please add a valid email",
//     ],
//   },
//   password: {
//     type: String,
//     required: [true, "Please add a password"],
//     minLength: 6,
//     select: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("users", UserSchema);








// import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("siteUser")) || null
//   );
//   const [token, setToken] = useState(localStorage.getItem("site") || "");
//   const navigate = useNavigate();

//   // ✅ Fetch the user profile when token exists
//   useEffect(() => {
//     if (!token) return;
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/users/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         if (data.username) {
//           setUser(data);
//           localStorage.setItem("siteUser", JSON.stringify(data));
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//         localStorage.removeItem("siteUser");
//         setUser(null);
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   const loginAction = async (data) => {
//     try {
//       const response = await fetch("http://localhost:5001/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         setUser(res.user); // Store user object
//         setToken(res.token);
//         localStorage.setItem("site", res.token);
//         localStorage.setItem("siteUser", JSON.stringify(res.user)); // Save user data
//         navigate("/home");
//       } else {
//         throw new Error(res.message);
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   const registerAction = async (userData) => {
//     try {
//       const response = await fetch("http://localhost:5001/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setUser(data.user);
//         setToken(data.token);
//         localStorage.setItem("site", data.token);
//         localStorage.setItem("siteUser", JSON.stringify(data.user));
//         navigate("/home");
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
//     localStorage.removeItem("siteUser");
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




////////////////////////////////////////////
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: [true, "Please add a name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please add an email"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Please add a password"],
//     minLength: 6,
//     select: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", UserSchema);



const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MealSchema = new mongoose.Schema({
  date: { type: String, required: true }, // ✅ Ensures `date` is always required
  meals: [
    {
      title: String,
      recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
      recipeName: String,
      imageUrl: String,
      portion: { type: Number, default: 1 }, // ✅ NEW: Save selected portion
      ingredients: [{ type: String }],
    }
  ]
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: 6,
    select: false,
  },
  mealPlanner: [MealSchema],
  displayName: { 
    type: String, 
    default: "" 
  },
  bio: { 
    type: String, 
    default: "" 
  },
  favoriteRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes", // Reference to the Recipe model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.pre("save", async function (next) {
  // ✅ Prevent bcrypt from running if password is not changing
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("users", UserSchema);
