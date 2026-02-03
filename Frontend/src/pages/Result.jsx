import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SemiCircleScore from "../components/SemiCircleScore";

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) return <Navigate to="/" replace />;

  const {
    finalScore,
    aiScore,
    logicScore,
    weaknesses = [],
    improvements = [],
    missing_skills = [],
    ats_issues = [],
    summary,
  } = state;

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-rose-50 px-6 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5">

        {/* ================= SCORE CARD ================= */}
        <Card className="col-span-12 md:col-span-4 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-400 text-center">
              Resume Match
            </p>

            <div className="mt-5 flex justify-center">
              <SemiCircleScore value={finalScore} />
            </div>

            <p className="mt-2 text-center text-sm text-slate-600">
              <span className="text-indigo-600 font-semibold">AI {aiScore}</span>
              {" • "}
              <span className="text-emerald-600 font-semibold">
                ATS {logicScore}
              </span>
            </p>

            <div className="mt-5 space-y-2">
              <Metric label="ATS Compatibility" ok={ats_issues.length === 0} />
              <Metric label="Skill Coverage" ok={missing_skills.length < 3} />
              <Metric label="Resume Clarity" ok />
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-5 w-full bg-gradient-to-r from-indigo-600 to-blue-600
                       text-white py-2 rounded-xl text-sm font-medium"
          >
            Analyze Another Resume
          </button>
        </Card>

        {/* ================= SNAPSHOT SUMMARY ================= */}
        <Card className="col-span-12 md:col-span-8">
          <h3 className="text-lg font-semibold text-blue-600">
            Snapshot Insight
          </h3>

          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            {summary}
          </p>

          {/* Missing skills inline */}
          {missing_skills.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              <h2 className="text-slate-400 font-semibold tracking-wide">Key Gaps:</h2>
              {missing_skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full
                             bg-rose-100 text-rose-700 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 flex gap-2 flex-wrap">
            <h2 className="text-slate-400 font-semibold tracking-wide">Risk Signals</h2>
            {missing_skills.length > 0 && (
              <Badge color="amber">Needs Skill Alignment</Badge>
            )}

            {ats_issues.length > 0 && (
              <Badge color="rose">ATS Risk</Badge>
            )}

            {aiScore >= 65 && (
              <Badge color="emerald">Strong Backend Base</Badge>
            )}

          </div>

        </Card>

        {/* ================= ATS ISSUES (REPLACED MISSING SKILLS) ================= */}
        <Card className="col-span-12 md:col-span-4">
          <SectionTitle color="slate">ATS & Resume Issues</SectionTitle>
          <ul className="space-y-2 text-sm">
            {ats_issues.slice(0, 4).map((issue, i) => (
              <li
                key={i}
                className="bg-slate-100 border border-slate-200
                           rounded-lg px-3 py-2"
              >
                • {issue}
              </li>
            ))}
          </ul>
        </Card>

        {/* ================= IMPROVEMENTS ================= */}
        <Card className="col-span-12 md:col-span-4">
          <SectionTitle color="emerald">Priority Improvements</SectionTitle>
          <ul className="space-y-2 text-sm">
            {improvements.slice(0, 4).map((imp, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-600">✔</span>
                <span className="text-slate-700">{imp}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* ================= WEAKNESSES ================= */}
        <Card className="col-span-12 md:col-span-4">
          <SectionTitle color="amber">Risks & Gaps</SectionTitle>
          <ul className="space-y-2 text-sm">
            {weaknesses.slice(0, 4).map((w, i) => (
              <li
                key={i}
                className="bg-amber-50 border border-amber-200
                           rounded-lg px-3 py-2"
              >
                ⚠ {w}
              </li>
            ))}
          </ul>
        </Card>

      </div>
    </div>
  );
};

/* ================= UI PRIMITIVES ================= */

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-3xl shadow-lg p-5 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, color }) => (
  <h3 className={`text-sm font-semibold mb-3 text-${color}-700`}>
    {children}
  </h3>
);

const Metric = ({ label, ok }) => (
  <div className="flex justify-between text-sm">
    <span className="text-slate-600">{label}</span>
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        ok
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {ok ? "Good" : "Needs Work"}
    </span>
  </div>
);

const Badge = ({ children, color }) => (
  <span
    className={`px-3 py-1 text-xs rounded-full
                bg-${color}-100 text-${color}-700 font-medium`}
  >
    {children}
  </span>
);

export default Result;
