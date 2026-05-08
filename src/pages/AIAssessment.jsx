import PageLayout from "../components/PageLayout";

export default function AIAssessment({ navigate }) {
  return (
    <PageLayout navigate={navigate} icon="📝" title="AI Assessment" breadcrumb="AI Tutor → AI Assessment">
      <div style={{ animation: "fadeUp 0.45s ease" }}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {/* Banner */}
        <div style={{
          background: "linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",
          borderRadius: "18px", padding: "44px 40px", marginBottom: "36px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 12px 40px rgba(16,61,37,0.25)",
          textAlign: "center",
        }}>
          <div style={{ position:"absolute",top:"-40px",right:"-40px",width:"180px",height:"180px",borderRadius:"50%",background:"rgba(201,168,76,0.1)",pointerEvents:"none" }} />
          <div style={{ fontSize: "52px", marginBottom: "14px" }}>📝</div>
          <div style={{
            display: "inline-block", background: "rgba(201,168,76,0.2)",
            border: "1px solid #c9a84c", color: "#e8c97a",
            padding: "4px 14px", borderRadius: "20px",
            fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "16px",
          }}>AI Tutor → AI Assessment</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,3vw,30px)", color: "#fff", marginBottom: "12px" }}>
            AI-Powered Assessment
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.72)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            This page will feature AI-generated quizzes, personalised practice tests, and instant feedback on your answers — coming soon!
          </p>
        </div>

        {/* Feature preview cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "18px", marginBottom: "36px" }}>
          {[
            { icon: "🎯", title: "Personalised Quizzes",  desc: "AI generates questions based on your weak areas and study level." },
            { icon: "⚡", title: "Instant Feedback",       desc: "Get detailed explanations for every right and wrong answer immediately." },
            { icon: "📊", title: "Progress Tracking",      desc: "Track your improvement over time with visual performance reports." },
            { icon: "🔁", title: "Adaptive Learning",      desc: "Questions get harder as you improve — keeping you challenged." },
          ].map((c, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "14px", padding: "26px 22px",
              border: "1px solid #e9ecef", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              animation: `fadeUp 0.4s ease ${i*0.08}s both`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{c.icon}</div>
              <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px", color: "#103d25", marginBottom: "8px" }}>{c.title}</h4>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13.5px", color: "#6b7280", lineHeight: 1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA to existing Assessments */}
        <div style={{
          background: "linear-gradient(135deg,#faf3e0,#fff8e8)",
          border: "1.5px solid #e8c97a", borderRadius: "16px",
          padding: "32px 36px", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "20px",
        }}>
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "19px", color: "#103d25", marginBottom: "6px" }}>
              Try Our Existing Quiz System
            </h4>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13.5px", color: "#6b7280" }}>
              15 questions per programme with a timer, instant results, and full answer review.
            </p>
          </div>
          <button onClick={() => navigate("assessments")} style={{
            background: "#103d25", color: "#fff", border: "none",
            padding: "12px 26px", borderRadius: "8px",
            fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 700,
            cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#1a5c38"}
          onMouseLeave={e => e.currentTarget.style.background = "#103d25"}
          >Go to Assessments →</button>
        </div>
      </div>
    </PageLayout>
  );
}