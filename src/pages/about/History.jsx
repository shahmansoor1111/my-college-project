import PageLayout from "../../components/PageLayout";

const TIMELINE = [
  {
    year: "1947",
    title: "Foundation & Independence",
    desc: "Federal Government Degree College for Men was established in Peshawar Cantonment shortly after Pakistan's independence. The college was founded to provide quality higher education to the youth of Peshawar and the newly born nation, operating under the Federal Government's education initiative.",
    icon: "🏛️",
    highlight: true,
  },
  {
    year: "1950s",
    title: "Early Growth & Establishment",
    desc: "During the 1950s, the college rapidly expanded its faculty and student body. Intermediate programmes in Science and Arts were formally structured. The college became a beacon of education in Peshawar Cantonment, attracting students from across the Khyber Pakhtunkhwa region.",
    icon: "📚",
  },
  {
    year: "1960s",
    title: "Academic Expansion",
    desc: "The college introduced new academic disciplines and strengthened its science laboratories and library facilities. Student enrolment grew significantly and the college earned a strong reputation for producing top-ranking students in Board of Intermediate & Secondary Education (BISE) Peshawar examinations.",
    icon: "🔬",
  },
  {
    year: "1970s",
    title: "Degree Programme Launch",
    desc: "A major milestone was achieved when the college launched its Bachelor's degree programmes, transitioning from an intermediate-only institution to a full-fledged degree college. This expansion brought BS-level education to Peshawar Cantonment and gave students access to higher studies without leaving the city.",
    icon: "🎓",
  },
  {
    year: "1980s",
    title: "Infrastructure Development",
    desc: "Large-scale construction and infrastructure upgrades were undertaken. New academic blocks, science and computer laboratories, and a modernised library were added. The college grounds on Mall Road, Sadar Bazaar, were further developed to accommodate growing student numbers and academic programmes.",
    icon: "🏗️",
  },
  {
    year: "1990s",
    title: "Technology & Modernisation",
    desc: "Computer Science was introduced as a formal academic programme, reflecting the growing importance of technology in education. The college invested in computer labs and began integrating digital tools into teaching. Academic results continued to rank among the highest in BISE Peshawar.",
    icon: "🖥️",
  },
  {
    year: "2000s",
    title: "BS Programme Expansion",
    desc: "The college expanded its BS degree offerings to include Computer Science, Business Administration (BBA), Political Science, and English Literature. Affiliation with the University of Peshawar strengthened the academic credibility of these programmes and opened postgraduate pathways for students.",
    icon: "📊",
  },
  {
    year: "2010s",
    title: "Modernisation & Reforms",
    desc: "Under the Federal Directorate of Education, the college underwent major academic reforms. New teaching standards were introduced, faculty development programmes were launched, and the campus received modern amenities including solar panels, renovated classrooms, and upgraded sports facilities.",
    icon: "⚡",
  },
  {
    year: "2020s",
    title: "Digital Era & Present Day",
    desc: "The college embraced digital education tools and online learning platforms, especially during and after the COVID-19 pandemic. Today, FG Degree College for Men, Peshawar stands as one of the premier public sector degree colleges in KPK, proudly serving thousands of students with a legacy of over 75 years of excellence.",
    icon: "🌐",
    highlight: true,
  },
];

const ACHIEVEMENTS = [
  { icon: "🏅", title: "75+ Years of Excellence", desc: "Over seven decades of uninterrupted quality education in Peshawar." },
  { icon: "🎖️", title: "Top Board Results", desc: "Consistently producing top-position holders in BISE Peshawar examinations." },
  { icon: "👨‍🎓", title: "Thousands of Alumni", desc: "Alumni serving as doctors, engineers, civil servants, politicians, and scholars." },
  { icon: "🏫", title: "Prestigious Location", desc: "Situated on Mall Road, Sadar Bazaar, opposite Fauji Foundation Hospital — the heart of Peshawar Cantt." },
  { icon: "📜", title: "Federal Institution", desc: "Operated under the Federal Directorate of Education, Government of Pakistan." },
  { icon: "🔗", title: "University Affiliation", desc: "Affiliated with the University of Peshawar for degree-level programmes." },
];

const NOTABLE_FACTS = [
  { label: "Established", value: "1947" },
  { label: "Location", value: "Mall Road, Sadar Bazaar, Peshawar Cantt" },
  { label: "Type", value: "Federal Government Institution" },
  { label: "Affiliation", value: "University of Peshawar" },
  { label: "Governing Body", value: "Federal Directorate of Education" },
  { label: "Campus", value: "Opp. Fauji Foundation Hospital" },
];

