const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    photoUrl: { type: String }, // ❌ не required
    role: {
      type: String,
      enum: ["Professional", "Amateur", "Observer", "Client"],
      required: true, // ✅ залишаємо, бо обов'язкове
    },
    professions: [{ type: String }], // масив професій
    offerType: { type: String },
    bio: { type: String, required: false }, // 🔧 виправлено
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
