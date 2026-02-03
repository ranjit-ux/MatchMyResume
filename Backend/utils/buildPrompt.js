export function buildPrompt(resumeText, jdText) {
  return `
You are an ATS resume evaluator.

Analyze the RESUME against the JOB DESCRIPTION and return ONLY a valid JSON object
with EXACTLY the following fields and no extra text:

{
  "score": number (0-100),
  "weaknesses": string[],
  "improvements": string[],
  "missing_skills": string[],
  "ats_issues": string[],
  "summary": string
}

Rules:
- Do NOT include markdown
- Do NOT include explanations outside JSON
- All arrays must exist (even if empty)
- All arrays must have minimum 3 elements
- Summary must be 2 to 3 sentences max

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jdText}
"""
`;
}
