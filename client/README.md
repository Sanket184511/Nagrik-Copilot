# Nagrik Copilot - Frontend Client

React + Vite frontend for Nagrik Copilot, an AI-powered citizen assistance platform.

## Project Structure

```
src/
├── components/      # Reusable components (DocumentUpload, DocumentSummary, ReadinessReport)
├── pages/          # Page components (LandingPage, DocumentSimplifier, ReadinessChecker)
├── services/       # API client (api.js)
├── hooks/          # Custom hooks (useDocument, useReadiness)
├── utils/          # Utility functions
├── styles/         # Tailwind CSS and global styles
├── assets/         # Images and icons
├── context/        # React context for state management
└── App.jsx         # Main app component
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

3. Update API endpoint if needed:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Key Features

- Document upload with drag-and-drop
- AI-powered document simplification
- Document readiness checking
- Requirements extraction
- Document consistency analysis
- Responsive UI with Tailwind CSS
- Support for PDF, JPG, JPEG, PNG formats

## Technologies

- React 18 - UI library
- Vite - Build tool
- Tailwind CSS - Styling
- Lucide Icons - Icons
- Axios - HTTP client

## Pages

### Landing Page
Entry point with two main options:
- Understand a Document
- Check My Documents

### Document Simplifier
- Upload government documents
- Get AI-generated simplified explanations
- View action items and deadlines

### Readiness Checker
- Upload multiple documents
- Check readiness against requirements
- Identify missing or problematic documents
- View inconsistencies across documents
