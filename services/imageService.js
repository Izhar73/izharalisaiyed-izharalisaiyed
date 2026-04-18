const sharp = require('sharp');

const supportedInputMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'image/gif'
]);

const compressImage = async (buffer, mimeType, quality = 70) => {
  if (!supportedInputMimeTypes.has(mimeType)) {
    throw new Error('Unsupported file type. Please upload a valid image.');
  }

  const normalizedQuality = Math.max(1, Math.min(100, Number(quality) || 70));

  const compressedBuffer = await sharp(buffer)
    .rotate()
    .jpeg({ quality: normalizedQuality, mozjpeg: true })
    .toBuffer();

  return {
    compressedBuffer,
    outputMimeType: 'image/jpeg',
    quality: normalizedQuality
  };
};

module.exports = {
  compressImage,
  supportedInputMimeTypes
};
