module.exports = (req, res, next) => {
    const originalJson = res.json;
  
    res.json = function (data) {
      const formatted = {
        success: res.statusCode < 400,
        ...data
      };
      return originalJson.call(this, formatted);
    };
  
    next();
  };
  