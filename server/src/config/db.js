const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB підключено успішно');
  } catch (error) {
    console.error('Помилка підключення до MongoDB:', error.message);
    process.exit(1); // Завершити процес, якщо немає з'єднання
  }
};

module.exports = { connectDB };
