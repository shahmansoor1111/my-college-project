import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { supabase } from "../../library/supabase";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function QuizAttempt({ quizId, navigate }) {
  const { student } = useSession();
  const [quiz,        setQuiz]        = useState(null);
  const [questions,   setQuestions]   = useState([]);
  const [answers,     setAnswers]     = useState({});
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState(null);
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => { if (student) fetchData(); }, [quizId, student]);

  async function fetchData() {
    setLoading(true);

    // Check if already submitted
    const { data: existing } = await supabase
      .from("submissions").select("id")
      .eq("quiz_id", quizId).eq("student_id", student.id).maybeSingle();

    if (existing) { setAlreadyDone(true); setLoading(false); return; }

    const { data: quizData }      = await supabase.from("quizzes").select("*").eq("id", quizId).single();
    const { data: questionsData } = await supabase.from("questions").select("*").eq("quiz_id", quizId).order("created_at", { ascending: true });

    setQuiz(quizData);
    setQuestions(questionsData || []);
    setLoading(false);
  }

  function selectAnswer(questionId, optionIndex) {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  }

  async function handleSubmit() {
    const answered = Object.keys(answers).length;
    if (answered < questions.length) {
      if (!confirm(`You answered ${answered} of ${questions.length} questions. Submit anyway?`)) return;
    }

    setSubmitting(true);
    setError(null);

    // Calculate score — answer stored as string so compare carefully
    const score = questions.reduce((acc, q) =>
      acc + (answers[q.id] === parseInt(q.answer) ? 1 : 0), 0);

    const { error: insertError } = await supabase.from("submissions").insert({
      quiz_id:          quizId,
      student_id:       student.id,
      student_name:     student.full_name,
      enrollment_number: student.enrollment_number,
      score,
      total_marks:      questions.length,
    });

    if (insertError) { setError(insertError.message); setSubmitting(false); return; }

    // Notify the teacher via notifications table
    if (quiz?.teacher_id) {
      await supabase.from("notifications").insert({
        student_id:      student.id,
        title:           "📬 Quiz Submitted!",
        message:         `${student.full_name} (${student.enrollment_number}) submitted "${quiz.title}" — Score: ${score}/${questions.length}`,
        type:            "quiz_submitted",
        related_quiz_id: quizId,
      });
    }

    setSubmitting(false);
    navigate(`student-quiz-results/${quizId}`);
  }

  if (loading) return <LoadingSpinner label="Loading quiz..." />;

  if (alreadyDone) return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#103d25", marginBottom: "10px" }}>Already Submitted</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>You already completed this quiz.</p>
        <button onClick={() => navigate(`student-quiz-results/${quizId}`)} style={primaryBtn}>View Your Results</button>
      </div>
    </div>
  );

  if (!quiz) return (
    <div style={pageWrap}>
      <p style={{ textAlign: "center", color: "#6b7280" }}>Quiz not found.</p>
    </div>
  );

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px" }}>
        <button onClick={() => navigate("student-dashboard")} style={backBtn}>← Back to Dashboard</button>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#103d25", marginBottom: "4px" }}>
          {quiz.title}
        </h1>
        {quiz.description && <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>{quiz.description}</p>}
        <p style={{ color: "#9ca3af", fontSize: "12.5px", marginBottom: "28px" }}>
          {questions.length} questions · Answered: {Object.keys(answers).length} / {questions.length}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {questions.map((q, idx) => (
            <div key={q.id} style={{ background: "#fff", borderRadius: "10px", padding: "18px 20px", border: "1px solid #eee" }}>
              <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "14.5px", marginBottom: "12px" }}>
                {idx + 1}. {q.question}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === i;
                  return (
                    <label key={i} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "10px 14px", borderRadius: "8px", cursor: "pointer",
                      border:      selected ? "2px solid #103d25" : "1px solid #e5e7eb",
                      background:  selected ? "#f0f7f3" : "#fafafa",
                      fontSize: "13.5px", color: "#1a1a1a",
                    }}>
                      <input type="radio" name={`q-${q.id}`} checked={selected}
                        onChange={() => selectAnswer(q.id, i)}
                        style={{ accentColor: "#103d25", width: "16px", height: "16px" }} />
                      <span><strong>{String.fromCharCode(65 + i)}.</strong> {opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {error && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "16px" }}>{error}</p>}

        <button onClick={handleSubmit} disabled={submitting || questions.length === 0}
          style={{ ...primaryBtn, marginTop: "24px", opacity: submitting ? 0.6 : 1 }}>
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
}

const pageWrap   = { minHeight: "100vh", background: "#faf7f0", paddingTop: "100px", paddingBottom: "60px", fontFamily: "'DM Sans', sans-serif" };
const backBtn    = { background: "none", border: "none", color: "#103d25", fontWeight: 600, fontSize: "13px", cursor: "pointer", marginBottom: "20px", padding: 0, fontFamily: "'DM Sans', sans-serif" };
const primaryBtn = { background: "#103d25", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };