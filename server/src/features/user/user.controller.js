const User = require("../../db-models/user.model");
const Profile = require("../../db-models/profile.model");

async function getMe(req, res, next) {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    const profile = await Profile.findOne({ userId });

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        photoUrl: profile?.photoUrl || null,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getMe };
