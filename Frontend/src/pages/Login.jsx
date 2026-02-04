import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
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
            handleLogin();
          }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-2 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            First time to MMR?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer"
            >
              Click here
            </span>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;
