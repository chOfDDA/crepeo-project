const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./features/auth/auth.routes.js');

const connectDB = require('./config/db');
const responseFormatter = require('./middlewares/responseFormatter');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Підключення до бази даних
connectDB();

// Загальні Middleware
app.use(cors());                         // Доступ ззовні
app.use(helmet());                       // Захист HTTP-заголовків
app.use(morgan('dev'));                  // Логування
app.use(express.json());                 // Парсинг JSON
app.use(express.urlencoded({ extended: true })); // Парсинг form-urlencoded

// 📦 Форматування відповіді (усі res.json → success + message + data)
app.use(responseFormatter);

// 📡 Роутинг
app.use('/api/auth', authRoutes);
// TODO: Додати інші маршрути:
// app.use('/api/users', usersRoutes);
// app.use('/api/publications', publicationsRoutes);

// Глобальний обробник помилок (усі throw/error → message + status)
app.use(errorHandler);

module.exports = app;
