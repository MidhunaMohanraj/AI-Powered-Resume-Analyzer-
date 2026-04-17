const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
   
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/analyze", async (req, res) => {
  const { resume, jobDescription } = req.body;

  if (!resume || !jobDescription) {
    return res.status(400).json({ error: "Resume and job description are required." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY is not set in environment." });
  }

  const prompt = `You are an expert ATS (Applicant Tracking System) and career coach. Analyze the resume against the job description and respond ONLY with a valid JSON object — no markdown, no explanation outside the JSON.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

Return this exact JSON structure:
{
  "matchScore": <number 0-100>,
  "verdict": "<one sentence overall verdict>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "gaps": ["<gap 1>", "<gap 2>", "<gap 3>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "keywords": {
    "matched": ["<keyword>", "<keyword>"],
    "missing": ["<keyword>", "<keyword>"]
  },
  "sections": {
    "experience": <score 0-100>,
    "skills": <score 0-100>,
    "education": <score 0-100>,
    "formatting": <score 0-100>
  }
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: `Anthropic API error: ${errText}` });
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || "";

    const clean = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ error: "Failed to analyze. Please try again." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`AI Resume Analyzer running at http://localhost:${PORT}`);
});
