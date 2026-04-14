# 🤖 AI Resume Analyzer

An AI-powered resume analyzer built with **Node.js**, **Express**, and the **Claude API**. Paste a job description and your resume to get an instant ATS match score, keyword analysis, gap detection, and actionable suggestions.

![AI Resume Analyzer](https://img.shields.io/badge/Powered%20by-Claude%20AI-blueviolet?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features

- **ATS Match Score** — 0–100 score with visual ring indicator
- **Section Scores** — Individual scores for Experience, Skills, Education, and Formatting
- **Strengths & Gaps** — What's working and what's missing
- **Actionable Suggestions** — Specific improvements to make your resume stronger
- **Keyword Analysis** — Matched vs missing keywords from the job description
- **Clean Dark UI** — Minimal, responsive, and fast

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
cd ai-resume-analyzer

# 2. Install dependencies
npm install

# 3. Set up your environment
cp .env.example .env
# Then edit .env and add your ANTHROPIC_API_KEY

# 4. Start the server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (required) |
| `PORT` | Server port (default: 3000) |

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── public/
│   └── index.html      # Frontend (HTML/CSS/JS)
├── server.js           # Express server + Claude API integration
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🛠️ How It Works

1. User pastes a job description and resume into the UI
2. The frontend sends both to `POST /api/analyze`
3. The Express server calls the Claude API with a structured prompt
4. Claude returns a JSON analysis (score, strengths, gaps, keywords, suggestions)
5. The frontend renders the results with animated visuals

---

## 🌐 Deployment

### Deploy to Railway
```bash
# Install Railway CLI, then:
railway init
railway up
railway variables set ANTHROPIC_API_KEY=your_key_here
```

### Deploy to Render
- Connect your GitHub repo on [render.com](https://render.com)
- Add `ANTHROPIC_API_KEY` as an environment variable
- Build command: `npm install`
- Start command: `npm start`

---

## 📄 License

MIT — feel free to use, modify, and share.
