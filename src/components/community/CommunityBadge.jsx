import { useCommunityCount } from "../../context/CommunityCount";

const MAX_BADGE = 99; // shows "99+" beyond this, keeps the navbar tidy

// Desktop variant: small red dot pinned to the top-right corner of its
// parent. Parent button MUST have position: relative for this to land
// correctly (see BADGE_INTEGRATION.md).
export default function CommunityBadge() {
  const { count } = useCommunityCount();
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
// inline next to the label inside a flex row that already has room.
export function CommunityBadgeNumber() {
  const { count } = useCommunityCount();
  if (count <= 0) return null;
  return <>{count > MAX_BADGE ? `${MAX_BADGE}+` : count}</>;
}