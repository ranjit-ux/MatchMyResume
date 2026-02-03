export function validateAIResult(result) {
  return (
    typeof result === "object" &&
    typeof result.score === "number" &&
    Array.isArray(result.weaknesses) &&
    Array.isArray(result.improvements) &&
    Array.isArray(result.missing_skills) &&
    Array.isArray(result.ats_issues) &&
    typeof result.summary === "string"
  );
}
