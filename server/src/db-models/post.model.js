const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt" },
  }
);

module.exports = mongoose.model("Post", postSchema);
