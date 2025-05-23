const jwt = require("jsonwebtoken");
const User = require("../db-models/user.model");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token: user not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
