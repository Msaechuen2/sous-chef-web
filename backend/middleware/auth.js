// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect = async (req, res, next) => {
//   let token = req.headers.authorization;

//   if (token && token.startsWith("Bearer ")) {
//     token = token.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       console.error("Auth middleware error:", error);
//       res.status(401).json({ message: "Unauthorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "No token provided" });
//   }
// };


// module.exports = async (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // Get token from header

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     req.user = decoded; // Attach user info to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };


// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Middleware to protect routes and authenticate users
// exports.protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1]; // Extract token
//     }

//     if (!token) {
//         return res.status(401).json({ message: "Not authorized, no token provided" });
//     }

//     try {
//         // Verify and decode the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id).select('-password'); // Exclude password

//         if (!req.user) {
//             return res.status(401).json({ message: "User not found, authorization denied" });
//         }

//         next(); // Proceed to the next middleware
//     } catch (error) {
//         console.error("Auth Error:", error);
//         res.status(401).json({ message: "Token verification failed, authorization denied" });
//     }
// };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect = async (req, res, next) => {
//   let token;

//   // ✅ Check for token in Authorization header
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token provided" });
//   }

//   try {
//     // ✅ Verify token and attach user to request
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found, authorization denied" });
//     }

//     next(); // Proceed to next middleware
//   } catch (error) {
//     console.error("Auth Error:", error);
//     res.status(401).json({ message: "Token verification failed, authorization denied" });
//   }
// };





// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Middleware to protect routes and authenticate users
// exports.protect = async (req, res, next) => {
//   let token;

//   // Extract token from Authorization header
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token provided" });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found, authorization denied" });
//     }

//     next();
//   } catch (error) {
//     console.error("Auth Error:", error);
//     res.status(401).json({ message: "Token verification failed, authorization denied" });
//   }
// };






const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  // Extract token from the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to request

    if (!req.user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    next(); // Proceed to next middleware or route
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Token verification failed, authorization denied" });
  }
};
