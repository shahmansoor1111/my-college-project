import { useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { useCommunityIdentity } from "../context/CommunityIdentity";
import CommunityGate from "../components/community/CommunityGate";

// Per the spec: Principal posts official notices/announcements. Teachers post
// announcements or questions. Students post questions only.
const TYPE_OPTIONS = [
  { key: "notice",       label: "📌 Notice",        hint: "Official instructions, holidays",        roles: ["principal"] },
  { key: "announcement", label: "📢 Announcement",  hint: "Updates, schedule changes",               roles: ["principal", "teacher"] },
  { key: "question",     label: "❓ Question",      hint: "Ask about a topic or assignment",         roles: ["principal", "teacher", "student"] },
];

export default function CreatePost({ navigate }) {
  const { createPost } = useCommunity();
  const { identity, isUnlocked, roleMeta } = useCommunityIdentity();

  if (!isUnlocked) {
    return <CommunityGate onUnlocked={() => {}} />;
  }

  const availableTypes = TYPE_OPTIONS.filter(t => t.roles.includes(identity.role));
  return <CreatePostForm navigate={navigate} createPost={createPost} availableTypes={availableTypes} roleMeta={roleMeta} identity={identity} />;
}

function CreatePostForm({ navigate, createPost, availableTypes, roleMeta, identity }) {
  const [type, setType]       = useState(availableTypes[0]?.key || "question");
  const [title, setTitle]     = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("Please fill in both the title and content.");
      return;
    }
    setSubmitting(true);
    const { data, error: err } = await createPost({ type, title: title.trim(), content: content.trim() });
    setSubmitting(false);
    if (err) { setError(err); return; }
    navigate(`community-post/${data.id}`);
  }

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px 80px", fontFamily: "'DM Sans', sans-serif" }}>
      <button onClick={() => navigate("community")} style={{
        background: "none", border: "none", color: "#6b7280", fontSize: "14px",
        cursor: "pointer", marginBottom: "20px", padding: 0,
      }}>
        ← Back to Community Board
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#103d25" }}>
          Create a Post
        </h1>
        <span style={{ fontSize: "13px", color: roleMeta?.color, fontWeight: 700 }}>
          {roleMeta?.label} · {identity.name}
        </span>
      </div>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "10px 16px", borderRadius: "8px", marginBottom: "18px", fontSize: "13.5px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>
          Post Type
        </label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "22px", flexWrap: "wrap" }}>
          {availableTypes.map(opt => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setType(opt.key)}
              style={{
                flex: "1 1 160px", textAlign: "left", padding: "12px 14px", borderRadius: "10px",
                border: type === opt.key ? "2px solid #103d25" : "1.5px solid #e5e7eb",
                background: type === opt.key ? "#f0f7f3" : "#fff", cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "3px" }}>{opt.label}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>{opt.hint}</div>
            </button>
          ))}
        </div>

        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>
          Title
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Tomorrow's quiz has been postponed"
          maxLength={150}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #d1d5db",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", marginBottom: "20px",
          }}
        />

        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>
          Content
        </label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write the details here…"
          rows={7}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #d1d5db",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", resize: "vertical", marginBottom: "24px",
          }}
        />

        <button type="submit" disabled={submitting} style={{
          background: "#c9a84c", color: "#103d25", border: "none", borderRadius: "10px",
          padding: "13px 26px", fontWeight: 700, fontSize: "14.5px",
          cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1,
        }}>
          {submitting ? "Posting…" : "Publish Post"}
        </button>
      </form>
    </div>
  );
}