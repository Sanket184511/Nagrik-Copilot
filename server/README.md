# Nagrik Copilot - Backend Server

Backend service for Nagrik Copilot, an AI-powered citizen assistance platform.

## Project Structure

```
src/
├── config/          # Configuration files (Gemini, Firebase, uploads)
├── controllers/     # Request handlers (documentController, readinessController)
├── models/          # Database schemas (Document, Analysis, ReadinessCheck)
├── services/        # Business logic (documentService, aiService, readinessService)
├── routes/          # API routes (documentRoutes, readinessRoutes)
├── middleware/      # Custom middleware (errorHandler)
├── utils/           # Utility functions
├── ai/              # AI/Gemini integration
├── storage/         # File storage logic
└── app.js           # Express app setup
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Fill in required environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `MONGODB_URI` or Firebase credentials
   - Other configurations

4. Start the server:
   ```bash
   npm run dev    # Development mode
   npm start      # Production mode
   ```

## API Endpoints

### Documents
- `POST /api/documents/upload` - Upload a document
- `POST /api/documents/simplify` - Simplify a document
- `POST /api/documents/extract` - Extract requirements from document
- `GET /api/documents/analysis/:analysisId` - Get analysis
- `DELETE /api/documents/:documentId` - Delete document

### Readiness
- `POST /api/readiness/check` - Check readiness
- `POST /api/readiness/compare` - Compare documents
- `GET /api/readiness/report/:checkId` - Get readiness report

## Key Features

- Document upload handling with validation
- AI-powered document simplification using Gemini API
- Requirement extraction from government documents
- Document readiness checking
- Consistency analysis across documents
- Temporary file management with automatic cleanup

## Technologies

- Express.js - Web framework
- Multer - File upload handling
- Gemini API - AI processing
- Firebase/MongoDB - Data persistence
- UUID - Unique ID generation
