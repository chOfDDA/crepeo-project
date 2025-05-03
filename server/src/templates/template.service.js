const User = require('../db-models/user.model');
const AppError = require('../utils/AppError');

// CREATE
async function createUser({ username, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('User already exists', 409);
  }
  return await User.create({ username, email, password });
}

// READ
async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
}

// UPDATE
async function updateUser(id, updates) {
  const updated = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!updated) {
    throw new AppError('User not found for update', 404);
  }
  return updated;
}

// DELETE
async function deleteUser(id) {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new AppError('User not found for deletion', 404);
  }
  return result;
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
