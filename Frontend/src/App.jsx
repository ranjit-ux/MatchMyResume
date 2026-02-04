import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Loader from "./pages/Loader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import StoredResult from "./pages/StoredResult";

const AppLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // remove token from URL (clean)
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 relative">
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={
              <Home 
                onAnalyze={(data) => {
                  sessionStorage.setItem("analysis", JSON.stringify(data));
                  setLoading(true);
                }}
              />
            }
          />


          <Route
            path="/login"
            element={
              <div className="absolute inset-0 z-50 bg-black/40">
                <Login />
              </div>
            }
          />

          <Route
            path="/signup"
            element={
              <div className="absolute inset-0 z-50 bg-black/40">
                <Signup />
              </div>
            }
          />

          <Route 
            path="/result"
            element={<Result/>}
          />

          <Route  
            path="/profile"
            element={token ? <Profile/> : <Navigate to="/login" />}
          />

          <Route 
            path="/stored-result/:id"
            element={<StoredResult/>}
          />

        </Routes>
            
            

        {/* Loader Overlay */}
        {loading && (
          <div className="absolute inset-0 z-40 bg-black/40">
            <Loader
              onDone={() => {
                setLoading(false);

                const data = JSON.parse(sessionStorage.getItem("analysis"));
                navigate("/result", {state: data});
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
