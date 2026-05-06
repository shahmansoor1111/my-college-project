import Footer from "./Footer";

export default function PageLayout({ icon, title, breadcrumb, children, navigate }) {
  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "#faf7f0" }}>
      {/* Page Hero */}
      <div style={{
        background: "linear-gradient(135deg, #103d25 0%, #1a5c38 60%, #2a7a4e 100%)",
        padding: "60px 48px 50px",
        borderBottom: "3px solid #c9a84c",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(201,168,76,0.08)", pointerEvents: "none",
        }} />
        {breadcrumb && (
          <div style={{
            fontSize: "12px", color: "#a8d5be", letterSpacing: "1px",
            textTransform: "uppercase", marginBottom: "12px",
            fontFamily: "'DM Sans',sans-serif",
          }}>
            {breadcrumb}
          </div>
        )}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 5vw, 44px)",
          color: "#fff", display: "flex", alignItems: "center", gap: "14px",
          flexWrap: "wrap",
        }}>
          {icon && <span>{icon}</span>}
          {title}
        </h1>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "56px 32px" }}>
        {children}
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
