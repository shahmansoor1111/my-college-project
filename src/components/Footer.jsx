const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "Vision", page: "vision" },
  { label: "Mission", page: "mission" },
  { label: "History", page: "history" },
  { label: "FSc Computer Science", page: "fsc-cs" },
  { label: "Pre-Medical", page: "pre-medical" },
  { label: "Arts", page: "arts" },
  { label: "BS Computer Science", page: "bs-cs" },
  { label: "BBA", page: "bba" },
  { label: "BS Political Science", page: "bs-polsci" },
  { label: "BS English", page: "bs-english" },
  { label: "Courses", page: "courses" },
  { label: "Assessments", page: "assessments" },
  { label: "AI Tutor", page: "ai-tutor" },
  { label: "Gallery", page: "gallery" },
  { label: "Contact Us", page: "contact" },
];

const SOCIAL = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    color: "#1877f2",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com",
    color: "#000",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    color: "#e1306c",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    color: "#ff0000",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/92910000000",
    color: "#25d366",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

const COL1 = NAV_LINKS.slice(0, 4);   // Home + About
const COL2 = NAV_LINKS.slice(4, 11);  // Academics
const COL3 = NAV_LINKS.slice(11);     // Rest

export default function Footer({ navigate }) {
  return (
    <>
      <style>{`
        .footer-link {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.55); font-family: "DM Sans",sans-serif;
          font-size: 13.5px; padding: 5px 0; text-align: left;
          display: block; width: 100%; transition: color 0.2s;
        }
        .footer-link:hover { color: #e8c97a; }
        .social-btn {
          width: 40px; height: 40px; border-radius: 50%; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7);
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .social-btn:hover { transform: translateY(-3px); }
        .map-iframe {
          width: 100%; height: 100%; border: none; border-radius: 12px;
          filter: saturate(1.1) contrast(1.05);
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
          .map-box { height: 260px !important; }
        }
        @media (max-width: 480px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer style={{
        background: "#0b2818",
        borderTop: "3px solid #c9a84c",
        fontFamily: "'DM Sans',sans-serif",
      }}>

        {/* ── TOP SECTION ── */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "56px 32px 40px",
        }}>

          {/* LEFT: Brand + Map */}
          <div>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "16px" }}>
              <div style={{
                width: "50px", height: "50px", borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',serif", fontSize: "20px", fontWeight: 700, color: "#103d25",
              }}>FG</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "16px", lineHeight: 1.3 }}>
                  Federal Government Degree College
                </div>
                <div style={{ fontSize: "12px", color: "#e8c97a", fontWeight: 300, letterSpacing: "0.5px" }}>
                  For Men · Peshawar · Est. 1947
                </div>
              </div>
            </div>

            <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "400px", marginBottom: "24px" }}>
              Empowering generations through quality education, discipline, and excellence. Located on Mall Road, Sadar Bazaar, opposite Fauji Foundation Hospital, Peshawar.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
              {SOCIAL.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.name}
                  className="social-btn"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center",
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)",
                    textDecoration: "none", transition: "background 0.2s, color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "none"; }}
                >
                  {s.svg}
                </a>
              ))}
            </div>

            {/* Google Map */}
            <div className="map-box" style={{
              height: "300px", borderRadius: "14px", overflow: "hidden",
              border: "2px solid rgba(201,168,76,0.35)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}>
             <iframe
  className="map-iframe"
  title="FG Degree College Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.936148046144!2d71.52928827443027!3d34.00210682037823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917a67706bcbf%3A0x7d0b0a729a3091d2!2zRi5HIERlZ3JlZSBDb2xsZWdlIEZvciBCb3lzICjZhdix2K_Yp9mG24Ep!5e1!3m2!1sen!2s!4v1778048586027!5m2!1sen!2s"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
            </div>
          </div>

          {/* RIGHT: Nav columns */}
          <div>
            <div style={{ color: "#e8c97a", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}>
              Quick Navigation
            </div>
            <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>

              {/* About + General */}
              <div>
                <div style={{ color: "#c9a84c", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>About & General</div>
                {COL1.map(l => (
                  <button key={l.page} className="footer-link" onClick={() => navigate(l.page)}>› {l.label}</button>
                ))}
                <div style={{ marginTop: "20px", color: "#c9a84c", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Resources</div>
                {COL3.map(l => (
                  <button key={l.page} className="footer-link" onClick={() => navigate(l.page)}>› {l.label}</button>
                ))}
              </div>

              {/* Academics */}
              <div>
                <div style={{ color: "#c9a84c", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Academics</div>
                {COL2.map(l => (
                  <button key={l.page} className="footer-link" onClick={() => navigate(l.page)}>› {l.label}</button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div style={{
              marginTop: "28px", padding: "20px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "12px", border: "1px solid rgba(201,168,76,0.2)",
            }}>
              <div style={{ color: "#c9a84c", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "14px" }}>Contact Info</div>
              {[
                { icon: "📍", text: "Mall Road, Sadar Bazaar, Opp. Fauji Foundation Hospital, Peshawar" },
                { icon: "📞", text: "+92-91-XXXXXXX" },
                { icon: "✉️", text: "info@fgdc.edu.pk" },
                { icon: "🕐", text: "Mon–Sat: 8:00 AM – 4:00 PM" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "18px 32px",
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: "10px",
          maxWidth: "1200px", margin: "0 auto",
        }}>
      
        </div>

      </footer>
    </>
  );
}