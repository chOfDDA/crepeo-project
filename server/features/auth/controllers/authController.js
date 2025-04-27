const { register } = require('../services/authService')

async function registerHandler(req, res) {
  try {
    const { user, token } = await register(req.body)
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message })
  }
}

module.exports = { registerHandler }
