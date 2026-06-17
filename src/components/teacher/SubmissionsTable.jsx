import { useEffect, useState } from "react";
import { supabase } from "../../library/supabase";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function SubmissionsTable({ quizId, navigate }) {
  const [quiz, setQuiz] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, [quizId]);

  async function fetchData() {
    setLoading(true);

    const { data: quizData } = await supabase
      .from("quizzes").select("*, questions(id)").eq("id", quizId).single();

    // Fetch submissions first
    const { data: subsData, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("quiz_id", quizId)
      .order("submitted_at", { ascending: false });

    if (!error && subsData && subsData.length > 0) {
      // Fetch profiles separately for each student_id
      const studentIds = [...new Set(subsData.map(s => s.student_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", studentIds);

      // Merge profile data into submissions
      const profileMap = {};
      if (profilesData) {
        profilesData.forEach(p => { profileMap[p.id] = p; });
      }

      const merged = subsData.map(s => ({
        ...s,
        student_name: profileMap[s.student_id]?.full_name || s.student_id?.slice(0, 8) + "...",
      }));

      setSubmissions(merged);
    } else {
      setSubmissions([]);
    }

    setQuiz(quizData);
    setLoading(false);
  }

  if (loading) return <LoadingSpinner label="Loading submissions..." />;

  const totalQuestions = quiz?.questions?.length || 0;
  const avgScore = submissions.length
    ? (submissions.reduce((acc, s) => acc + (s.score || 0), 0) / submissions.length).toFixed(1)
    : 0;

  return (
    <div style={{
      minHeight: "100vh", background: "#faf7f0",
      paddingTop: "100px", paddingBottom: "60px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px" }}>

        <button onClick={() => navigate("teacher-dashboard")} style={{
          background: "none", border: "none", color: "#103d25",
          fontWeight: 600, fontSize: "13px", cursor: "pointer",
          marginBottom: "20px", padding: 0, fontFamily: "'DM Sans', sans-serif",
        }}>
          ← Back to Dashboard
        </button>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "28px", color: "#103d25", marginBottom: "4px",
        }}>
          {quiz?.title || "Quiz"} — Submissions
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
          {submissions.length} student(s) submitted · Average score: {avgScore} / {totalQuestions}
        </p>

        {submissions.length === 0 ? (
          <div style={{
            background: "#fff", borderRadius: "12px", padding: "40px",
            border: "1px solid #eee", textAlign: "center",
          }}>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>
              No submissions yet. Students will appear here after taking the quiz.
            </p>
          </div>
        ) : (
          <div style={{
            background: "#fff", borderRadius: "12px", border: "1px solid #eee",
            overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#103d25" }}>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Student Name</th>
                  <th style={thStyle}>Score</th>
                  <th style={thStyle}>Percentage</th>
                  <th style={thStyle}>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, i) => {
                  const pct = sub.total_marks
                    ? Math.round((sub.score / sub.total_marks) * 100)
                    : 0;
                  return (
                    <tr key={sub.id} style={{
                      borderBottom: i === submissions.length - 1 ? "none" : "1px solid #f0f0f0",
                      background: i % 2 === 0 ? "#fff" : "#fafafa",
                    }}>
                      <td style={tdStyle}>{i + 1}</td>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{sub.student_name}</td>
                      <td style={tdStyle}>{sub.score} / {sub.total_marks}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: "3px 10px", borderRadius: "20px",
                          fontSize: "12.5px", fontWeight: 600,
                          background: pct >= 50 ? "#f0fdf4" : "#fef2f2",
                          color: pct >= 50 ? "#16a34a" : "#dc2626",
                        }}>
                          {pct}%
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {new Date(sub.submitted_at).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left", padding: "14px 18px", color: "#fff",
  fontSize: "13px", fontWeight: 600, letterSpacing: "0.3px",
};
const tdStyle = {
  padding: "14px 18px", fontSize: "13.5px", color: "#1a1a1a",
};