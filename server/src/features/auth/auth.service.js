const User = require('./user.model');

// Реєстрація користувача
async function registerUser({ username, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Користувач з таким email вже існує');
  }

  const user = new User({ username, email, password });
  await user.save();

  return user;
}

// Пошук користувача по email
async function findUserByEmail(email) {
  return await User.findOne({ email });
}

module.exports = { registerUser, findUserByEmail };