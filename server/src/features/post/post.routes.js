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

router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user posts" });
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

// Видалити пост
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Перевірка, чи користувач є автором поста
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
