# Image & PDF Tools SaaS Backend

A complete backend project using **Node.js**, **Express**, **MongoDB**, **Mongoose**, **Multer**, and **Sharp** with a clean **MVC architecture**.

## Features

- MVC architecture with scalable folder structure
- MongoDB integration using Mongoose
- File upload API using Multer (memory storage)
- Image compression API using Sharp
- Operation logging in MongoDB

## Project Structure

```bash
.
├── config/
│   └── db.js
├── controllers/
│   └── toolController.js
├── middleware/
│   ├── errorHandler.js
│   └── upload.js
├── models/
│   └── ToolOperation.js
├── routes/
│   └── toolRoutes.js
├── services/
│   └── imageService.js
├── uploads/
├── temp/
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI.

4. Start server:

```bash
npm run dev
```

## API

### Health Check

- `GET /api/health`

### Compress Image

- `POST /api/tools/compress-image`
- Content-Type: `multipart/form-data`
- Field name: `image`
- Optional field: `quality` (1 to 100, default 70)

Example:

```bash
curl -X POST http://localhost:5000/api/tools/compress-image \
  -F "image=@/path/to/your/image.png" \
  -F "quality=60" \
  --output compressed.jpg
```

Response:
- Returns compressed image binary (JPEG)
- Includes metadata in headers:
  - `X-Original-Size`
  - `X-Compressed-Size`
  - `X-Saved-Bytes`
  - `X-Operation-Id`
