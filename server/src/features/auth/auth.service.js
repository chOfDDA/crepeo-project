const User = require('../../db-models/user.model');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/AppError');
const jwt = require('jsonwebtoken');

// REGISTER
async function registerUser({ username, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('User already exists', 409);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });

  return {
    id: user._id,
    username: user.username,
    email: user.email
  };
}

// LOGIN
async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
}

module.exports = {
  registerUser,
  loginUser,
};
