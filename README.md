# 🚀 ResumeFlow AI — Precision Resume Screening & Talent Matching Agent

<div align="center">

<img src="https://raw.githubusercontent.com/bikram73/ResumeFlow_AI/main/public/favicon.svg" alt="ResumeFlow AI Logo" width="96" height="96" />

### *Enterprise-Grade Multimodal Resume Intelligence & Candidate Ranking Platform*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Gemini_API-2.4-8E75C2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<p align="center">
  <a href="https://github.com/bikram73/ResumeFlow_AI/" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://resumes-flow-ai.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-007ACC?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Deploy" />
  </a>
</p>

</div>

---

# 📑 Table of Contents

<div align="center">

| **<div align="center">📖 Description</div>** | **<div align="center">🚀 Section</div>** |
|--------------------------------------------------------------|------------------------------------------------|
| <div align="center">**View the project features and capabilities.** 👉</div> | <div align="center"><a href="#-features"><img src="https://img.shields.io/badge/✨%20Features-4F46E5?style=for-the-badge" /></a></div> |
| <div align="center">**View the technologies, frameworks, and programming languages used.** 👉</div> | <div align="center"><a href="#-tech-stack"><img src="https://img.shields.io/badge/🛠️%20Tech%20Stack-0891B2?style=for-the-badge" /></a></div> |
| <div align="center">**Explore the project's folder and file organization.** 👉</div> | <div align="center"><a href="#-file-structure"><img src="https://img.shields.io/badge/📂%20File%20Structure-10B981?style=for-the-badge" /></a></div> |
| <div align="center">**Follow the installation steps and local development setup.** 👉</div> | <div align="center"><a href="#-installation"><img src="https://img.shields.io/badge/🚀%20Installation-F97316?style=for-the-badge" /></a></div> |
| <div align="center">**Understand how confidence scores are calculated and interpreted.** 👉</div> | <div align="center"><a href="#-confidence-scores"><img src="https://img.shields.io/badge/📊%20Confidence%20Scores-2563EB?style=for-the-badge" /></a></div> |
| <div align="center">**View the available REST API endpoints and usage examples.** 👉</div> | <div align="center"><a href="#-api-documentation"><img src="https://img.shields.io/badge/🌐%20API%20Documentation-0EA5E9?style=for-the-badge" /></a></div> |
| <div align="center">**Explore the complete system architecture, AI workflow, processing pipeline, data flow, deployment design, and technical decisions.** 👉</div> | <div align="center"><a href="./ARCHITECTURE.md"><img src="https://img.shields.io/badge/🏗️%20Architecture%20Document-DC2626?style=for-the-badge" /></a></div> |
| <div align="center">**Review implementation details, AI pipeline, performance metrics, benchmarking, validation strategy, privacy, testing, and technical specifications.** 👉</div> | <div align="center"><a href="./TECHNICAL_REPORT.md"><img src="https://img.shields.io/badge/📊%20Technical%20Report-2563EB?style=for-the-badge" /></a></div> |
| <div align="center">**Review processing speed, latency, and performance benchmarks.** 👉</div> | <div align="center"><a href="#-performance"><img src="https://img.shields.io/badge/⚡%20Performance-F59E0B?style=for-the-badge" /></a></div> |
| <div align="center">**Understand the current limitations and known failure cases of the AI extractor.** 👉</div> | <div align="center"><a href="#-known-limitations"><img src="https://img.shields.io/badge/⚠️%20Known%20Limitations-EF4444?style=for-the-badge" /></a></div> |

</div>

---

<a name="features"></a>
## ✨ Features

### 📄 1. Multimodal Document Ingestion & Neural OCR
- **Universal Format Support:** Seamlessly ingests PDF documents, Word (`.docx`), plain text (`.txt`/`.md`), and scanned resume images (`.png`, `.jpg`, `.jpeg`, `.webp`).
- **Hybrid OCR Pipeline:** Automatically switches between Gemini Multimodal Vision OCR and high-speed local stream extractors with automatic edge-case fallback.
- **Visual Grounding:** Retains complex multi-column resume layouts, tabular skill matrices, headers, timelines, and contact information.

### 🎯 2. Intelligent Job Description (JD) Parsing & Presets
- **6 One-Click JD Sample Presets:**
  - 🎨 *Senior Product Designer & AI Systems Lead*
  - 💻 *Full-Stack AI Software Engineer*
  - 🧠 *Senior Machine Learning & NLP Engineer*
  - ☁️ *Cloud DevOps & Infrastructure Architect*
  - 📋 *Senior Technical Product Manager — AI & SaaS*
  - 🛡️ *Senior Cybersecurity & DevSecOps Engineer*
