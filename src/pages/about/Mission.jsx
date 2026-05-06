import PageLayout from "../../components/PageLayout";

const MISSION_POINTS = [
  {
    icon: "📚",
    title: "Quality Education",
    desc: "To deliver high-quality, curriculum-aligned education through experienced faculty, modern resources, and innovative teaching methods that meet national and international standards.",
  },
  {
    icon: "🧠",
    title: "Critical Thinking",
    desc: "To develop students' analytical and problem-solving abilities, encouraging them to question, explore, and reason independently across all disciplines.",
  },
  {
    icon: "🕌",
    title: "Islamic & Ethical Values",
    desc: "To instil strong Islamic principles, ethical conduct, and a sense of social responsibility that shapes morally upright and conscientious individuals.",
  },
  {
    icon: "🏆",
    title: "Competitive Achievement",
    desc: "To prepare students for competitive examinations, higher education, and professional careers through rigorous academic training and co-curricular engagement.",
  },
  {
    icon: "👨‍🏫",
    title: "Dedicated Faculty",
    desc: "To attract, retain, and continuously develop passionate educators who serve as mentors, role models, and academic guides for every student.",
  },
  {
    icon: "🖥️",
    title: "Modern Infrastructure",
    desc: "To maintain state-of-the-art laboratories, libraries, digital classrooms, and sports facilities that create a stimulating learning environment.",
  },
  {
    icon: "🤲",
    title: "Community Engagement",
    desc: "To strengthen ties with families, alumni, and the broader Peshawar community, fostering a collaborative relationship that benefits everyone.",
  },
  {
    icon: "🌿",
    title: "Safe & Inclusive Campus",
    desc: "To ensure a safe, respectful, and welcoming campus where every student feels valued, heard, and motivated to grow.",
  },
];

const COMMITMENTS = [
  { number: "01", title: "Student First", desc: "Every policy and decision is made with the student's best interest and success at its core." },
  { number: "02", title: "Continuous Improvement", desc: "We constantly review and improve our academic programs, staff training, and campus facilities." },
  { number: "03", title: "Accountability", desc: "We hold ourselves to the highest standards of transparency, integrity, and institutional responsibility." },
  { number: "04", title: "Excellence in All", desc: "From classroom teaching to extracurricular activities, we pursue excellence in every endeavour." },
];

export default function Mission({ navigate }) {
  return (
    <PageLayout icon="🚀" title="Mission" breadcrumb="About FG → Mission" navigate={navigate}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mission-card {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 2px 14px rgba(0,0,0,0.05);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          animation: fadeUp 0.5s ease both;
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }
        .mission-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(26,92,56,0.12);
          border-color: #c9a84c;
        }
        .commitment-card {
          background: #fff;
          border-radius: 16px;
          padding: 30px 26px;
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          animation: fadeUp 0.5s ease both;
        }
        .commitment-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(16,61,37,0.12);
        }
        @media (max-width: 640px) {
          .mission-statement-box { padding: 32px 22px !important; }
          .cta-row { flex-direction: column !important; }
          .commitment-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── MISSION STATEMENT BANNER ── */}
      <div className="mission-statement-box" style={{
        background: "linear-gradient(135deg, #103d25 0%, #1a5c38 55%, #2a7a4e 100%)",
        borderRadius: "20px",
        padding: "52px 48px",
        marginBottom: "52px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(16,61,37,0.3)",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(201,168,76,0.13)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-50px", left: "-20px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", right: "15%", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(201,168,76,0.07)", pointerEvents: "none" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(201,168,76,0.2)", border: "1px solid #c9a84c",
          color: "#e8c97a", padding: "5px 16px", borderRadius: "20px",
          fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "24px",
        }}>
          🚀 Our Mission Statement
        </div>

        <blockquote style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(18px, 2.8vw, 26px)",
          color: "#ffffff",
          lineHeight: 1.65,
          fontStyle: "italic",
          margin: "0 0 24px 0",
          textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          position: "relative", zIndex: 1,
          maxWidth: "780px",
        }}>
          "To provide every student with a transformative, values-driven education that develops intellectual ability, moral strength, and professional readiness — empowering them to serve Pakistan and lead with distinction."
        </blockquote>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.78,
          maxWidth: "680px",
          position: "relative", zIndex: 1,
        }}>
          At FG Degree College for Men, Peshawar, our mission is more than a statement — it is a daily commitment lived through every lecture, every mentorship, and every interaction between our faculty and students.
        </p>
      </div>

      {/* ── SECTION HEADING ── */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{
          display: "inline-block", background: "rgba(201,168,76,0.12)",
          border: "1px solid #c9a84c", color: "#8a6a1a",
          padding: "4px 16px", borderRadius: "20px",
          fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "14px",
        }}>Mission In Action</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 3vw, 32px)",
          color: "#103d25", marginBottom: "12px",
        }}>How We Fulfil Our Mission</h2>
        <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Eight actionable commitments that translate our mission into real outcomes for students every day.
        </p>
      </div>

      {/* ── MISSION POINTS ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "18px",
        marginBottom: "56px",
      }}>
        {MISSION_POINTS.map((pt, i) => (
          <div key={i} className="mission-card" style={{ animationDelay: `${i * 0.07}s` }}>
            {/* Icon box */}
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
              background: "linear-gradient(135deg, #103d25, #2a7a4e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px",
              boxShadow: "0 4px 12px rgba(16,61,37,0.22)",
            }}>
              {pt.icon}
            </div>
            {/* Text */}
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "17px", color: "#103d25", marginBottom: "8px",
              }}>{pt.title}</h3>
              <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                {pt.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── OUR 4 COMMITMENTS ── */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 3vw, 28px)",
          color: "#103d25", marginBottom: "10px",
        }}>Our Four Commitments</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
          The principles that guide how we operate as an institution of excellence.
        </p>
      </div>

      <div className="commitment-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "52px",
      }}>
        {COMMITMENTS.map((c, i) => (
          <div key={i} className="commitment-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "36px", color: "#e8c97a",
              lineHeight: 1, marginBottom: "14px",
              textShadow: "0 2px 8px rgba(201,168,76,0.3)",
            }}>{c.number}</div>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "17px", color: "#103d25", marginBottom: "10px",
            }}>{c.title}</h4>
            <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
              {c.desc}
            </p>
            {/* Bottom accent */}
            <div style={{
              marginTop: "20px", height: "3px", borderRadius: "2px",
              background: "linear-gradient(90deg, #103d25, #c9a84c)",
            }} />
          </div>
        ))}
      </div>

      {/* ── QUOTE HIGHLIGHT ── */}
      <div style={{
        background: "linear-gradient(135deg, #faf3e0, #fff8e8)",
        border: "1.5px solid #e8c97a",
        borderRadius: "16px",
        padding: "40px 44px",
        textAlign: "center",
        marginBottom: "40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-20px", left: "-20px",
          fontSize: "120px", color: "rgba(201,168,76,0.08)",
          fontFamily: "Georgia, serif", lineHeight: 1, pointerEvents: "none",
          userSelect: "none",
        }}>"</div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "#103d25",
          lineHeight: 1.7,
          fontStyle: "italic",
          maxWidth: "600px",
          margin: "0 auto 16px",
          position: "relative", zIndex: 1,
        }}>
          Education is the most powerful weapon you can use to change the world. At FG Degree College, we arm every student with exactly that.
        </p>
        <div style={{
          width: "48px", height: "3px", background: "#c9a84c",
          borderRadius: "2px", margin: "0 auto",
        }} />
      </div>

      {/* ── CTA ── */}
      <div className="cta-row" style={{
        background: "#103d25",
        borderRadius: "16px",
        padding: "36px 40px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap", gap: "20px",
        boxShadow: "0 8px 32px rgba(16,61,37,0.25)",
      }}>
        <div>
          <h4 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px", color: "#fff", marginBottom: "6px",
          }}>Continue Exploring Our Story</h4>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
            Learn about our Vision, rich History, and academic programmes.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("vision")}
            style={{
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.35)",
              padding: "12px 24px", borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
          >← Our Vision</button>
          <button
            onClick={() => navigate("history")}
            style={{
              background: "#c9a84c", color: "#103d25", border: "none",
              padding: "12px 24px", borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              fontWeight: 700, cursor: "pointer",
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