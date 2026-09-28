# 🏗️ ResumeFlow AI — System Architecture & Design Specification

## 1. High-Level System Architecture

```text
[ Recruiter / Browser Client ]
  │
  ├── React 19 SPA (Vite + Tailwind CSS v4)
  │     ├── Navigation & State Store (LocalStorage Sync)
  │     ├── Dashboard View (JD Input & Batch Dropzone)
  │     ├── Candidates View (Search, Filters, Side-by-Side Comparison)
  │     └── Utility Lab (OCR Preview & CSV/JSON Exporters)
  │
  ▼ [ HTTP / REST JSON Payload (< 50MB) ]
[ Node.js + Express Server API ]
  │
  ├── File Ingestion & Format Resolver (PDF, DOCX, Images, TXT)
  ├── Dual-Engine Document OCR Pipeline
  │     ├── Primary: Google Gemini Multimodal Vision API
  │     └── Fallback: Local PDF-Parse v2 / Mammoth Parser
  │
  ├── ATS Weighted Scoring & Ranking Engine
  │     └── Dynamic Match Weighting (Skills 40%, Experience 25%, Projects 15%, etc.)
  │
  ▼
[ Response: Structured Ranked Candidates JSON + Match Breakdown ]
```

## 2. Ingestion & Document OCR Pipeline

The document pipeline processes multi-format candidate resumes through a tiered extraction architecture:

1. **Format Detection:** Inspects MIME headers and file extensions to route incoming data streams.
2. **Vision / Multimodal Layer:** If `GEMINI_API_KEY` is present, converts document binary to base64 inline parts for `gemini-3.7-flash` OCR processing.
3. **Local Stream Parser:** If API limits or offline modes occur, falls back to `mammoth` (for `.docx`) or `pdf-parse` (for `.pdf`).
4. **Binary ASCII Cleaner:** Cleans non-printable ASCII stream characters and recovers structured text.

## 3. Data Flow & State Management

- **Client State:** React `useState` hooks synchronizing automatically with browser `localStorage` (`ai_resume_screener_candidates_v1`).
- **Zero Server State:** Server functions are completely stateless; all calculations execute in-memory with automatic garbage collection.

## 4. Security & Privacy Guardrails

- No resume documents are persisted to disk or cloud storage buckets.
- API keys are secured in backend environment variables.
