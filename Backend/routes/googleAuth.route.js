import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * STEP 1: Redirect user to Google
 */
router.get("/google", (req, res) => {
  const redirectUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri:
        "https://matchmyresume-k5l.onrender.com/api/auth/google/callback",
      response_type: "code",
      scope: "openid email profile",
      prompt: "consent",
    });

  res.redirect(redirectUrl);
});

/**
 * STEP 2: Google redirects back here
 */
router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await client.getToken({
      code,
      redirect_uri:
        "https://matchmyresume-k5l.onrender.com/api/auth/google/callback",
    });

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google", // dummy
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ redirect back to frontend WITH token
    res.redirect(
      `https://matchmyresume-frontend.onrender.com/login?token=${token}`
    );
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.redirect(
      "https://matchmyresume-frontend.onrender.com/login?error=google"
    );
  }
});

export default router;
