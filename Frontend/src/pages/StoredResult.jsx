import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const StoredResult = () => {
  const { id } = useParams(); // analysisId
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/api/result/${id}`);
        setResult(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load analysis");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading analysis...
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume Analysis Result</h1>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Back to Profile
          </button>
        </div>

        {/* SCORE CARD */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Match Score</h2>
          <p className="text-4xl font-bold text-blue-600">
            {result.finalScore}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            AI Score: {result.aiScore} • ATS Score: {result.logicScore}
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Snapshot Insight</h2>
          <p className="text-gray-700">{result.summary}</p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* WEAKNESSES */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3 text-red-600">
              Weaknesses
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {result.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

          {/* IMPROVEMENTS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3 text-green-600">
              Priority Improvements
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {result.improvements.map((imp, i) => (
                <li key={i}>{imp}</li>
              ))}
            </ul>
          </div>

          {/* MISSING SKILLS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3 text-orange-600">
              Missing Skills
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {result.missing_skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* ATS ISSUES */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3 text-yellow-600">
              ATS Issues
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {result.ats_issues.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StoredResult;
