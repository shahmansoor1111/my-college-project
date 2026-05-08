import Footer from "./Footer";

export default function PageLayout({ children, navigate }) {
  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "#faf7f0" }}>
    

      {/* Content */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "56px 32px" }}>
        {children}
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
