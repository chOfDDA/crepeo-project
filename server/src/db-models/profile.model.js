const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    photoUrl: { type: String },
    role: {
      type: String,
      enum: ["Professional", "Amateur", "Observer", "Client"],
      required: true,
    },
    professions: [{ type: String }],
    offerType: { type: String },
    bio: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
