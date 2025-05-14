const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const presets = {
  avatar: {
    folder: 'avatars',
    preset: process.env.CLOUDINARY_UPLOAD_PRESET_AVATAR
  },
  post: {
    folder: 'posts',
    preset: process.env.CLOUDINARY_UPLOAD_PRESET_POST
  }
};

router.get('/signature/:type', (req, res) => {
  const { type } = req.params;
  const config = presets[type];

  if (!config) {
    return res.status(400).json({ message: 'Invalid upload type' });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log({
    preset: config.preset,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  });

  const signatureString = `folder=${config.folder}&source=uw&timestamp=${timestamp}&upload_preset=${config.preset}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

  console.log({
    timestamp,
    folder: config.folder,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    preset: config.preset
  });

  res.json({
    timestamp,
    folder: config.folder,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    preset: config.preset
  });
 
});

module.exports = router;
