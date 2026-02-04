import { useNavigate } from "react-router-dom";
import Logo from "../assets/MatchMyResumeLogo.png"
const Navbar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">

        <div onClick={() => navigate("/")} className="cursor-pointer font-bold text-slate-900 ">
          Match <span className="text-blue-600">My</span> Resume
        </div>

        {!isAuth ? (
          <div className="flex gap-2 sm:gap-3">
            <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
            <button onClick={() => navigate("/signup")} className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition">Signup</button>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3">
            <button onClick={() => navigate("/profile")} className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition">Profile</button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsAuth(false);
                navigate("/login");
              }}
              
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
