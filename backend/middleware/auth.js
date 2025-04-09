const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); 

    if (!req.user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Token verification failed, authorization denied" });
  }
};
