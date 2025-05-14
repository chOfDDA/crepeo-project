const express = require('express');
const Post = require('../../db-models/post.model.js');
const auth = require('../../middlewares/authMiddleware.js');
const router = express.Router();

// Отримати всі свої пости
router.get('/', auth, async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user.id })
                            .sort({ createdAt: -1 })
                            .lean();
    res.json({ posts });
  } catch (err) {
    next(err);
  }
});

// Створити новий пост
router.post('/', auth, async (req, res, next) => {
  try {
    const { content, imageUrl } = req.body;
    const post = await Post.create({
      author: req.user.id,
      content,
      imageUrl
    });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