export default function History({ navigate }) {
  return (
    <PageLayout icon="📜" title="History" breadcrumb="About FG → History" navigate={navigate}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { height: 0; }
          to   { height: 100%; }
        }
        .timeline-item {
          animation: fadeUp 0.55s ease both;
        }
        .achievement-card {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 14px;
          padding: 28px 22px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
          animation: fadeUp 0.5s ease both;
          text-align: center;
        }
        .achievement-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(26,92,56,0.13);
          border-color: #c9a84c;
        }
        .fact-row:nth-child(even) {
          background: #f8faf9;
        }
        @media (max-width: 768px) {
          .history-banner { padding: 32px 22px !important; }
          .facts-grid { grid-template-columns: 1fr !important; }
          .timeline-content { margin-left: 0 !important; }
          .cta-row { flex-direction: column !important; }
        }
      `}</style>

      {/* ── INTRO BANNER ── */}
      <div className="history-banner" style={{
        background: "linear-gradient(135deg, #103d25 0%, #1a5c38 55%, #2a7a4e 100%)",
        borderRadius: "20px",
        padding: "52px 48px",
        marginBottom: "52px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(16,61,37,0.3)",
      }}>
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(201,168,76,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "-30px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(201,168,76,0.2)", border: "1px solid #c9a84c",
          color: "#e8c97a", padding: "5px 16px", borderRadius: "20px",
          fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "24px",
        }}>
          📜 Est. 1947 · Peshawar Cantt
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 3vw, 30px)",
          color: "#fff", lineHeight: 1.5,
          marginBottom: "20px",
          textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          position: "relative", zIndex: 1,
          maxWidth: "760px",
        }}>
          A Legacy Built Over 75 Years of Dedication to Education, Service, and National Progress
        </h2>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.78,
          maxWidth: "700px",
          position: "relative", zIndex: 1,
        }}>
          Federal Government Degree College for Men, Peshawar Cantonment was born out of the vision of a newly independent Pakistan — a nation that understood education to be the foundation of all progress. Established in 1947 on the historic Mall Road, Sadar Bazaar, opposite Fauji Foundation Hospital, the college has shaped generations of Pakistan's finest minds for over seven decades.
        </p>
      </div>

      {/* ── QUICK FACTS TABLE ── */}
      <div style={{
        background: "#fff", borderRadius: "18px",
        border: "1px solid #e9ecef",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        marginBottom: "56px", overflow: "hidden",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #103d25, #1a5c38)",
          padding: "20px 28px",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <span style={{ fontSize: "22px" }}>📋</span>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px", color: "#fff",
          }}>College At a Glance</h3>
        </div>
        <div className="facts-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
        }}>
          {NOTABLE_FACTS.map((f, i) => (
            <div key={i} className="fact-row" style={{
              padding: "16px 28px",
              borderBottom: i < NOTABLE_FACTS.length - 2 ? "1px solid #f0f0f0" : "none",
              borderRight: i % 2 === 0 ? "1px solid #f0f0f0" : "none",
              display: "flex", flexDirection: "column", gap: "4px",
            }}>
              <span style={{ fontSize: "11px", color: "#c9a84c", textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>{f.label}</span>
              <span style={{ fontSize: "14.5px", color: "#103d25", fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE HEADING ── */}
      <div style={{ textAlign: "center", marginBottom: "44px" }}>
        <div style={{
          display: "inline-block", background: "rgba(201,168,76,0.12)",
          border: "1px solid #c9a84c", color: "#8a6a1a",
          padding: "4px 16px", borderRadius: "20px",
          fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "14px",
        }}>Our Journey</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 3vw, 32px)",
          color: "#103d25", marginBottom: "12px",
        }}>A Timeline of Our History</h2>
        <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          From the birth of Pakistan to the digital age — our story told decade by decade.
        </p>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ position: "relative", marginBottom: "64px", paddingLeft: "32px" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: "19px", top: "0", bottom: "0",
          width: "2px",
          background: "linear-gradient(180deg, #103d25, #c9a84c, #103d25)",
        }} />

        {TIMELINE.map((item, i) => (
          <div key={i} className="timeline-item" style={{
            position: "relative",
            marginBottom: i < TIMELINE.length - 1 ? "36px" : "0",
            animationDelay: `${i * 0.1}s`,
          }}>
            {/* Dot */}
            <div style={{
              position: "absolute", left: "-32px", top: "18px",
              width: "20px", height: "20px", borderRadius: "50%",
              background: item.highlight
                ? "linear-gradient(135deg, #c9a84c, #e8c97a)"
                : "linear-gradient(135deg, #103d25, #2a7a4e)",
              border: "3px solid #fff",
              boxShadow: item.highlight
                ? "0 0 0 3px rgba(201,168,76,0.4)"
                : "0 0 0 3px rgba(16,61,37,0.2)",
              zIndex: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
            }} />

            {/* Card */}
            <div style={{
              background: item.highlight
                ? "linear-gradient(135deg, #103d25, #1a5c38)"
                : "#fff",
              border: item.highlight ? "none" : "1px solid #e9ecef",
              borderRadius: "16px",
              padding: "26px 28px",
              boxShadow: item.highlight
                ? "0 10px 32px rgba(16,61,37,0.25)"
                : "0 2px 14px rgba(0,0,0,0.05)",
              marginLeft: "16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                {/* Year badge */}
                <span style={{
                  background: item.highlight ? "rgba(201,168,76,0.25)" : "rgba(16,61,37,0.08)",
                  border: item.highlight ? "1px solid #c9a84c" : "1px solid rgba(16,61,37,0.15)",
                  color: item.highlight ? "#e8c97a" : "#103d25",
                  padding: "4px 14px", borderRadius: "20px",
                  fontSize: "13px", fontWeight: 700,
                  fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.5px",
                }}>{item.year}</span>
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "18px",
                  color: item.highlight ? "#fff" : "#103d25",
                  margin: 0,
                }}>{item.title}</h3>
              </div>
              <p style={{
                fontSize: "14px",
                color: item.highlight ? "rgba(255,255,255,0.78)" : "#6b7280",
                lineHeight: 1.75,
                fontFamily: "'DM Sans', sans-serif",
                margin: 0,
              }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ACHIEVEMENTS ── */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{
          display: "inline-block", background: "rgba(201,168,76,0.12)",
          border: "1px solid #c9a84c", color: "#8a6a1a",
          padding: "4px 16px", borderRadius: "20px",
          fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, marginBottom: "14px",
        }}>Legacy & Pride</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 3vw, 30px)",
          color: "#103d25",
        }}>What Makes Us Proud</h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "52px",
      }}>
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="achievement-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div style={{ fontSize: "38px", marginBottom: "14px" }}>{a.icon}</div>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "16px", color: "#103d25", marginBottom: "9px",
            }}>{a.title}</h4>
            <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
              {a.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── CLOSING QUOTE ── */}
      <div style={{
        background: "linear-gradient(135deg, #faf3e0, #fff8e8)",
        border: "1.5px solid #e8c97a",
        borderRadius: "16px",
        padding: "44px 48px",
        textAlign: "center",
        marginBottom: "40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-15px", left: "10px",
          fontSize: "130px", color: "rgba(201,168,76,0.07)",
          fontFamily: "Georgia,serif", lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>"</div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(16px, 2.5vw, 22px)",
          color: "#103d25",
          lineHeight: 1.7, fontStyle: "italic",
          maxWidth: "640px", margin: "0 auto 18px",
          position: "relative", zIndex: 1,
        }}>
          From a college born in the year of Pakistan's independence, to a thriving institution shaping the nation's future — our history is not just our past, it is our promise.
        </p>
        <div style={{ width: "52px", height: "3px", background: "linear-gradient(90deg,#103d25,#c9a84c)", borderRadius: "2px", margin: "0 auto 14px" }} />
        <span style={{ fontSize: "13px", color: "#8a6a1a", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>
          FG Degree College for Men, Peshawar — Est. 1947
        </span>
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
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#fff", marginBottom: "6px" }}>
            Explore More About Us
          </h4>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
            Read our Vision, Mission, or explore our academic programmes.
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
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >← Our Vision</button>
          <button
            onClick={() => navigate("mission")}
            style={{
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.35)",
              padding: "12px 24px", borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >← Our Mission</button>
          <button
            onClick={() => navigate("courses")}
            style={{
              background: "#c9a84c", color: "#103d25", border: "none",
              padding: "12px 24px", borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              fontWeight: 700, cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8c97a"}
            onMouseLeave={e => e.currentTarget.style.background = "#c9a84c"}
          >Explore Courses →</button>
        </div>
      </div>

    </PageLayout>
  );
}