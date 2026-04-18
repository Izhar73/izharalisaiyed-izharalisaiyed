const errorHandler = (err, req, res, next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
