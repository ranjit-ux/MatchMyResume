import { useNavigate } from "react-router-dom";
import Logo from "../assets/MatchMyResumeLogo.png"
const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");


  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        
        {/* Logo + Brand */}
        <div 
          className="flex items-center cursor-pointer "
          onClick={() => navigate("/")}
        >
          {/* <img
            src={Logo}
            alt="MatchMyResume Logo"
             className="h-10 w-15 sm:h-12 sm:w-12 md:h-14 md:w-18"
          /> */}
          <div className="text-slate-900 font-bold text-lg sm:text-xl md:text-xl">
            Match <span className="text-blue-600">My</span> Resume
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:gap-3">
          {!token ? (
            <>
              <button 
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>

              <button 
                onClick={() => navigate("/signup")}
                className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="bg-slate-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-slate-900 transition cursor-pointer"
              >
                Profile
              </button>

            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
