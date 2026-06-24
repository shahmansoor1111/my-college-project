const TYPE_STYLES = {
  announcement: { bg: "#fef9e7", border: "#e8c97a", label: "📢 Announcement", color: "#92722a" },
  question:     { bg: "#eef2ff", border: "#a5b4fc", label: "❓ Question",     color: "#3730a3" },
  notice:       { bg: "#f0fdf4", border: "#86efac", label: "📌 Notice",       color: "#166534" },
};

const ROLE_LABEL = { principal: "🛡️ Principal", teacher: "🧑‍🏫 Teacher", student: "🎓 Student" };

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function PostCard({ post, navigate }) {
  const style = TYPE_STYLES[post.type] || TYPE_STYLES.notice;

  return (
    <button
      onClick={() => navigate(`community-post/${post.id}`)}
      style={{
        display: "block", width: "100%", textAlign: "left",
        background: "#fff", border: `1px solid ${post.is_pinned ? "#c9a84c" : "#e5e7eb"}`,
        borderRadius: "12px", padding: "18px 20px", cursor: "pointer",
        boxShadow: post.is_pinned ? "0 2px 10px rgba(201,168,76,0.15)" : "0 1px 3px rgba(0,0,0,0.04)",
        fontFamily: "'DM Sans', sans-serif", transition: "transform 0.12s, box-shadow 0.12s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = post.is_pinned ? "0 2px 10px rgba(201,168,76,0.15)" : "0 1px 3px rgba(0,0,0,0.04)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "10px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          {post.is_pinned && (
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#92722a" }}>📌 PINNED</span>
          )}
          <span style={{
            fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px",
            background: style.bg, color: style.color, border: `1px solid ${style.border}`,
          }}>
            {style.label}
          </span>
        </div>
        <span style={{ fontSize: "12.5px", color: "#9ca3af", whiteSpace: "nowrap" }}>{timeAgo(post.created_at)}</span>
      </div>

      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "6px", lineHeight: 1.3 }}>
        {post.title}
      </h3>

      <p style={{
        fontSize: "14px", color: "#6b7280", lineHeight: 1.5, marginBottom: "12px",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {post.content}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#9ca3af" }}>
        <span>{ROLE_LABEL[post.author_role] || post.author_role} · {post.author_name}</span>
        <span>💬 {post.comment_count ?? 0} {post.comment_count === 1 ? "comment" : "comments"}</span>
      </div>
    </button>
  );
}