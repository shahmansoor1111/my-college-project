import { useEffect, useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { useCommunityIdentity } from "../context/CommunityIdentity";
import CommunityGate from "../components/community/CommunityGate";
import PostCard from "../components/community/PostCard";

const TYPE_FILTERS = [
  { key: "all",          label: "All" },
  { key: "announcement", label: "📢 Announcements" },
  { key: "question",     label: "❓ Questions" },
  { key: "notice",       label: "📌 Notices" },
];

export default function Community({ navigate }) {
  const { posts, loading, error, fetchPosts } = useCommunity();
  const { identity, isUnlocked, roleMeta, leaveCommunity, markCommunitySeen } = useCommunityIdentity();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isUnlocked) {
      fetchPosts();
      markCommunitySeen(); // viewing the board clears the navbar badge
    }
  }, [isUnlocked, fetchPosts, markCommunitySeen]);

  if (!isUnlocked) {
    return <CommunityGate onUnlocked={() => fetchPosts()} />;
  }

  const visiblePosts = filter === "all" ? posts : posts.filter(p => p.type === filter);

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "32px 24px 80px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#103d25", marginBottom: "6px" }}>
            Community Board
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Announcements, questions, and notices for the whole college.
          </p>
        </div>

        <button
          onClick={() => navigate("create-post")}
          style={{
            background: "#c9a84c", color: "#103d25", border: "none",
            padding: "12px 22px", borderRadius: "8px", fontWeight: 700,
            fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(201,168,76,0.35)",
          }}
        >
          + Create Post
        </button>
      </div>

      {/* Identity strip */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#f9fafb", border: "1px solid #f0f0f0", borderRadius: "10px",
        padding: "10px 16px", marginBottom: "22px", fontSize: "13.5px",
      }}>
        <span style={{ color: "#374151" }}>
          Viewing as <strong style={{ color: roleMeta?.color }}>{roleMeta?.label}</strong> · {identity.name}
        </span>
        <button onClick={leaveCommunity} style={{
          background: "none", border: "none", color: "#9ca3af", fontSize: "13px",
          cursor: "pointer", textDecoration: "underline",
        }}>
          Switch role
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {TYPE_FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "8px 16px", borderRadius: "20px", fontSize: "13.5px",
              fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              border: filter === f.key ? "1.5px solid #103d25" : "1.5px solid #e5e7eb",
              background: filter === f.key ? "#103d25" : "#fff",
              color: filter === f.key ? "#fff" : "#374151",
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>Loading posts…</div>
      )}

      {error && !loading && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b",
          padding: "14px 18px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px",
        }}>
          Couldn't load posts: {error}
        </div>
      )}

      {!loading && !error && visiblePosts.length === 0 && (
        <div style={{
          textAlign: "center", padding: "60px 20px", color: "#9ca3af",
          background: "#fff", borderRadius: "12px", border: "1px dashed #e5e7eb",
        }}>
          No posts yet{filter !== "all" ? " in this category" : ""}. Be the first to post!
        </div>
      )}

      {/* Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {visiblePosts.map(post => (
          <PostCard key={post.id} post={post} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}