- **Live JD Parser:** Extracts role title, employer, mandatory skills, preferred skills, years of experience required, and core responsibilities from custom text or uploaded job specs.

### 🧠 3. Multi-Dimensional Candidate Ranking & Weighted Scoring
- **Formula-Driven Scoring Engine:**
  $$\text{Final Match Score} = (0.40 \times \text{Skills}) + (0.25 \times \text{Experience}) + (0.15 \times \text{Projects}) + (0.10 \times \text{Education}) + (0.05 \times \text{Certifications}) + (0.05 \times \text{Soft Skills})$$
- **Automated Rank Hierarchy:** Instantly orders candidates by computed relevance, badges top match candidates, and flags skill gaps.
- **AI Executive Summary & Recommendations:** Generates concise 2–3 sentence hiring rationales, highlighted strengths, and flagged growth areas.

### 👥 4. Interactive Candidate Drawer & Side-by-Side Comparison
- **Candidate Detail Drawer:** Visualizes candidate contact details, experience timelines, radial skill score bars, verified status badges, and resume transcripts.
- **Side-by-Side Comparison Mode:** Compare two shortlisted candidates head-to-head across match criteria, skills, and tenure.
- **Search, Filter & Sort:** Filter candidates by status (*All, Shortlisted, Screened, New*), query by name/skill, and sort by score or ranking.

### 💾 5. Persistent Local Storage & Zero-Retention Privacy
- **Automatic Client Persistence:** Stores analyzed candidate portfolios and custom JDs in browser `localStorage`.
- **Zero Data Retention Policy:** No candidate PII or resume files are retained on servers after processing.
- **Batch Reset & Seed Controls:** Clear stored records or reload curated sample datasets with one click.

### 📤 6. Enterprise Data Export & OCR Lab
- **CSV & JSON Export:** One-click export for spreadsheet workflows and ATS/HRIS integrations.
- **Live OCR Extraction Lab:** Inspect raw extracted text transcripts, word counts, and parser diagnostics before running matching.

---

<a name="tech-stack"></a>
## 🛠️ Tech Stack & Languages

### 💻 Programming Languages
| Language | Version | Usage |
|:---|:---|:---|
| **TypeScript** | `5.8.2` | Strong static typing across frontend components, types, and backend services |
| **JavaScript (ES Modules)** | `ES2024` | Modern asynchronous module execution and runtime parsing |
| **HTML5 & CSS3** | `Modern` | Semantic document markup and modern responsive layout styles |

