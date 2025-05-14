const dotenv = require('dotenv');
const app = require('./src/app');

// Завантаження змінних середовища з .env
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
