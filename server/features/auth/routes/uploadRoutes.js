const express = require('express');
const { getAvatarUploadSignature } = require('../controllers/uploadController');

const router = express.Router();

router.get('/signature/avatar', getAvatarUploadSignature); // 🆕 Новый маршрут для получения подписи

module.exports = router;
