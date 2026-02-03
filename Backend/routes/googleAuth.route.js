import express from "express";
import jwt from "jsonwebtoken"
import {OAuth2Client} from "google-auth-library"
import User from "../models/User.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req,res) => {
    try{
        const {token} = req.body;

        if(!token){
            return res.status(400).json({message:"No token provided"});
        }

        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID,
        });

        const {name,email}=ticket.getPayload();

        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                name,
                email,
                provider:"google",
            });
        }

        const jwtToken = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.status(200).json({token:jwtToken});
    }catch(err){
        console.error("Google auth error:", err);
        res.status(401).json({message:"Google authentication failed"});
    }
});

export default router;