import express from "express";
import Analysis from "../models/Analysis.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * GET stored analysis by ID
 * URL: /api/result/:id
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user.id, // 🔒 ensure ownership
    });

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    res.status(200).json(analysis);
  } catch (err) {
    console.error("Fetch analysis error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req,res) => {
    try{
        const deleted = await Analysis.findOneAndDelete({
            _id: req.params.id,
            user:req.user.id,
        });

        if(!deleted){
            return res.status(404).json({message: "Analysis not found"});
        }

        res.status(200).json({message:"Analysis deleted successfully"});
    }catch(err){
        console.error("Delete analysis error:",err);
        res.status(500).json({message:"Server error"});
    }
});

export default router;
