import Groq from "groq-sdk";

let client = null;

function getGroqClient() {
  if (!client) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY not loaded");
    }

    client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return client;
}

export async function analyzeResumeAI(prompt) {
  const groq = getGroqClient();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are a resume analyzer.

CRITICAL RULES:
- Respond ONLY with valid JSON
- No markdown
- No explanations
- No multiline strings
- Replace newlines with spaces
- Keep all string values on ONE LINE

Return JSON exactly in this schema:
{
  "score": number,
  "weaknesses": string[],
  "improvements": string[],
  "missing_skills": string[],
  "ats_issues": string[],
  "summary": string
}
        `.trim(),
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  let raw = completion.choices[0].message.content;

  // Remove accidental markdown
  raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

  // Extract JSON block only
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("❌ AI RAW OUTPUT:\n", raw);
    throw new Error("No JSON found in AI output");
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("❌ JSON PARSE FAILED");
    console.error("RAW JSON:\n", jsonMatch[0]);
    throw err;
  }

  // 🔒 HARD NORMALIZATION (final safety net)
  if (typeof parsed.summary === "string") {
    parsed.summary = parsed.summary
      .replace(/\s*\n\s*/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  return parsed;
}
