import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../library/supabase";
import LoadingSpinner from "../shared/LoadingSpinner";

/**
 * Lists all quizzes created by the logged-in teacher,
 * with options to edit questions, view submissions, publish/unpublish, delete.
 */
export default function QuizList({ navigate }) {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchQuizzes();
  }, [user]);

  async function fetchQuizzes() {
    setLoading(true);
    const { data, error } = await supabase
      .from("quizzes")
      .select("*, questions(id), submissions(id)")
      .eq("teacher_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setQuizzes(data || []);
    setLoading(false);
  }

  async function togglePublish(quiz) {
    const { error } = await supabase
      .from("quizzes")
      .update({ is_published: !quiz.is_published })
      .eq("id", quiz.id);

    if (!error) {
      setQuizzes(prev =>
        prev.map(q => (q.id === quiz.id ? { ...q, is_published: !q.is_published } : q))
      );
    }
  }

  async function deleteQuiz(quizId) {
    if (!confirm("Delete this quiz and all its questions/submissions? This cannot be undone.")) return;
    const { error } = await supabase.from("quizzes").delete().eq("id", quizId);
    if (!error) setQuizzes(prev => prev.filter(q => q.id !== quizId));
    else alert(error.message);
  }

  if (loading) return <LoadingSpinner label="Loading your quizzes..." />;

  if (quizzes.length === 0) {
    return (
      <p style={{ color: "#6b7280", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
        No quizzes yet. Create one above to get started.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {quizzes.map(quiz => (
        <div key={quiz.id} style={{
          background: "#fff", borderRadius: "10px", padding: "18px 20px",
          border: "1px solid #eee", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "10px", fontFamily: "'DM Sans', sans-serif",
        }}>
          <div>
            <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "15px" }}>
              {quiz.title}
            </div>
            <div style={{ fontSize: "12.5px", color: "#9ca3af", marginTop: "4px" }}>
              {quiz.questions?.length || 0} question(s) · {quiz.submissions?.length || 0} submission(s) ·{" "}
              <span style={{ color: quiz.is_published ? "#16a34a" : "#d97706", fontWeight: 600 }}>
                {quiz.is_published ? "Published" : "Draft"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={() => navigate(`teacher-quiz-edit/${quiz.id}`)} style={btnStyle("#103d25", "#fff")}>
              Edit Questions
            </button>
            <button onClick={() => navigate(`teacher-quiz-submissions/${quiz.id}`)} style={btnStyle("#c9a84c", "#103d25")}>
              Submissions
            </button>
            <button onClick={() => togglePublish(quiz)} style={btnStyle(quiz.is_published ? "#9ca3af" : "#16a34a", "#fff")}>
              {quiz.is_published ? "Unpublish" : "Publish"}
            </button>
            <button onClick={() => deleteQuiz(quiz.id)} style={btnStyle("#fff", "#dc2626", "1px solid #dc2626")}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function btnStyle(bg, color, border = "none") {
  return {
    background: bg, color, border, padding: "8px 14px",
    borderRadius: "7px", fontSize: "13px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  };
}