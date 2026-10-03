// Document Model
const documentSchema = {
  id: String,
  filename: String,
  originalName: String,
  filePath: String,
  mimeType: String,
  size: Number,
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date // For automatic cleanup
};

module.exports = documentSchema;
