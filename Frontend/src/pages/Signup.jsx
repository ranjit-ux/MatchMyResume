import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
  try {
    setLoading(true);

    const res = await api.post("/signup", {
      name: fullName,
      email,
      password,
    });

    // ✅ auto-login
    localStorage.setItem("token", res.data.token);

    // ✅ auto-create profile with name
    // await api.put("/", {
    //   name: fullName,
    // });

    navigate("/");

  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSuccess = async (res) => {
    try{
      setLoading(true);

      const response = await api.post("/api/auth/google", {
        token: res.credential,
      });

      localStorage.setItem("token",response.data.token);
      navigate("/");
    }catch(err){
      console.error(err);
      alert("Google signup failed");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#2563EB]">
          Welcome to MMR
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white font-semibold py-2 rounded-lg hover:bg-[#1D4ED8] transition disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#2563EB] font-medium cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
