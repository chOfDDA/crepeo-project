const express = require('express')
const { registerHandler } = require('../controllers/authController')

const router = express.Router()

router.post('/register', registerHandler)
// router.post('/login',    loginHandler)
// router.get('/google',    googleRedirect)
// router.get('/google/callback', googleCallback)

module.exports = router
// Compare this snippet from server/feature/auth/index.js: