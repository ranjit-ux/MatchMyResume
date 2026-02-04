import { useState } from "react";
import api from "../api/axios";
import PdfThumbnail from "../components/PdfThumbnail";
const Home = ({ onAnalyzeStart, onAnalyzeComplete }) => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

const handleAnalyze = async () => {
  if (!resume || !jd) {
    alert("Resume & JD required");
    return;
  }
  if(jd.trim().length<20){
    alert("Please paste a proper job description (min 20 characters)")
    return;
  }

  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jd", jd);

  if(thumbnail) {
    formData.append("thumbnail",thumbnail);
  }

  onAnalyzeStart();

  try{
    const res = await api.post("/api/analyze", formData);
    onAnalyzeComplete(res.data);
  }
  catch(err){
    alert("Analysis Failed");
  }

};

  return (
    <div className="h-full flex flex-col items-center px-4">

      {/* Headline */}
      <h2 className="text-center text-slate-700 text-base sm:text-lg md:text-2xl mt-6 font-semibold">
        <span className="text-blue-600">Stop guessing. </span>
        See how your resume really stacks up.
      </h2>

      <p className="text-center text-sm text-slate-500 mt-2">
        No login required • Fast • Private
      </p>

      {/* Import Section */}
      <div className="flex-1 w-full max-w-6xl mt-6 bg-white border border-slate-200 rounded-xl
                      flex gap-6 p-6">

        {/* Resume Upload */}
        <div
          className="flex-1 relative border-2 border-dashed border-slate-300 rounded-lg
                     flex flex-col items-center justify-center cursor-pointer
                     hover:border-blue-500 transition"
        >
          {/* Hidden file input */}
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <p className="font-medium text-slate-700">
            {resume ? resume.name : "Upload Resume (PDF / DOCX)"}
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Drag & drop or click
          </p>
        </div>

        {/* Job Description */}
        <div className="flex-1 flex flex-col">
          <label className="font-medium text-slate-700 mb-2">
            Job Description
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className="flex-1 resize-none border border-slate-300 rounded-lg p-3
                       focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Paste the job description here..."
          />
        </div>
      </div>

        {resume && resume.type === "application/pdf" && 
          (
            <PdfThumbnail
              file={resume}
              onRendered={(img) => setThumbnail(img)}
            />
          )
        }

      {!isLoggedIn && (
        <p className="text-sm text-gray-500 mt-2">
          Upload without login. Sign up to save your resume & results.
        </p>
      )}

      {/* Analyze Button */}
      <div className="py-4">
        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg
                     hover:bg-blue-700 transition cursor-pointer"
        >
          Analyze Resume
        </button>
      </div>

    </div>
  );
};

export default Home;
