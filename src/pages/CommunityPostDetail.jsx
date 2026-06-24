import { useEffect, useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { useCommunityIdentity } from "../context/CommunityIdentity";
import CommunityGate from "../components/community/CommunityGate";

const TYPE_STYLES = {
  announcement: { bg: "#fef9e7", border: "#e8c97a", label: "📢 Announcement", color: "#92722a" },
  question:     { bg: "#eef2ff", border: "#a5b4fc", label: "❓ Question",     color: "#3730a3" },
  notice:       { bg: "#f0fdf4", border: "#86efac", label: "📌 Notice",       color: "#166534" },
};
const ROLE_LABEL = { principal: "🛡️ Principal", teacher: "🧑‍🏫 Teacher", student: "🎓 Student" };

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString(undefined, {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function CommunityPostDetail({ quizId: postId, navigate }) {
  // Prop is named quizId to match the generic `param` convention used by
  // App.jsx's router for all detail pages (see integration guide).
  const {
    fetchPostById, fetchComments, addComment, deleteComment,
    updatePost, togglePin, deletePost,
    fetchReactionState, toggleReaction,
    currentAuthor,
  } = useCommunity();
  const { isUnlocked } = useCommunityIdentity();

  const [post, setPost]         = useState(null);
  const [comments, setComments] = useState([]);
  const [reaction, setReaction] = useState({ count: 0, userReacted: false });
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [posting, setPosting]   = useState(false);
  const [actionError, setActionError] = useState("");

  const [editing, setEditing]   = useState(false);
  const [editTitle, setEditTitle]     = useState("");
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving]     = useState(false);

  const author = currentAuthor();
  // "canModerate" covers pin/unpin and deleting any COMMENT — both Teacher
  // and Principal keep these. Deleting any POST is Principal-only, per spec.
  const canModerate = author && (author.role === "teacher" || author.role === "principal");
  const canDeleteAnyPost = author && author.role === "principal";
  const isOwnPost = author && post && author.id === post.author_id;
  const canDeletePost = canDeleteAnyPost || isOwnPost;

  async function loadAll() {
    setLoading(true);
    const p = await fetchPostById(postId);
    if (!p) { setNotFound(true); setLoading(false); return; }
    setPost(p);
    const [c, r] = await Promise.all([
      fetchComments(postId),
      fetchReactionState(postId),
    ]);
    setComments(c);
    setReaction(r);
    setLoading(false);
  }

  useEffect(() => {
    if (isUnlocked) loadAll();
    /* eslint-disable-next-line */
  }, [postId, isUnlocked]);

  if (!isUnlocked) {
    return <CommunityGate onUnlocked={() => loadAll()} />;
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setPosting(true);
    const { data, error } = await addComment(postId, newComment);
    setPosting(false);
    if (error) { setActionError(error); return; }
    setComments(prev => [...prev, data]);
    setNewComment("");
  }

  async function handleDeleteComment(commentId) {
    if (!window.confirm("Delete this comment?")) return;
    const result = await deleteComment(commentId);
    if (result.error) { setActionError(result.error); return; }
    setComments(prev => prev.filter(c => c.id !== commentId));
  }

  async function handleToggleReaction() {
    const result = await toggleReaction(postId, reaction.userReacted);
    if (result.error) { setActionError(result.error); return; }
    setReaction(r => ({ count: r.count + (result.reacted ? 1 : -1), userReacted: result.reacted }));
  }

  async function handleTogglePin() {
    const result = await togglePin(postId, !post.is_pinned);
    if (result.error) { setActionError(result.error); return; }
    setPost(result.data);
  }

  function startEditing() {
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditing(true);
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) return;
    setSaving(true);
    const result = await updatePost(postId, { title: editTitle.trim(), content: editContent.trim() });
    setSaving(false);
    if (result.error) { setActionError(result.error); return; }
    setPost(result.data);
    setEditing(false);
  }

  async function handleDelete() {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    const result = await deletePost(postId, post.author_id);
    if (result.error) { setActionError(result.error); return; }
    navigate("community");
  }

  if (loading) {
    return <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}>Loading…</div>;
  }

  if (notFound) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <p style={{ color: "#6b7280", marginBottom: "16px" }}>This post doesn't exist or was removed.</p>
        <button onClick={() => navigate("community")} style={{ color: "#103d25", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
          ← Back to Community Board
        </button>
      </div>
    );
  }

  const style = TYPE_STYLES[post.type] || TYPE_STYLES.notice;

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 80px", fontFamily: "'DM Sans', sans-serif" }}>

      <button onClick={() => navigate("community")} style={{
        background: "none", border: "none", color: "#6b7280", fontSize: "14px",
        cursor: "pointer", marginBottom: "20px", padding: 0,
      }}>
        ← Back to Community Board
      </button>

      {actionError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "10px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "13.5px" }}>
          {actionError}
        </div>
      )}

      {/* Post */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "26px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            {post.is_pinned && <span style={{ fontSize: "12px", fontWeight: 700, color: "#92722a" }}>📌 PINNED</span>}
            <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
              {style.label}
            </span>
          </div>

          {!editing && (canModerate || isOwnPost) && (
            <div style={{ display: "flex", gap: "8px" }}>
              {isOwnPost && (
                <button onClick={startEditing} style={{
                  fontSize: "12.5px", fontWeight: 600, color: "#374151", background: "#f3f4f6",
                  border: "1px solid #e5e7eb", borderRadius: "6px", padding: "5px 10px", cursor: "pointer",
                }}>
                  Edit
                </button>
              )}
              {canModerate && (
                <button onClick={handleTogglePin} style={{
                  fontSize: "12.5px", fontWeight: 600, color: "#92722a", background: "#fef9e7",
                  border: "1px solid #e8c97a", borderRadius: "6px", padding: "5px 10px", cursor: "pointer",
                }}>
                  {post.is_pinned ? "Unpin" : "Pin"}
                </button>
              )}
              {canDeletePost && (
                <button onClick={handleDelete} style={{
                  fontSize: "12.5px", fontWeight: 600, color: "#991b1b", background: "#fef2f2",
                  border: "1px solid #fecaca", borderRadius: "6px", padding: "5px 10px", cursor: "pointer",
                }}>
                  Delete
                </button>
              )}
            </div>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSaveEdit}>
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              maxLength={150}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "9px", border: "1px solid #d1d5db",
                fontFamily: "'Playfair Display', serif", fontSize: "18px", marginBottom: "12px",
              }}
            />
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              rows={6}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "9px", border: "1px solid #d1d5db",
                fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", resize: "vertical", marginBottom: "14px",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" disabled={saving} style={{
                background: "#103d25", color: "#fff", border: "none", borderRadius: "8px",
                padding: "9px 18px", fontWeight: 700, fontSize: "13.5px", cursor: "pointer",
                opacity: saving ? 0.7 : 1,
              }}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button type="button" onClick={() => setEditing(false)} style={{
                background: "#fff", color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: "8px",
                padding: "9px 18px", fontWeight: 600, fontSize: "13.5px", cursor: "pointer",
              }}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#111827", marginBottom: "10px", lineHeight: 1.3 }}>
              {post.title}
            </h1>
            <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: "18px" }}>
              {post.content}
            </p>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            {ROLE_LABEL[post.author_role] || post.author_role} · {post.author_name} · {formatDate(post.created_at)}
            {post.updated_at && post.updated_at !== post.created_at && " · edited"}
          </span>

          <button onClick={handleToggleReaction} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: reaction.userReacted ? "#fdf2f8" : "#f9fafb",
            border: `1px solid ${reaction.userReacted ? "#f9a8d4" : "#e5e7eb"}`,
            borderRadius: "20px", padding: "6px 14px", cursor: "pointer",
            fontSize: "13.5px", fontWeight: 600,
            color: reaction.userReacted ? "#be185d" : "#6b7280",
          }}>
            {reaction.userReacted ? "❤️" : "🤍"} Helpful · {reaction.count}
          </button>
        </div>
      </div>

      {/* Comments */}
      <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "14px" }}>
        Comments ({comments.length})
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {comments.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>No comments yet. Start the discussion below.</p>
        )}
        {comments.map(c => {
          const ownComment = author && author.id === c.author_id;
          return (
            <div key={c.id} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                  {ROLE_LABEL[c.author_role] || c.author_role} · {c.author_name}
                </span>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>{formatDate(c.created_at)}</span>
                  {(ownComment || canModerate) && (
                    <button onClick={() => handleDeleteComment(c.id)} style={{
                      background: "none", border: "none", color: "#9ca3af", fontSize: "12px",
                      cursor: "pointer", textDecoration: "underline",
                    }}>
                      delete
                    </button>
                  )}
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{c.content}</p>
            </div>
          );
        })}
      </div>

      {/* Add comment */}
      <form onSubmit={handleAddComment} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Write a comment…"
          rows={2}
          style={{
            flex: 1, padding: "10px 14px", borderRadius: "10px", border: "1px solid #d1d5db",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", resize: "vertical",
          }}
        />
        <button type="submit" disabled={posting || !newComment.trim()} style={{
          background: "#103d25", color: "#fff", border: "none", borderRadius: "10px",
          padding: "10px 18px", fontWeight: 600, fontSize: "14px",
          cursor: posting ? "default" : "pointer", opacity: posting || !newComment.trim() ? 0.6 : 1,
          whiteSpace: "nowrap",
        }}>
          {posting ? "Posting…" : "Post"}
        </button>
      </form>
    </div>
  );
}