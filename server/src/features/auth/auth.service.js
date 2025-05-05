const User = require('../../db-models/user.model');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/AppError');
const jwt = require('jsonwebtoken');

// REGISTER
async function registerUser({ username, email, password }) {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new AppError('Email already exists', 409);
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new AppError('Username already exists', 409);
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
    throw new AppError('Invalid login or password', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid login or password', 401);
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
