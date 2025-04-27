const User = require('../models/user')
const jwt  = require('jsonwebtoken')

async function register({ email, password, username, avatarUrl }) {
  // проверяем дубликат по email
  if (await User.findOne({ email })) {
    const err = new Error('Email уже занят')
    err.status = 400
    throw err
  }

  // создаём пользователя (пароль сам захешируется в pre-save)
  const user = await User.create({ email, password, username, avatarUrl })

  // генерируем JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { user, token }
}

module.exports = { register }
