import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../library/supabase";

const CommunityCountContext = createContext(null);

// This is the TOTAL number of posts that currently exist (announcements +
// notices + questions combined) — not "unread" or "new since you looked."
// It goes up the instant anyone creates a post, and down the instant any
// post is deleted, on every page, for every visitor, with no polling and
// no manual refresh — powered by Supabase Realtime.
//
// Requires Realtime to be turned on for the `posts` table in Supabase:
// Dashboard → Database → Replication → toggle "posts" on (or run the SQL
// in REALTIME_SETUP.md). Without that toggle, the initial count still
// loads correctly, but it won't update live — INSERT/DELETE events just
// won't arrive until you enable it.
export function CommunityCountProvider({ children }) {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialCount() {
      const { count: total, error } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true });
      if (!cancelled) {
        if (!error) setCount(total ?? 0);
        setReady(true);
      }
    }
    loadInitialCount();

    // Subscribe to every insert/delete on `posts`, anywhere in the app,
    // for as long as this provider is mounted (i.e. the whole app lifetime).
    const channel = supabase
      .channel("posts-count-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "posts" }, () => {
        setCount(c => c + 1);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "posts" }, () => {
        setCount(c => Math.max(0, c - 1));
      })
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <CommunityCountContext.Provider value={{ count, ready }}>
      {children}
    </CommunityCountContext.Provider>
  );
}

export function useCommunityCount() {
  const ctx = useContext(CommunityCountContext);
  if (!ctx) throw new Error("useCommunityCount must be used within CommunityCountProvider");
  return ctx;
}