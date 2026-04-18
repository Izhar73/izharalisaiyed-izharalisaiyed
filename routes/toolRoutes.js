const express = require('express');
const { compressImageHandler } = require('../controllers/toolController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/compress-image', upload.single('image'), compressImageHandler);

module.exports = router;
