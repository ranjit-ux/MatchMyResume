import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    resumeFile: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    jd: {
      type: String,
      required: true,
    },

    // 🔢 Scores
    finalScore: {
      type: Number,
      required: true,
    },
    aiScore: {
      type: Number,
      required: true,
    },
    logicScore: {
      type: Number,
      required: true,
    },

    // 🧠 AI insights
    weaknesses: {
      type: [String],
      default: [],
    },
    improvements: {
      type: [String],
      default: [],
    },
    missing_skills: {
      type: [String],
      default: [],
    },
    ats_issues: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      required: true,
    },

    thumbnail:{
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Analysis", analysisSchema);
