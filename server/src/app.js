const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./features/auth/auth.routes.js');
// Пізніше сюди підключиш інші маршрути: usersRoutes, publicationsRoutes і т.д.

const { connectDB } = require('./config/db');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Підключення до бази даних
connectDB();

// Загальні Middleware
app.use(cors());                 // Відкрити доступ до API для фронтенду
app.use(helmet());               // Захист HTTP-заголовків
app.use(morgan('dev'));          // Логування запитів у консоль
app.use(express.json());         // Парсити вхідний JSON
app.use(express.urlencoded({ extended: true })); // Парсити URL-encoded дані

// Роутинг
app.use('/api/auth', authRoutes);
// Пізніше:
// app.use('/api/users', usersRoutes);
// app.use('/api/publications', publicationsRoutes);

// Глобальний обробник помилок
app.use(errorHandler);

module.exports = app;
