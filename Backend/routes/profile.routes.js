import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Analysis from "../models/Analysis.js";

const router = express.Router();

/* =========================================================
   GET PROFILE (NAME + EMAIL ONLY)
   ========================================================= */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // fetch user for email
    const user = await User.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ensure profile exists
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      profile = await Profile.create({
        user: req.user.id,
        name: user.name || ""
      });
    }

    res.status(200).json({
      name: profile.name || user.name,
      email: user.email
    });
  } catch (err) {
    console.error("PROFILE FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   GET ANALYSIS HISTORY (PAST RESUME ANALYSES)
   ========================================================= */
router.get("/analyses", authMiddleware, async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("thumbnail resumeFile createdAt finalScore");

    res.status(200).json(analyses);
  } catch (err) {
    console.error("ANALYSIS FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch analyses" });
  }
});

export default router;
