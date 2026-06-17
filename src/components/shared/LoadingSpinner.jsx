export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "14px",
      minHeight: "300px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{
        width: "40px", height: "40px", borderRadius: "50%",
        border: "4px solid #e5e7eb", borderTopColor: "#103d25",
        animation: "spin 0.8s linear infinite",
      }} />
      <div style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}