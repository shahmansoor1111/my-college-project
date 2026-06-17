import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { supabase } from "../../library/supabase";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function ResultsView({ quizId, navigate }) {
  const { student } = useSession();
  const [quiz,       setQuiz]       = useState(null);
  const [questions,  setQuestions]  = useState([]);
  const [submission, setSubmission] = useState(null);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => { if (student) fetchData(); }, [quizId, student]);

  async function fetchData() {
    setLoading(true);

    const { data: quizData }      = await supabase.from("quizzes").select("*").eq("id", quizId).single();
    const { data: questionsData } = await supabase.from("questions").select("*").eq("quiz_id", quizId).order("created_at", { ascending: true });
    const { data: subData }       = await supabase.from("submissions").select("*").eq("quiz_id", quizId).eq("student_id", student.id).maybeSingle();

    setQuiz(quizData);
    setQuestions(questionsData || []);
    if (subData) setSubmission(subData);
    setLoading(false);
  }

  if (loading) return <LoadingSpinner label="Loading results..." />;

  if (!submission) return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#103d25", marginBottom: "10px" }}>No Submission Found</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>You haven't taken this quiz yet.</p>
        <button onClick={() => navigate(`student-quiz-attempt/${quizId}`)} style={primaryBtn}>Take Quiz</button>
      </div>
    </div>
  );

  const pct = submission.total_marks
    ? Math.round((submission.score / submission.total_marks) * 100) : 0;

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px" }}>

        <button onClick={() => navigate("student-dashboard")} style={backBtn}>← Back to Dashboard</button>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#103d25", marginBottom: "4px" }}>
          {quiz?.title} — Results
        </h1>

        {/* Score Card */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #eee", marginTop: "16px", marginBottom: "28px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "6px" }}>Your Score</div>
          <div style={{ fontSize: "40px", fontWeight: 700, color: "#103d25", fontFamily: "'Playfair Display', serif" }}>
            {submission.score} / {submission.total_marks}
          </div>
          <div style={{ display: "inline-block", marginTop: "10px", padding: "4px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: 600, background: pct >= 50 ? "#f0fdf4" : "#fef2f2", color: pct >= 50 ? "#16a34a" : "#dc2626" }}>
            {pct}%
          </div>
          <div style={{ color: "#9ca3af", fontSize: "12px", marginTop: "10px" }}>
            Submitted on {new Date(submission.submitted_at).toLocaleString()}
          </div>
        </div>

        {/* Answer Review */}
        <h2 style={{ fontSize: "16px", color: "#103d25", marginBottom: "12px", fontWeight: 600 }}>Answer Review</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {questions.map((q, idx) => {
            const correctIdx    = parseInt(q.answer);
            // submission.answers may not exist since we don't store per-question answers
            // so just show correct answer highlighted
            return (
              <div key={q.id} style={{ background: "#fff", borderRadius: "10px", padding: "16px 18px", border: "1px solid #eee" }}>
                <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "14.5px", marginBottom: "10px" }}>
                  {idx + 1}. {q.question}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {q.options.map((opt, i) => (
                    <div key={i} style={{
                      fontSize: "13.5px", padding: "8px 14px", borderRadius: "6px",
                      background: i === correctIdx ? "#f0fdf4" : "#f9fafb",
                      color:      i === correctIdx ? "#16a34a"  : "#374151",
                      border:     i === correctIdx ? "1px solid #bbf7d0" : "1px solid #f3f4f6",
                      fontWeight: i === correctIdx ? 600 : 400,
                    }}>
                      {String.fromCharCode(65 + i)}. {opt} {i === correctIdx && "✓ Correct Answer"}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const pageWrap   = { minHeight: "100vh", background: "#faf7f0", paddingTop: "100px", paddingBottom: "60px", fontFamily: "'DM Sans', sans-serif" };
const backBtn    = { background: "none", border: "none", color: "#103d25", fontWeight: 600, fontSize: "13px", cursor: "pointer", marginBottom: "20px", padding: 0, fontFamily: "'DM Sans', sans-serif" };
const primaryBtn = { background: "#103d25", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };