export function keywordScore(resumeText, jdText) {
  const resumeWords = new Set(
    resumeText.toLowerCase().split(/\W+/)
  );

  const jdWords = new Set(
    jdText.toLowerCase().split(/\W+/)
  );

  let matched = 0;

  jdWords.forEach(word => {
    if (word.length > 3 && resumeWords.has(word)) {
      matched++;
    }
  });

  if (jdWords.size === 0) return 0;

  return Math.min(
    100,
    Math.round((matched / jdWords.size) * 100)
  );
}
