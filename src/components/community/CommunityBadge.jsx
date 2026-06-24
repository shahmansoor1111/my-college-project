import { useEffect, useState, useRef } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { useCommunityIdentity } from "../../context/CommunityIdentity";

const POLL_INTERVAL_MS = 25000;
const MAX_BADGE = 9; // shows "9+" beyond this, keeps the navbar tidy

// Shared polling logic used by both badge variants below.
function useUnseenCount() {
  const { fetchUnseenCount } = useCommunity();
  const { lastSeenAt } = useCommunityIdentity();
  const [count, setCount] = useState(0);
  const lastSeenRef = useRef(lastSeenAt);
  lastSeenRef.current = lastSeenAt; // always read the freshest value inside the interval closure

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      const n = await fetchUnseenCount(lastSeenRef.current);
      if (!cancelled) setCount(n);
    }

    poll(); // immediately on mount/identity-change, then every interval
    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, [fetchUnseenCount, lastSeenAt]);

  return count;
}

// Desktop variant: small red dot pinned to the top-right corner of its
// parent. Parent button MUST have position: relative for this to land
// correctly (see BADGE_INTEGRATION.md).
export default function CommunityBadge() {
  const count = useUnseenCount();
  if (count <= 0) return null;

  return (
    <span style={{
      position: "absolute", top: "-6px", right: "-8px",
      minWidth: "18px", height: "18px", padding: "0 4px",
      borderRadius: "9px", background: "#dc2626", color: "#fff",
      fontSize: "11px", fontWeight: 700, lineHeight: "18px",
      textAlign: "center", display: "inline-block",
      border: "2px solid #103d25", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      pointerEvents: "none",
    }}>
      {count > MAX_BADGE ? `${MAX_BADGE}+` : count}
    </span>
  );
}

// Mobile variant: just the number, no absolute positioning — meant to sit
// inline next to the label inside a flex row that already has room (the
// mobile menu has full-width rows, unlike the cramped desktop nav pills).
export function CommunityBadgeNumber() {
  const count = useUnseenCount();
  if (count <= 0) return null;
  return <>{count > MAX_BADGE ? `${MAX_BADGE}+` : count}</>;
}