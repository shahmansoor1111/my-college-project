import { useState, useRef, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", page: "home" },
  {
    label: "About FG",
    dropdown: [
      { label: "🎯 Vision", page: "vision" },
      { label: "🚀 Mission", page: "mission" },
      { label: "📜 History", page: "history" },
    ],
  },
  {
    label: "Academics",
    dropdown: [
      { label: "💻 FSc Computer Science", page: "fsc-cs" },
      { label: "🔬 Pre-Medical", page: "pre-medical" },
      { label: "🎨 Arts", page: "arts" },
      { label: "🖥️ BS Computer Science", page: "bs-cs" },
      { label: "📊 BBA", page: "bba" },
      { label: "🏛️ BS Political Science", page: "bs-polsci" },
      { label: "📚 BS English", page: "bs-english" },
    ],
  },
  { label: "Courses", page: "courses" },
  { label: "Assessments", page: "assessments" },
  { label: "AI Tutor", page: "ai-tutor" },
  { label: "Gallery", page: "gallery" },
  { label: "Contact Us", page: "contact", highlight: true },
];

function DropdownItem({ item, navigate, close }) {
  return (
    <button
      onClick={() => { navigate(item.page); close(); }}
      style={{
        display: "block", width: "100%", textAlign: "left",
        padding: "11px 20px", background: "none", border: "none",
        cursor: "pointer", fontSize: "14px", color: "#1a1a1a",
        borderBottom: "1px solid #f0f0f0", transition: "background 0.15s",
        fontFamily: "'DM Sans', sans-serif",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#f0f7f3"}
      onMouseLeave={e => e.currentTarget.style.background = "none"}
    >
      {item.label}
    </button>
  );
}

function NavItem({ item, currentPage, navigate, closeMobile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = item.page === currentPage ||
    (item.dropdown && item.dropdown.some(d => d.page === currentPage));

  if (item.dropdown) {
    return (
      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: isActive ? "rgba(255,255,255,0.12)" : "none",
            border: "none", cursor: "pointer",
            color: isActive ? "#e8c97a" : "#d1d5db",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500,
            padding: "8px 14px", borderRadius: "6px",
            display: "flex", alignItems: "center", gap: "5px",
            transition: "color 0.2s, background 0.2s", whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#e8c97a"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#d1d5db"; e.currentTarget.style.background = isActive ? "rgba(255,255,255,0.12)" : "none"; } }}
        >
          {item.label}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            <path d="M0 0l5 6 5-6z"/>
          </svg>
        </button>
        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0,
            background: "#fff", borderRadius: "10px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            border: "1px solid #e5e7eb", minWidth: "230px", overflow: "hidden",
            zIndex: 9999, animation: "dropIn 0.15s ease",
          }}>
            {item.dropdown.map(d => (
              <DropdownItem key={d.page} item={d} navigate={navigate} close={() => { setOpen(false); closeMobile && closeMobile(); }} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => { navigate(item.page); closeMobile && closeMobile(); }}
      style={{
        background: item.highlight
          ? "#c9a84c"
          : isActive ? "rgba(255,255,255,0.12)" : "none",
        border: "none", cursor: "pointer",
        color: item.highlight ? "#103d25" : isActive ? "#e8c97a" : "#d1d5db",
        fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
        fontWeight: item.highlight ? 700 : 500,
        padding: item.highlight ? "8px 18px" : "8px 14px",
        borderRadius: "7px", transition: "all 0.2s", whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        if (!item.highlight) { e.currentTarget.style.color = "#e8c97a"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }
        else { e.currentTarget.style.background = "#e8c97a"; }
      }}
      onMouseLeave={e => {
        if (!item.highlight) { e.currentTarget.style.color = isActive ? "#e8c97a" : "#d1d5db"; e.currentTarget.style.background = isActive ? "rgba(255,255,255,0.12)" : "none"; }
        else { e.currentTarget.style.background = "#c9a84c"; }
      }}
    >
      {item.label}
    </button>
  );
}

export default function Navbar({ currentPage, navigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes dropIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf7f0; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: "72px", background: "#103d25",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", borderBottom: "3px solid #c9a84c",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}>
        {/* Brand */}
        {/* Brand */}
<button onClick={() => navigate("home")} style={{
  display: "flex", 
  alignItems: "center", 
  gap: "12px",
  background: "none", 
  border: "none", 
  cursor: "pointer", 
  textDecoration: "none",
}}>
  {/* Graduate Cap Icon Container */}
  <div style={{
    width: "46px", 
    height: "46px", 
    borderRadius: "12px", // Thoda square-rounded look
    background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }}>
    {/* SVG Graduate Cap */}
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#103d25" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
  </div>

  <div style={{ textAlign: "left" }}>
    <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "15px", lineHeight: 1.3 }}>
      FG Degree College
    </div>
    <div style={{ fontSize: "11px", fontFamily: "'DM Sans',sans-serif", color: "#e8c97a", fontWeight: 300, letterSpacing: "0.5px" }}>
      Peshawar — Est. 1947
    </div>
  </div>
</button>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "nowrap" }}
          className="desktop-nav">
          {NAV_LINKS.map(item => (
            <NavItem key={item.label} item={item} currentPage={currentPage} navigate={navigate} />
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: "#fff", padding: "8px",
          }}
          className="hamburger"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: "72px", left: 0, right: 0, zIndex: 999,
          background: "#103d25", borderTop: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
          animation: "slideDown 0.2s ease", maxHeight: "calc(100vh - 72px)", overflowY: "auto",
        }}>
          {NAV_LINKS.map(item => (
            <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                    style={{
                      width: "100%", padding: "16px 24px", background: "none", border: "none",
                      color: "#d1d5db", fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
                      fontWeight: 500, cursor: "pointer", display: "flex",
                      justifyContent: "space-between", alignItems: "center",
                    }}
                  >
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"
                      style={{ transform: mobileDropdown === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                      <path d="M0 0l5 6 5-6z"/>
                    </svg>
                  </button>
                  {mobileDropdown === item.label && (
                    <div style={{ background: "rgba(0,0,0,0.2)" }}>
                      {item.dropdown.map(d => (
                        <button
                          key={d.page}
                          onClick={() => { navigate(d.page); setMobileOpen(false); setMobileDropdown(null); }}
                          style={{
                            width: "100%", padding: "13px 40px", background: "none", border: "none",
                            color: "#a8d5be", fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
                            cursor: "pointer", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => { navigate(item.page); setMobileOpen(false); }}
                  style={{
                    width: "100%", padding: "16px 24px", background: item.highlight ? "rgba(201,168,76,0.15)" : "none",
                    border: "none", color: item.highlight ? "#e8c97a" : "#d1d5db",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
                    fontWeight: item.highlight ? 600 : 400, cursor: "pointer", textAlign: "left",
                  }}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
