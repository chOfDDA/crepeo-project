const express = require("express");
const Post = require("../../db-models/post.model.js");
const auth = require("../../middlewares/authMiddleware.js");
const router = express.Router();

// Отримати всі пости (головна сторінка)
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username photoUrl");
    res.json({ posts });
  } catch (err) {
    next(err);
  }
});

// Отримати пости певного користувача (профіль)
router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .lean()
      .populate("author", "username photoUrl");
    res.json({ posts });
  } catch (err) {
    next(err);
  }
});

// Створити новий пост
router.post("/", auth, async (req, res, next) => {
  try {
    const { content, imageUrl } = req.body;
    const post = await Post.create({
      author: req.user.id,
      content,
      imageUrl,
    });
    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "username photoUrl"
    );
    res.status(201).json({ post: populatedPost });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
