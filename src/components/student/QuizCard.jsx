/**
 * Reusable card for displaying a quiz to a student.
 * Used for both "available" (Take Quiz) and "completed" (View Results) states.
 *
 * Props:
 * - quiz: { id, title, description, questions: [...] }
 * - mode: "available" | "completed"
 * - submission: { score, total_marks } (only needed when mode === "completed")
 * - onAction: () => void  (called when the button is clicked)
 */
export default function QuizCard({ quiz, mode = "available", submission, onAction }) {
  const isCompleted = mode === "completed";

  return (
    <div style={{
      background: "#fff", borderRadius: "10px", padding: "18px 20px",
      border: "1px solid #eee", display: "flex",
      justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "10px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <div>
        <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "15px" }}>
          {quiz.title}
        </div>

        {isCompleted ? (
          <div style={{ fontSize: "12.5px", color: "#9ca3af", marginTop: "4px" }}>
            Score: <strong style={{ color: "#103d25" }}>{submission?.score} / {submission?.total_marks}</strong>
          </div>
        ) : (
          <>
            <div style={{ fontSize: "12.5px", color: "#9ca3af", marginTop: "4px" }}>
              {quiz.questions?.length || 0} question(s)
            </div>
            {quiz.description && (
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                {quiz.description}
              </div>
            )}
          </>
        )}
      </div>

      <button
        onClick={onAction}
        style={{
          background: isCompleted ? "#c9a84c" : "#103d25",
          color: isCompleted ? "#103d25" : "#fff",
          border: "none", padding: "9px 20px", borderRadius: "8px",
          fontSize: "13px", fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
        }}
      >
        {isCompleted ? "View Results" : "Take Quiz"}
      </button>
    </div>
  );
}