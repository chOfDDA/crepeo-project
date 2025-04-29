const mongoose = require('mongoose');

// Схема користувача
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Будь ласка, введіть коректний email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    // Якщо в майбутньому будуть ролі (наприклад, "користувач", "адміністратор"):
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Створить createdAt і updatedAt автоматично
  }
);

// Створення моделі користувача
const User = mongoose.model('User', userSchema);

module.exports = User;
