import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { supabase } from "../../library/supabase";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function QuestionEditor({ quizId, navigate }) {
  const { teacher } = useSession();
  const [quiz,          setQuiz]          = useState(null);
  const [questions,     setQuestions]     = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [questionText,  setQuestionText]  = useState("");
  const [options,       setOptions]       = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);
  const [saving,        setSaving]        = useState(false);
  const [error,         setError]         = useState(null);

  useEffect(() => { fetchData(); }, [quizId]);

  async function fetchData() {
    setLoading(true);
    const { data: quizData }      = await supabase.from("quizzes").select("*").eq("id", quizId).single();
    const { data: questionsData } = await supabase.from("questions").select("*").eq("quiz_id", quizId).order("created_at", { ascending: true });
    if (quizData)      setQuiz(quizData);
    if (questionsData) setQuestions(questionsData);
    setLoading(false);
  }

  function updateOption(index, value) {
    setOptions(prev => prev.map((o, i) => i === index ? value : o));
  }

  function resetForm() {
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOption(null);
  }

  async function handleAddQuestion(e) {
    e.preventDefault();
    setError(null);
    if (!questionText.trim())        { setError("Please enter the question text."); return; }
    if (options.some(o => !o.trim())) { setError("Please fill in all 4 options."); return; }
    if (correctOption === null)       { setError("Please select the correct answer."); return; }

    setSaving(true);
    const { data, error: insertError } = await supabase
      .from("questions")
      .insert({
        quiz_id:        quizId,
        question:       questionText.trim(),
        options:        options.map(o => o.trim()),
        answer:         String(correctOption),
        marks:          1,
      })
      .select().single();

    setSaving(false);
    if (insertError) { setError(insertError.message); return; }
    setQuestions(prev => [...prev, data]);
    resetForm();
  }

  async function deleteQuestion(questionId) {
    if (!confirm("Delete this question?")) return;
    const { error: deleteError } = await supabase.from("questions").delete().eq("id", questionId);
    if (!deleteError) setQuestions(prev => prev.filter(q => q.id !== questionId));
  }

  async function togglePublish() {
    const nowPublished = !quiz.is_published;
    const { error: updateError } = await supabase
      .from("quizzes").update({ is_published: nowPublished }).eq("id", quizId);
    if (updateError) { alert(updateError.message); return; }

    setQuiz(prev => ({ ...prev, is_published: nowPublished }));

    // Notify matching students when publishing
    if (nowPublished) {
      const { data: students } = await supabase
        .from("students")
        .select("id")
        .eq("department", quiz.target_department)
        .eq("semester",   quiz.target_semester);

      if (students?.length > 0) {
        const notifs = students.map(s => ({
          student_id:      s.id,
          title:           "📝 New Quiz Assigned!",
          message:         `"${quiz.title}" has been assigned by ${teacher?.name} for ${quiz.target_department} Semester ${quiz.target_semester}.`,
          type:            "quiz_assigned",
          related_quiz_id: quizId,
        }));
        await supabase.from("notifications").insert(notifs);
      }
    }
  }

  if (loading) return <LoadingSpinner label="Loading quiz..." />;
  if (!quiz) return (
    <div style={pageWrap}>
      <p style={{ color: "#6b7280" }}>Quiz not found.</p>
      <button onClick={() => navigate("teacher-dashboard")} style={backBtn}>← Back</button>
    </div>
  );

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>

        <button onClick={() => navigate("teacher-dashboard")} style={backBtn}>
          ← Back to Dashboard
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#103d25", marginBottom: "4px" }}>
              {quiz.title}
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>
              🎯 {quiz.target_department} · Semester {quiz.target_semester}
            </p>
            {quiz.description && <p style={{ color: "#6b7280", fontSize: "14px" }}>{quiz.description}</p>}
          </div>
          <button onClick={togglePublish} style={{
            background: quiz.is_published ? "#9ca3af" : "#16a34a", color: "#fff",
            border: "none", padding: "9px 20px", borderRadius: "8px",
            fontSize: "13px", fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
          }}>
            {quiz.is_published ? "Unpublish Quiz" : "🚀 Publish Quiz"}
          </button>
        </div>

        <p style={{ color: "#9ca3af", fontSize: "12.5px", marginBottom: "28px" }}>
          Status: <strong style={{ color: quiz.is_published ? "#16a34a" : "#d97706" }}>
            {quiz.is_published ? "Published — visible to students" : "Draft — not visible to students"}
          </strong>
        </p>

        {/* Questions List */}
        <h2 style={{ fontSize: "16px", color: "#103d25", marginBottom: "12px", fontWeight: 600 }}>
          Questions ({questions.length})
        </h2>

        {questions.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "28px" }}>
            No questions yet. Add your first question below.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
            {questions.map((q, idx) => {
              const correctIdx = parseInt(q.answer);
              return (
                <div key={q.id} style={{ background: "#fff", borderRadius: "10px", padding: "16px 18px", border: "1px solid #eee" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "14.5px" }}>
                      {idx + 1}. {q.question}
                    </div>
                    <button onClick={() => deleteQuestion(q.id)} style={{
                      background: "none", border: "none", color: "#dc2626",
                      cursor: "pointer", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap",
                    }}>Delete</button>
                  </div>
                  <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {q.options.map((opt, i) => (
                      <div key={i} style={{
                        fontSize: "13.5px", padding: "6px 12px", borderRadius: "6px",
                        background: i === correctIdx ? "#f0fdf4" : "#f9fafb",
                        color:      i === correctIdx ? "#16a34a"  : "#374151",
                        border:     i === correctIdx ? "1px solid #bbf7d0" : "1px solid #f3f4f6",
                        fontWeight: i === correctIdx ? 600 : 400,
                      }}>
                        {String.fromCharCode(65 + i)}. {opt} {i === correctIdx && "✓ Correct"}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Question Form */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #eee", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "16px", color: "#103d25", marginBottom: "6px", fontWeight: 600 }}>
            Add New Question
          </h2>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "16px" }}>
            Fill in the question and all 4 options, then click the row to mark the correct answer.
          </p>

          <form onSubmit={handleAddQuestion} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Question Text</label>
              <textarea placeholder="e.g. What is the capital of Pakistan?"
                value={questionText} onChange={e => setQuestionText(e.target.value)}
                rows={2} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div>
              <label style={labelStyle}>
                Options — <span style={{ color: "#103d25", fontWeight: 700 }}>click a row to mark it correct</span>
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                {options.map((opt, i) => {
                  const isSelected = correctOption === i;
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "10px 14px", borderRadius: "8px", cursor: "pointer",
                      border:      isSelected ? "2px solid #103d25" : "1.5px solid #e5e7eb",
                      background:  isSelected ? "#f0f7f3" : "#fafafa",
                    }} onClick={() => setCorrectOption(i)}>
                      <div style={{
                        width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                        border:     isSelected ? "6px solid #103d25" : "2px solid #d1d5db",
                        background: "#fff",
                      }} />
                      <span style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? "#103d25" : "#6b7280", minWidth: "20px" }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <input type="text" placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        value={opt}
                        onChange={e => { e.stopPropagation(); updateOption(i, e.target.value); }}
                        onClick={e => e.stopPropagation()}
                        style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a" }} />
                      {isSelected && (
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 8px", borderRadius: "20px", whiteSpace: "nowrap" }}>
                          ✓ Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              {correctOption === null && (
                <p style={{ color: "#d97706", fontSize: "12.5px", marginTop: "8px" }}>
                  ⚠ Click on an option row to mark it as the correct answer
                </p>
              )}
            </div>

            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", fontSize: "13px" }}>{error}</div>}

            <button type="submit" disabled={saving} style={{
              alignSelf: "flex-start", background: "#103d25", color: "#fff",
              border: "none", padding: "11px 24px", borderRadius: "8px",
              fontSize: "14px", fontWeight: 600, cursor: "pointer",
              opacity: saving ? 0.6 : 1, fontFamily: "'DM Sans', sans-serif",
            }}>
              {saving ? "Adding..." : "Add Question"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const pageWrap   = { minHeight: "100vh", background: "#faf7f0", paddingTop: "100px", paddingBottom: "60px", fontFamily: "'DM Sans', sans-serif" };
const backBtn    = { background: "none", border: "none", color: "#103d25", fontWeight: 600, fontSize: "13px", cursor: "pointer", marginBottom: "20px", padding: 0, fontFamily: "'DM Sans', sans-serif" };
const labelStyle = { display: "block", fontSize: "12.5px", fontWeight: 600, color: "#374151", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" };