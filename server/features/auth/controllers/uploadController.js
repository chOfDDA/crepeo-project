const cloudinary = require('cloudinary').v2;

function getAvatarUploadSignature(req, res) {
  const userId = req.user?.id || 'anonymous';  // 🆕 Берём ID пользователя (если авторизация есть)

  const timestamp = Math.floor(Date.now() / 1000);  // обязательный параметр
  const folder = `avatars/${userId}`;               // складывать в папку avatars/{userId}

  const paramsToSign = {
    timestamp,
    folder,
    upload_preset: process.env.VITE_CLOUDINARY_UPLOAD_PRESET_SIGNED,  // используем preset для аватарок
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

  res.json({
    signature,
    timestamp,
    folder,
    preset: process.env.VITE_CLOUDINARY_UPLOAD_PRESET_SIGNED,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,  // тоже отправим, чтобы фронт сразу знал
    apiKey: process.env.CLOUDINARY_API_KEY,        // и ключ тоже для безопасности
  });
}

module.exports = { getAvatarUploadSignature };
