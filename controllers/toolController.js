const ToolOperation = require('../models/ToolOperation');
const { compressImage } = require('../services/imageService');

const compressImageHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required. Use field name: image'
      });
    }

    const quality = req.body.quality || 70;
    const { compressedBuffer, outputMimeType, quality: normalizedQuality } = await compressImage(
      req.file.buffer,
      req.file.mimetype,
      quality
    );

    const operation = await ToolOperation.create({
      toolName: 'compress-image',
      originalName: req.file.originalname,
      mimeType: outputMimeType,
      originalSize: req.file.size,
      processedSize: compressedBuffer.length,
      compressionQuality: normalizedQuality,
      savedBytes: req.file.size - compressedBuffer.length
    });

    res.setHeader('Content-Type', outputMimeType);
    res.setHeader('X-Original-Size', String(req.file.size));
    res.setHeader('X-Compressed-Size', String(compressedBuffer.length));
    res.setHeader('X-Saved-Bytes', String(req.file.size - compressedBuffer.length));
    res.setHeader('X-Operation-Id', String(operation._id));

    return res.status(200).send(compressedBuffer);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  compressImageHandler
};
