import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Login required" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked" });
    }
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminMiddleware = async (req, res, next) => {
  try {
    const idToFind = req.user.id || req.user.userId;
    const user = await User.findById(idToFind);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error checking admin status" });
  }
};
