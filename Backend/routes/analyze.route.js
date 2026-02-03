import express from "express";
import multer from "multer";
import optionalAuth from "../middlewares/optionalAuth.js";

import { parseResume } from "../utils/parseResume.js";
import { buildPrompt } from "../utils/buildPrompt.js";
import { analyzeResumeAI } from "../utils/analyzeWithAI.js";
import Analysis from "../models/Analysis.js";
import { keywordScore } from "../utils/keywordScore.js";
import { validateAIResult } from "../utils/validateAIResult.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/analyze",
  upload.single("resume"),
  optionalAuth,
  async (req, res) => {
    try {
      if (!req.file || !req.body.jd) {
        return res.status(400).json({ message: "Incomplete input" });
      }

      const thumbnail = req.body.thumbnail || null;

      // Resume → text
      const resumeText = await parseResume(req.file);

      // AI prompt
      const prompt = buildPrompt(resumeText, req.body.jd);
      const aiResult = await analyzeResumeAI(prompt);

      if (!validateAIResult(aiResult)) {
        console.warn("Invalid AI format");
      }

      // Logic score
      const logicScore = keywordScore(resumeText, req.body.jd);
      const finalScore = Math.round(0.6 * aiResult.score + 0.4 * logicScore);

      const analysisData = {
        resumeFile: req.file.originalname,
        resumeText,
        jd: req.body.jd,
        finalScore,
        aiScore: aiResult.score,
        logicScore,
        weaknesses: aiResult.weaknesses || [],
        improvements: aiResult.improvements || [],
        missing_skills: aiResult.missing_skills || [],
        ats_issues: aiResult.ats_issues || [],
        summary: aiResult.summary || "",
        thumbnail, // ✅ stored safely
      };

      if (req.user?.id) {
        analysisData.user = req.user.id;
      }

      const saved = await Analysis.create(analysisData);

      res.json({
        analysisId: saved._id,
        finalScore,
        aiScore: aiResult.score,
        logicScore,
        weaknesses: saved.weaknesses,
        improvements: saved.improvements,
        missing_skills: saved.missing_skills,
        ats_issues: saved.ats_issues,
        summary: saved.summary,
        thumbnail:saved.thumbnail,
      });
    } catch (err) {
      console.error("ANALYZE ERROR:", err);
      res.status(500).json({ message: "Analyze failed" });
    }
  }
);

export default router;
