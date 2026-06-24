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

  // ⏱️ Timer aur Navigation ke liye nai States
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [timeLeft, setTimeLeft]         = useState(10);

  useEffect(() => { if (student) fetchData(); }, [quizId, student]);

  // ⏱️ Timer Logic: Har question ke liye 10 seconds
  useEffect(() => {
    if (loading || alreadyDone || questions.length === 0 || submitting) return;

    // Agar time khatam ho jaye toh agle question par jao
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    // Har 1 second baad timer kam karein
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, currentIndex, loading, questions]);

  async function fetchData() {
    setLoading(true);

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

  // Next question par jaane ki logic ya auto-submit
  function handleNextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(10); // Agle question ke liye timer dobara 10 par reset
    } else {
      // Agar aakhri question tha aur time up ho gaya, toh direct submit karlein
      autoSubmit();
    }
  }

  // Bina confirmation ke direct submit (Timer khatam hone ki surat mein)
  async function autoSubmit(finalAnswers = answers) {
    setSubmitting(true);
    setError(null);

    const score = questions.reduce((acc, q) =>
      acc + (finalAnswers[q.id] === parseInt(q.answer) ? 1 : 0), 0);

    const { error: insertError } = await supabase.from("submissions").insert({
      quiz_id:          quizId,
      student_id:       student.id,
      student_name:     student.full_name,
      enrollment_number: student.enrollment_number,
      score,
      total_marks:      questions.length,
    });

    if (insertError) { setError(insertError.message); setSubmitting(false); return; }

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

  // Manually button click kar ke submit karne ke liye
  async function handleSubmit() {
    if (!confirm("Are you sure you want to submit the quiz?")) return;
    autoSubmit(answers);
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

  if (!quiz || questions.length === 0) return (
    <div style={pageWrap}>
      <p style={{ textAlign: "center", color: "#6b7280" }}>Quiz or questions not found.</p>
    </div>
  );

  // Sirf maujooda (Current) question nikalein
  const currentQuestion = questions[currentIndex];

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#103d25", margin: 0 }}>
            {quiz.title}
          </h1>
          {/* ⏱️ Visual Timer Counter */}
          <div style={{ 
            background: timeLeft <= 3 ? "#fee2e2" : "#103d25", 
            color: timeLeft <= 3 ? "#dc2626" : "#fff", 
            padding: "8px 16px", borderRadius: "20px", 
            fontWeight: "bold", fontSize: "14px",
            border: timeLeft <= 3 ? "1px solid #fca5a5" : "none"
          }}>
            ⏱️ Time Left: {timeLeft}s
          </div>
        </div>

        <p style={{ color: "#9ca3af", fontSize: "12.5px", marginBottom: "28px" }}>
          Question {currentIndex + 1} of {questions.length} · Answered: {Object.keys(answers).length} / {questions.length}
        </p>

        {/* Sirf single current question render hoga */}
        <div style={{ background: "#fff", borderRadius: "10px", padding: "20px 24px", border: "1px solid #eee", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "16px", marginBottom: "16px" }}>
            {currentIndex + 1}. {currentQuestion.question}
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {currentQuestion.options.map((opt, i) => {
              const selected = answers[currentQuestion.id] === i;
              return (
                <label key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px", borderRadius: "8px", cursor: "pointer",
                  border:      selected ? "2px solid #103d25" : "1px solid #e5e7eb",
                  background:  selected ? "#f0f7f3" : "#fafafa",
                  fontSize: "14px", color: "#1a1a1a",
                  transition: "all 0.2s ease"
                }}>
                  <input 
                    type="radio" 
                    name={`q-${currentQuestion.id}`} 
                    checked={selected}
                    onChange={() => selectAnswer(currentQuestion.id, i)}
                    style={{ accentColor: "#103d25", width: "16px", height: "16px" }} 
                  />
                  <span><strong>{String.fromCharCode(65 + i)}.</strong> {opt}</span>
                </label>
              );
            })}
          </div>
        </div>

        {error && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "16px" }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
          {currentIndex < questions.length - 1 ? (
            <button onClick={handleNextQuestion} style={primaryBtn}>
              Next Question →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} style={{ ...primaryBtn, background: "#16a34a" }}>
              {submitting ? "Submitting..." : "Finish & Submit Quiz"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

const pageWrap   = { minHeight: "100vh", background: "#faf7f0", paddingTop: "100px", paddingBottom: "60px", fontFamily: "'DM Sans', sans-serif" };
const backBtn    = { background: "none", border: "none", color: "#103d25", fontWeight: 600, fontSize: "13px", cursor: "pointer", marginBottom: "20px", padding: 0, fontFamily: "'DM Sans', sans-serif" };
const primaryBtn = { background: "#103d25", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };