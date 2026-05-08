import PageLayout from "../../components/PageLayout";

const VISION_PILLARS = [
  {
    icon: "🎓",
    title: "Academic Excellence",
    desc: "To cultivate a culture of intellectual rigor, critical thinking, and scholarly achievement that prepares students to excel in universities and professions across Pakistan and beyond.",
  },
  {
    icon: "🌱",
    title: "Holistic Development",
    desc: "To nurture not just academic talent but moral character, civic responsibility, and personal integrity — shaping well-rounded individuals who contribute positively to society.",
  },
  {
    icon: "🤝",
    title: "Inclusive Community",
    desc: "To build an environment where every student, regardless of background, has equal access to quality education, mentorship, and opportunities to realize their full potential.",
  },
  {
    icon: "💡",
    title: "Innovation & Progress",
    desc: "To embrace modern teaching methodologies, technology, and research that equip students with 21st-century skills in an ever-evolving world.",
  },
  {
    icon: "🏛️",
    title: "National Service",
    desc: "To produce graduates who are loyal, disciplined, and committed citizens dedicated to the development and prosperity of Pakistan.",
  },
  {
    icon: "🌍",
    title: "Global Perspective",
    desc: "To broaden students' horizons with a global outlook while remaining deeply rooted in Islamic values, Pakistani culture, and local heritage.",
  },
];

const CORE_VALUES = [
  { label: "Integrity", color: "#1a5c38" },
  { label: "Discipline", color: "#2a7a4e" },
  { label: "Excellence", color: "#c9a84c" },
  { label: "Respect", color: "#103d25" },
  { label: "Innovation", color: "#1a5c38" },
  { label: "Service", color: "#2a7a4e" },
];

export default function Vision({ navigate }) {
  return (
    <PageLayout icon="" title="">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vision-pillar {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 16px;
          padding: 32px 26px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          animation: fadeUp 0.5s ease both;
        }
        .vision-pillar:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(26,92,56,0.13);
          border-color: #c9a84c;
        }
        .core-value-tag {
          padding: 9px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          font-family: "DM Sans", sans-serif;
          letter-spacing: 0.4px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-block;
          cursor: default;
        }
        .core-value-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }
        @media (max-width: 640px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .vision-statement-box { padding: 32px 22px !important; }
          .cta-box { flex-direction: column !important; }
        }
      `}</style>

      {/* VISION STATEMENT */}
      <div className="vision-statement-box" style={{
        background: "linear-gradient(135deg, #103d25 0%, #1a5c38 60%, #2a7a4e 100%)",
        borderRadius: "20px",
        padding: "52px 48px",
        marginBottom: "52px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(16,61,37,0.3)",
      }}>
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(201,168,76,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-30px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(201,168,76,0.2)", border: "1px solid #c9a84c",
          color: "#e8c97a", padding: "5px 16px", borderRadius: "20px",
          fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "24px",
        }}>
          🎯 Our Vision Statement
        </div>

        <blockquote style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(18px, 3vw, 26px)",
          color: "#ffffff",
          lineHeight: 1.65,
          fontStyle: "italic",
          margin: "0 0 24px 0",
          textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          position: "relative", zIndex: 1,
        }}>
          "To be a leading centre of academic excellence in Pakistan — empowering young men with knowledge, character, and vision to become responsible leaders and builders of a prosperous nation."
        </blockquote>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.75,
          maxWidth: "680px",
          position: "relative", zIndex: 1,
        }}>
          Federal Government Degree College for Men, Peshawar strives to provide a transformative educational experience that combines academic rigour with moral development — producing graduates who are ready to serve their families, community, and country.
        </p>
      </div>

      {/* SECTION TITLE */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{
          display: "inline-block", background: "rgba(201,168,76,0.12)",
          border: "1px solid #c9a84c", color: "#8a6a1a",
          padding: "4px 16px", borderRadius: "20px",
          fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "14px",
        }}>Our Vision Pillars</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 3vw, 32px)",
          color: "#103d25", marginBottom: "12px",
        }}>What We Strive For</h2>
        <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Six core pillars guide our vision and shape every decision we make as an institution.
        </p>
      </div>

      {/* PILLARS GRID */}
      <div className="pillars-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "22px",
        marginBottom: "56px",
      }}>
        {VISION_PILLARS.map((p, i) => (
          <div key={i} className="vision-pillar" style={{ animationDelay: `${i * 0.08}s` }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: "linear-gradient(135deg, #103d25, #2a7a4e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px", marginBottom: "18px",
              boxShadow: "0 4px 14px rgba(16,61,37,0.25)",
            }}>
              {p.icon}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#103d25", marginBottom: "10px" }}>{p.title}</h3>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* CORE VALUES */}
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "44px 40px",
        border: "1px solid #e9ecef", boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        marginBottom: "40px", textAlign: "center",
      }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#103d25", marginBottom: "8px" }}>Our Core Values</h3>
        <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "'DM Sans', sans-serif", marginBottom: "28px" }}>
          The values that define who we are and guide how we serve our students.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          {CORE_VALUES.map((v, i) => (
            <span key={i} className="core-value-tag" style={{ background: v.color }}>{v.label}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-box" style={{
        background: "linear-gradient(135deg, #faf3e0, #fff8e8)",
        border: "1.5px solid #e8c97a", borderRadius: "16px",
        padding: "36px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "20px",
      }}>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#103d25", marginBottom: "6px" }}>Want to Know More About Us?</h4>
          <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
            Explore our Mission, History, and the programs we offer.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("mission")}
            style={{
              background: "#103d25", color: "#fff", border: "none",
              padding: "12px 24px", borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#1a5c38"}
            onMouseLeave={e => e.currentTarget.style.background = "#103d25"}
          >Our Mission →</button>
          <button
            onClick={() => navigate("history")}
            style={{
              background: "#c9a84c", color: "#103d25", border: "none",
              padding: "12px 24px", borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8c97a"}
            onMouseLeave={e => e.currentTarget.style.background = "#c9a84c"}
          >Our History →</button>
        </div>
      </div>

    </PageLayout>
  );
}