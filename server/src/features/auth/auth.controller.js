const { registerUser } = require('./auth.service');

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Будь ласка, заповніть усі обов'язкові поля." });
    }

    const user = await registerUser({ username, email, password });

    res.status(201).json({ success: true, message: 'Користувач успішно зареєстрований', user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { register };