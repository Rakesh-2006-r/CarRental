import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