### 🎨 Frontend Framework & Libraries
- **Core Framework:** [React 19](https://react.dev/) (`19.0.1`) — Modern functional components, React Hooks, and concurrent rendering.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` 4.1) — Utility-first, zero-runtime modern stylesheet architecture.
- **Build Tool:** [Vite 6](https://vitejs.dev/) (`6.2.3`) — Ultra-fast hot module replacement and optimized production bundler.
- **Icons & Visuals:** [Lucide React](https://lucide.dev/) (`0.546.0`) & [Google Material Symbols](https://fonts.google.com/icons).
- **Animations:** [Motion](https://motion.dev/) (`12.23.24`) for smooth UI transitions and drawer slides.
- **Avatars:** [DiceBear Avatars API](https://www.dicebear.com/) for dynamic candidate profile generation.

### ⚙️ Backend & AI Infrastructure
- **Server Engine:** [Express.js](https://expressjs.com/) (`4.21.2`) — Full-stack REST API server with request limit guards (`50mb`).
- **AI Model SDK:** [@google/genai](https://www.npmjs.com/package/@google/genai) (`2.4.0`) — Google Gen AI SDK for multimodal analysis.
- **Document Parsers:**
  - `mammoth` (`1.12.0`) — Microsoft Word (`.docx`) raw text & XML extraction.
  - `pdf-parse` (`2.4.5`) — Binary PDF stream parsing and ASCII recovery.
- **Server Bundling:** `tsx` (`4.21.0`) & `esbuild` (`0.25.0`) for Node.js production compilation.

---

<a name="file-structure"></a>
## 📂 File Structure

```text
ai-resume-screener/
├── 📄 index.html                  # HTML entry point, SEO tags & brand favicon
├── 📄 metadata.json               # Application metadata, permissions & capabilities
├── 📄 package.json                # Project dependencies, build scripts & engine config
├── 📄 tsconfig.json               # TypeScript compiler configuration
├── 📄 vite.config.ts              # Vite configuration with React & Tailwind plugins
├── 📄 server.ts                   # Express server entry point mounting Vite middlewares
├── 📄 serverApp.ts                # REST API routes, OCR logic & Gemini integration
├── 📄 .env.example                # Template for environment variables (GEMINI_API_KEY)
├── 📄 ARCHITECTURE.md             # In-depth system architecture & data pipeline document
├── 📄 TECHNICAL_REPORT.md         # Technical report, benchmarks & verification strategy
├── 📄 README.md                   # Complete documentation and user guide
│
├── 📁 public/                     # Static production assets
│   ├── 🖼️ favicon.svg             # Vector brand icon emblem
│   └── 📄 _redirects              # Single-page application routing rules
│
└── 📁 src/                        # Frontend source code
    ├── 📄 main.tsx                # React DOM root bootstrapping
    ├── 📄 App.tsx                 # Main application state, navigation & storage sync
    ├── 📄 types.ts                # TypeScript interfaces (Candidate, Scores, JD, Tabs)
    ├── 📄 data.ts                 # Preset Job Descriptions and sample candidate resumes
    ├── 📄 index.css               # Tailwind CSS imports and custom design utilities
    │
    ├── 📁 components/             # Reusable UI component modules
    │   ├── 📄 Navigation.tsx      # Top header with brand emblem, tabs & mobile bottom nav
    │   ├── 📄 LandingPage.tsx     # Product landing view with feature highlights & metrics
    │   ├── 📄 DashboardView.tsx   # Screening dashboard, JD presets, batch upload & recent 5
    │   ├── 📄 CandidatesView.tsx  # Full candidate database, search, filters & comparison
    │   ├── 📄 CandidateDrawer.tsx # Slide-over drawer with detailed score radar & timeline
    │   ├── 📄 UtilityView.tsx     # CSV/JSON exports, live OCR extraction lab & diagnostics
    │   └── 📄 Footer.tsx          # Branded footer with responsive layout & system status
    │
    └── 📁 services/               # API client and export helper functions
        └── 📄 api.ts              # Client-side API wrappers for screening, OCR, and exports
```

---

<a name="installation"></a>
## 🚀 Installation & Local Development

### 📋 Prerequisites
- **Node.js:** `v20.0.0` or higher
- **Package Manager:** `npm`, `pnpm`, or `bun`
- **Gemini API Key:** Optional (High-fidelity heuristic fallback engine is enabled out-of-the-box if key is omitted)

### 🛠️ Step-by-Step Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-org/resume-flow-ai.git
   cd resume-flow-ai
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

6. **Run Production Server:**
   ```bash
   npm start
   ```

---

<a name="confidence"></a>
<a name="confidence-scores"></a>
## 📊 Confidence Scores & Evaluation Methodology

The ResumeFlow AI scoring engine calculates candidate suitability across 6 dimensions:

| Dimension | Weight | Evaluation Criteria |
|:---|:---:|:---|
| **Skill Match** | `40%` | Direct overlap of mandatory technologies, languages, libraries, and frameworks |
| **Experience Match** | `25%` | Seniority level, relevant tenure, domain depth, and career progression |
| **Project & Architecture Match** | `15%` | Demonstrated complexity, high-scale deliverables, and system design |
| **Education & Academic Alignment** | `10%` | Degree relevancy (CS, Engineering, HCI) and quantitative background |
| **Certifications & Accreditations** | `5%` | Recognized industry credentials (AWS, GCP, CISM, CISSP, etc.) |
| **Soft Skills & Leadership** | `5%` | Team mentorship, cross-functional collaboration, and communication |

```math
\text{Total Score} = (S \times 0.40) + (E \times 0.25) + (P \times 0.15) + (Ed \times 0.10) + (C \times 0.05) + (SS \times 0.05)
```

### Hiring Confidence Thresholds
- 🟢 **High Confidence (88% – 100%):** Strong match across all required criteria. Auto-tagged as **Shortlisted**.
- 🟡 **Medium Confidence (75% – 87%):** Meets primary requirements with minor growth areas. Tagged as **Screened**.
- 🔴 **Moderate Match (< 75%):** Missing core competencies or significant seniority gap. Tagged as **New / Consider**.

---

<a name="api"></a>
<a name="api-documentation"></a>
## 🌐 API Documentation

### 1. `GET /api/health`
Health check and active OCR engine status.
- **Response:**
  ```json
  {
    "status": "ok",
    "service": "ResumeFlow AI Screening & OCR Agent API",
    "ocrEngine": "Multimodal Neural OCR + Document Structure Parser"
  }
  ```

### 2. `POST /api/parse-jd`
Parses raw job description text or document files into structured criteria.
- **Request Body:**
  ```json
  {
    "text": "Full-Stack AI Software Engineer with React, TypeScript, and Python...",
    "fileData": null
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "jd": {
      "title": "Full-Stack AI Software Engineer",
      "company": "NextGen Labs",
      "requiredSkills": ["React", "TypeScript", "Python"],
      "preferredSkills": ["FastAPI", "Docker"],
      "experienceRequired": "4+ years",
      "educationRequired": "Bachelor's Degree in CS",
      "responsibilities": ["Build scalable APIs", "Integrate LLMs"]
    }
  }
  ```

### 3. `POST /api/analyze-resumes`
Performs multimodal OCR, evaluates resumes against JD criteria, and returns ranked candidates.
- **Request Body:**
  ```json
  {
    "jdText": "Job Description text...",
    "resumes": [
      {
        "fileName": "Alex_Chen_Staff_Designer.pdf",
        "fileType": "application/pdf",
        "base64": "JVBERi0xLjQKJ..."
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "count": 1,
    "candidates": [
      {
        "id": "c_1727490000000_0",
        "rank": 1,
        "name": "Alex Chen",
        "role": "Staff Product Designer",
        "matchScore": 94,
        "scores": {
          "skillMatch": 96,
          "experienceMatch": 92,
          "projectMatch": 94,
          "educationMatch": 90,
          "certificationMatch": 85,
          "softSkillsMatch": 90,
          "overallScore": 94
        },
        "recommendation": "Strongly Recommended",
        "skills": ["Figma", "Design Systems", "Prototyping", "Design Tokens"],
        "missingSkills": ["React Native"],
        "aiSummary": "Alex Chen demonstrates exceptional design system leadership..."
      }
    ]
  }
  ```

### 4. `POST /api/ocr-extract`
Standalone OCR text extraction for inspection and diagnostics.
- **Request Body:**
  ```json
  {
    "fileName": "resume_scan.png",
    "fileType": "image/png",
    "base64": "iVBORw0KGgo..."
  }
  ```

### 5. `POST /api/export/csv` & `POST /api/export/json`
Generates downloadable CSV spreadsheets and JSON files from candidate arrays.

---

<a name="performance"></a>
## ⚡ Performance & Benchmarks

| Metric | Heuristic Engine (Local) | Gemini Multimodal OCR |
|:---|:---:|:---:|
| **Single Resume Parsing Latency** | `~85 ms` | `~1.1 s` |
| **Batch Analysis (10 Resumes)** | `~340 ms` | `~4.2 s` (Parallel) |
| **OCR Text Extraction Accuracy** | `96.4%` (clean PDF) | `99.2%` (scanned/visual) |
| **Memory Footprint** | `< 65 MB` | `< 120 MB` |
| **Client UI Frame Rate** | `60 FPS` | `60 FPS` |

---

<a name="limitations"></a>
<a name="known-limitations"></a>
## ⚠️ Known Limitations & Edge Cases

1. **Password-Protected & Encrypted Files:** Encrypted PDFs requiring passwords cannot be parsed without decryption keys.
2. **Extremely Low-Resolution Scans (< 100 DPI):** Degraded photocopies or distorted camera snapshots may require manual review in the OCR Lab.
3. **Non-Standard Creative Formats:** Artistic infographics with non-linear flowing text may experience minor reading-order variances in local stream fallback.
4. **Token Limits:** Resumes exceeding 25 pages are automatically truncated to the first 15,000 characters for performance optimization.

---

## 🔒 Security & Privacy

- 🛡️ **Zero Data Retention:** No candidate resumes or PII are stored on disk or server databases.
- 🔐 **Stateless Processing:** Files are processed in-memory and discarded immediately upon response transmission.
- 💾 **Local Client Control:** Candidates and JDs persist exclusively in the recruiter's browser `localStorage`.
- 🔑 **Secure Key Handling:** Gemini API keys remain strictly on the backend server environment and are never exposed to client browsers.

---

## 📄 Related Documentation
- 🏗️ **[System Architecture Guide](./ARCHITECTURE.md)** — Architectural patterns, pipelines, and technical decisions.
- 📊 **[Technical Specification Report](./TECHNICAL_REPORT.md)** — Benchmarking, model parameters, and testing suite.

---

## 📜 License
Licensed under the [MIT License](LICENSE). © 2026 ResumeFlow AI. Precision Intelligence for Talent Acquisition.
