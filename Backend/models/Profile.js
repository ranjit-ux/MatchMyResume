import mongoose, { Schema } from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            unique:true,
        },
        name: String,
        college: String,
        branch: String,
        graduationYear: Number,
        skills: [String],
        bio:String,
        resumeLink: String,
    },
    {
        timestamps:true,
    }
)

const Profile = mongoose.model("Profile",profileSchema);
export default Profile;