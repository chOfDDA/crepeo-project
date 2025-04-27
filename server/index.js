// server/index.js
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
})

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./features/auth/routes/authRoutes')
const uploadRoutes = require('./features/auth/routes/uploadRoutes')  // 🆕 Добавили импорт роутов

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)  // 🆕 Подключили upload маршруты

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
