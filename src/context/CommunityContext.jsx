import { createContext, useContext, useState, useCallback } from "react";
import { supabase } from "../library/supabase";
import { useCommunityIdentity } from "./CommunityIdentity";

const CommunityContext = createContext(null);

export function CommunityProvider({ children }) {
  const { identity } = useCommunityIdentity(); // { role, name } | null
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // There's no real account/id here — just a role typed in at the gate plus
  // a self-reported name. We use "name::role" as a stable-enough identifier
  // for "is this my own post" checks within a session. It's not a security
  // boundary (anyone can type the same name), just an ownership convenience.
  function currentAuthor() {
    if (!identity) return null;
    return {
      id: `${identity.name.toLowerCase()}::${identity.role}`,
      name: identity.name,
      role: identity.role, // 'principal' | 'teacher' | 'student'
    };
  }

  // ---------- POSTS ----------

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("posts")
      .select("*, comments(count)")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return [];
    }
    const withCounts = (data || []).map(p => ({
      ...p,
      comment_count: p.comments?.[0]?.count ?? 0,
    }));
    setPosts(withCounts);
    setLoading(false);
    return withCounts;
  }, []);

  const fetchPostById = useCallback(async (id) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      setError(error.message);
      return null;
    }
    return data;
  }, []);

  // Count of posts created after `sinceDate`, for the navbar badge.
  // sinceDate may be null (nobody has ever viewed Community in this tab) —
  // in that case we count ALL posts, since everything is "new" to them.
  const fetchUnseenCount = useCallback(async (sinceDate) => {
    let query = supabase
      .from("posts")
      .select("*", { count: "exact", head: true });
    if (sinceDate) {
      query = query.gt("created_at", sinceDate.toISOString());
    }
    const { count, error } = await query;
    if (error) return 0;
    return count ?? 0;
  }, []);

  async function createPost({ type, title, content }) {
    const author = currentAuthor();
    if (!author) return { error: "Please enter the Community Board first." };

    const { data, error } = await supabase
      .from("posts")
      .insert({
        type,
        title,
        content,
        author_id: author.id,
        author_name: author.name,
        author_role: author.role,
      })
      .select()
      .single();

    if (error) return { error: error.message };
    return { data };
  }

  async function updatePost(postId, { title, content }) {
    const author = currentAuthor();
    if (!author) return { error: "Please enter the Community Board first." };

    const { data, error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", postId)
      .select()
      .single();

    if (error) return { error: error.message };
    return { data };
  }

  async function togglePin(postId, nextPinned) {
    const author = currentAuthor();
    // Only principal/teacher can pin — enforced here in app logic.
    if (!author || author.role === "student") {
      return { error: "Only teachers or the principal can pin posts." };
    }
    const { data, error } = await supabase
      .from("posts")
      .update({ is_pinned: nextPinned })
      .eq("id", postId)
      .select()
      .single();
    if (error) return { error: error.message };
    return { data };
  }

  async function deletePost(postId, postAuthorId) {
    const author = currentAuthor();
    if (!author) return { error: "Please enter the Community Board first." };

    const isOwn = postAuthorId && author.id === postAuthorId;
    const isPrincipal = author.role === "principal";
    if (!isOwn && !isPrincipal) {
      return { error: "Only the principal can delete another person's post." };
    }

    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) return { error: error.message };
    return { success: true };
  }

  // ---------- COMMENTS ----------

  async function fetchComments(postId) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) {
      setError(error.message);
      return [];
    }
    return data || [];
  }

  async function addComment(postId, content) {
    const author = currentAuthor();
    if (!author) return { error: "Please enter the Community Board first." };
    if (!content?.trim()) return { error: "Comment can't be empty." };

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        content: content.trim(),
        author_id: author.id,
        author_name: author.name,
        author_role: author.role,
      })
      .select()
      .single();

    if (error) return { error: error.message };
    return { data };
  }

  async function deleteComment(commentId) {
    const author = currentAuthor();
    if (!author) return { error: "Please enter the Community Board first." };
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (error) return { error: error.message };
    return { success: true };
  }

  // ---------- REACTIONS (like / helpful) ----------

  async function fetchReactionState(postId) {
    const author = currentAuthor();
    const { count } = await supabase
      .from("reactions")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    let userReacted = false;
    if (author) {
      const { data } = await supabase
        .from("reactions")
        .select("id")
        .eq("post_id", postId)
        .eq("author_id", author.id)
        .maybeSingle();
      userReacted = !!data;
    }
    return { count: count ?? 0, userReacted };
  }

  async function toggleReaction(postId, currentlyReacted) {
    const author = currentAuthor();
    if (!author) return { error: "Please enter the Community Board first." };

    if (currentlyReacted) {
      const { error } = await supabase
        .from("reactions")
        .delete()
        .eq("post_id", postId)
        .eq("author_id", author.id);
      if (error) return { error: error.message };
      return { reacted: false };
    } else {
      const { error } = await supabase
        .from("reactions")
        .insert({ post_id: postId, author_id: author.id, author_role: author.role });
      if (error) return { error: error.message };
      return { reacted: true };
    }
  }

  return (
    <CommunityContext.Provider value={{
      posts, loading, error,
      currentAuthor,
      fetchPosts, fetchPostById, fetchUnseenCount, createPost, updatePost, togglePin, deletePost,
      fetchComments, addComment, deleteComment,
      fetchReactionState, toggleReaction,
    }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
}