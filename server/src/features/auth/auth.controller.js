const { registerUser, loginUser } = require('./auth.service');
const AppError = require('../../utils/AppError');

// REGISTER
async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new AppError('All fields are required', 400);
    }

    const user = await registerUser({ username, email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
}

// LOGIN
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const { token, user } = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };