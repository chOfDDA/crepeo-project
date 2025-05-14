const router = require('express').Router();
const auth = require('../../middlewares/authMiddleware');
const Profile = require('../../db-models/profile.model');

// Отримати профіль поточного користувача
router.get('/', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  res.json({ profile });
});

// Отримати профіль за ID користувача
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const profile = await Profile.findOne({ user: userId });
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json({ profile });
});

// Створити або оновити профіль поточного користувача
router.post('/', auth, async (req, res) => {
  try {
    const { bio, profession, photoUrl } = req.body;
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile.bio = bio;
      profile.profession = profession;
      profile.photoUrl = photoUrl;
      await profile.save();
    } else {
      profile = new Profile({
        user: req.user.id,
        bio,
        profession,
        photoUrl
      });
      await profile.save();
    }

    res.json({ profile });
  } catch (error) {
    console.error('Error saving profile:', error);  // Логування
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
