const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'MulterError') {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({ error: 'File size exceeds limit' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files' });
    }
  }

  if (err.message === 'Only PDF, JPG, JPEG, PNG files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error', message: err.message });
};

module.exports = errorHandler;
