import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../library/supabase";

/**
 * Form to create a new quiz. On success, navigates to the
 * Question Editor for the newly created quiz.
 */
export default function QuizForm({ navigate, onCreated }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setCreating(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("quizzes")
      .insert({
        teacher_id: user.id,
        title: title.trim(),
        description: description.trim(),
      })
      .select()
      .single();

    setCreating(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setTitle("");
    setDescription("");

    if (onCreated) onCreated(data);
    if (navigate) navigate(`teacher-quiz-edit/${data.id}`);
  }

  return (
    <div style={{
      background: "#fff", borderRadius: "12px", padding: "24px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      border: "1px solid #eee", fontFamily: "'DM Sans', sans-serif",
    }}>
      <h2 style={{ fontSize: "18px", color: "#103d25", marginBottom: "16px", fontWeight: 600 }}>
        Create New Quiz
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={labelStyle}>Quiz Title</label>
          <input
            type="text"
            placeholder="e.g. Chapter 1 — Algebra Basics"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Description (optional)</label>
          <textarea
            placeholder="Brief description or instructions for students..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={creating}
          style={{
            alignSelf: "flex-start", background: "#103d25", color: "#fff",
            border: "none", padding: "10px 22px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600, cursor: "pointer",
            opacity: creating ? 0.6 : 1,
          }}
        >
          {creating ? "Creating..." : "Create & Add Questions"}
        </button>
      </form>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: "12.5px", fontWeight: 600,
  color: "#374151", marginBottom: "6px",
};

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: "8px",
  border: "1px solid #ddd", fontSize: "14px", fontFamily: "inherit",
};