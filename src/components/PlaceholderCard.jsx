export default function PlaceholderCard({ icon, title, description, children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "18px",
      border: "2px dashed #d1d5db",
      padding: "72px 40px", textAlign: "center",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    }}>
      {icon && <div style={{ fontSize: "60px", marginBottom: "20px" }}>{icon}</div>}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(20px,3vw,28px)", color: "#103d25", marginBottom: "14px",
      }}>{title}</h2>
      {description && (
        <p style={{
          fontSize: "15px", color: "#6b7280", maxWidth: "500px",
          margin: "0 auto", lineHeight: 1.75,
          fontFamily: "'DM Sans',sans-serif",
        }}>{description}</p>
      )}
      {children}
    </div>
  );
}
