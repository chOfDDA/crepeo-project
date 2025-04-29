const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Логувати стек трейс помилки
  
    const statusCode = err.statusCode || 500; // Встановити статус помилки (або 500 за замовчуванням)
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  };
  
  module.exports = errorHandler;