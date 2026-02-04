import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Loader from "./pages/Loader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import StoredResult from "./pages/StoredResult";

const AppLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isAuth, setIsAuth] = useState(() => 
    !!localStorage.setItem("token")
  );

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

      <div className="flex-1 relative">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <Home
                onAnalyze={(data) => {
                  sessionStorage.setItem(
                    "analysis",
                    JSON.stringify(data)
                  );
                  setLoading(true);
                }}
              />
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <div className="absolute inset-0 z-50 bg-black/40">
                <Login setIsAuth={setIsAuth} />
              </div>
            }
          />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={
              <div className="absolute inset-0 z-50 bg-black/40">
                <Signup setIsAuth={setIsAuth} />
              </div>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />

          {/* RESULT */}
          <Route path="/result" element={<Result />} />

          {/* STORED RESULT */}
          <Route
            path="/stored-result/:id"
            element={<StoredResult />}
          />
        </Routes>

        {/* LOADER OVERLAY */}
        {loading && (
          <div className="absolute inset-0 z-40 bg-black/40">
            <Loader
              onDone={() => {
                setLoading(false);
                const data = JSON.parse(
                  sessionStorage.getItem("analysis")
                );
                navigate("/result", { state: data });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
