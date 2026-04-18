const mongoose = require('mongoose');

const toolOperationSchema = new mongoose.Schema(
  {
    toolName: {
      type: String,
      required: true,
      trim: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    originalSize: {
      type: Number,
      required: true
    },
    processedSize: {
      type: Number,
      required: true
    },
    compressionQuality: {
      type: Number,
      min: 1,
      max: 100
    },
    savedBytes: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ToolOperation', toolOperationSchema);
