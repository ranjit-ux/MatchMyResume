import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import resumeImg from "../assets/resume-sample.png";



const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/profile/me");
        const analysisRes = await api.get("/profile/analyses");

        setProfile(profileRes.data);
        setAnalyses(analysisRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this analysis?");
    if(!confirm) return;

    try{
      await api.delete(`/api/result/${id}`);

      setAnalyses((prev) => prev.filter((a) => a._id !== id));
    }catch(err){
      console.error(err);
      alert("Failed to delete analysis");
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* PROFILE HEADER */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">{profile?.name}</h1>
            <p className="text-gray-500">{profile?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* ANALYSIS HISTORY */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Resume Analysis History
          </h2>

          {analyses.length === 0 ? (
            <p className="text-gray-500">No analysis done yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {analyses.map((a) => (
            <div
              key={a._id}
              onClick={() => navigate(`/stored-result/${a._id}`)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(a._id);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:bg-red-100 z-10"
                title="Delete analysis">
                <FiTrash2 className="text-red-500 w-5 h-5" />
              </button>

              {/* Resume Thumbnail */}
              <img
                src={a.thumbnail ? a.thumbnail : resumeImg}
                alt="Resume"
                className="h-40 w-full object-contain"
              />

              {/* Card Content */}
              <div className="p-4">
                <p className="font-semibold">Resume Analysis</p>
                <p className="text-sm text-gray-500">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
