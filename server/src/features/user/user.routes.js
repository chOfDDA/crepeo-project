const router = require("express").Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const User = require("../../db-models/user.model");
const { getMe } = require("./user.controller");

// Повертає поточного користувача з токена
router.get("/me", authMiddleware, getMe);

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
