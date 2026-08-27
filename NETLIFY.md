# Deploying to Netlify Guide

This project is configured out-of-the-box for **Netlify** deployment, including frontend static hosting and Netlify Serverless Functions for the AI backend API.

---

## 📁 Pre-configured Files
- **`netlify.toml`**: Configures build command (`npm run build`), publish folder (`dist`), serverless functions folder (`netlify/functions`), and API rewrite rules (`/api/*` -> Netlify Function).
- **`public/_redirects`**: Secondary redirect fallback for SPA routing and API proxying.
- **`netlify/functions/api.ts`**: Serverless function wrapping the Express backend (uses `serverless-http`).

---

## 🚀 Deployment Steps

### Option A: Connect via GitHub (Recommended)

1. Push your project repository to GitHub.
2. Log into your **[Netlify Dashboard](https://app.netlify.com)**.
3. Click **Add new site** > **Import an existing project**.
4. Select **GitHub** and authorize access to your repository.
5. Netlify will automatically detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
6. Before clicking Deploy, go to **Environment variables** (or **Site configuration > Environment variables**) and add:
   - **`GEMINI_API_KEY`**: Your Google Gemini API Key.
7. Click **Deploy Site**.

---

## 🔑 Required Environment Variables on Netlify

| Variable Name | Description |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API Key from Google AI Studio. |

---

### Option B: Deploy via Netlify CLI

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```
2. Build the project locally:
   ```bash
   npm run build
   ```
3. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```
4. Set environment variable:
   ```bash
   netlify env:set GEMINI_API_KEY "your_gemini_api_key_here"
   ```
