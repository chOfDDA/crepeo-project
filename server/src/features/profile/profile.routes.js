const router = require("express").Router();
const auth = require("../../middlewares/authMiddleware");
const Profile = require("../../db-models/profile.model");

router.get("/", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  res.json({ profile });
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const profile = await Profile.findOne({ user: userId }).populate(
    "user",
    "username"
  );
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  res.json({
    profile: {
      ...profile.toObject(),
      username: profile.user.username,
    },
  });
});

router.post("/", auth, async (req, res) => {
  try {
    const { bio, role, professions, offerType, photoUrl } = req.body;

    if (
      !role ||
      (["Professional", "Amateur"].includes(role) &&
        (!professions || professions.length === 0))
    ) {
      return res.status(400).json({ message: "Incomplete profile data" });
    }

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile.bio = bio || "";
      profile.role = role;
      profile.professions = professions || [];
      profile.offerType = offerType || "";
      profile.photoUrl = photoUrl || "";
      await profile.save();
    } else {
      profile = new Profile({
        user: req.user.id,
        bio: bio || "",
        role,
        professions: professions || [],
        offerType: offerType || "",
        photoUrl: photoUrl || "",
      });
      await profile.save();
    }

    res.json({ profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
