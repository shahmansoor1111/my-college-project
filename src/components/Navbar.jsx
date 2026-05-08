import { useState, useRef, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", page: "home" },
  {
    label: "About FG",
    dropdown: [
      { label: "🎯 Vision",  page: "vision"  },
      { label: "🚀 Mission", page: "mission" },
      { label: "📜 History", page: "history" },
    ],
  },
  {
    label: "Academics",
    dropdown: [
      {
        label: "🎓 Intermediate",
        submenu: [
          { label: "💻 FSc Computer Science", page: "fsc-cs"       },
          { label: "🔬 Pre-Medical",          page: "pre-medical"  },
          { label: "🎨 Arts (FA)",            page: "arts"         },
        ],
      },
      {
        label: "🏫 BS Programmes",
        submenu: [
          { label: "🖥️ BS Computer Science",  page: "bs-cs"        },
          { label: "📚 BS English",           page: "bs-english"   },
          { label: "🏛️ BS Political Science", page: "bs-polsci"    },
          { label: "📊 BBA",                  page: "bba"          },
        ],
      },
    ],
  },
  { label: "Courses",     page: "courses"     },
  { label: "Assessments", page: "assessments" },
  {
    label: "AI Tutor",
    dropdown: [
      { label: "🤖 AI Helper",     page: "ai-helper"     },
      { label: "📝 AI Assessment", page: "ai-assessment" },
    ],
  },
  { label: "Gallery",    page: "gallery"  },
  { label: "Contact Us", page: "contact", highlight: true },
];

// ── Leaf item (no children) ──────────────────────────────────────
function DropdownLeaf({ item, navigate, closeAll }) {
  return (
    <button
      onClick={() => { navigate(item.page); closeAll(); }}
      style={{
        display: "block", width: "100%", textAlign: "left",
        padding: "11px 20px", background: "none", border: "none",
        cursor: "pointer", fontSize: "14px", color: "#1a1a1a",
        borderBottom: "1px solid #f0f0f0",
        fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#f0f7f3"}
      onMouseLeave={e => e.currentTarget.style.background = "none"}
    >
      {item.label}
    </button>
  );
}

// ── Group item with fly-out submenu ──────────────────────────────
function DropdownGroup({ item, navigate, closeAll }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "11px 20px", background: "none", border: "none",
          cursor: "pointer", fontSize: "14px", color: open ? "#103d25" : "#1a1a1a",
          borderBottom: "1px solid #f0f0f0",
          fontFamily: "'DM Sans', sans-serif", fontWeight: open ? 600 : 400,
          transition: "background 0.15s",
          background: open ? "#f0f7f3" : "none",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#f0f7f3"}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "none"; }}
      >
        <span>{item.label}</span>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor"
          style={{ opacity: 0.5, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
          <path d="M0 0l8 6-8 6z"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: 0, left: "calc(100% + 4px)",
          background: "#fff", borderRadius: "10px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          border: "1px solid #e5e7eb", minWidth: "220px", overflow: "hidden",
          zIndex: 10000, animation: "dropIn 0.15s ease",
        }}>
          {item.submenu.map(sub => (
            <DropdownLeaf key={sub.page} item={sub} navigate={navigate} closeAll={closeAll} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Top-level nav item ───────────────────────────────────────────
function NavItem({ item, currentPage, navigate, closeMobile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const isActive = item.page === currentPage ||
    (item.dropdown && item.dropdown.some(d =>
      d.page === currentPage ||
      (d.submenu && d.submenu.some(s => s.page === currentPage))
    ));

  const closeAll = () => { setOpen(false); closeMobile && closeMobile(); };

  if (item.dropdown) {
    return (
      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(o => !o)}
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
          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#d1d5db"; e.currentTarget.style.background = "none"; } }}
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
            border: "1px solid #e5e7eb", minWidth: "220px", overflow: "visible",
            zIndex: 9999, animation: "dropIn 0.15s ease",
          }}>
            {item.dropdown.map((d, i) =>
              d.submenu
                ? <DropdownGroup key={i} item={d} navigate={navigate} closeAll={closeAll} />
                : <DropdownLeaf  key={d.page} item={d} navigate={navigate} closeAll={closeAll} />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => { navigate(item.page); closeMobile && closeMobile(); }}
      style={{
        background: item.highlight ? "#c9a84c" : isActive ? "rgba(255,255,255,0.12)" : "none",
        border: "none", cursor: "pointer",
        color: item.highlight ? "#103d25" : isActive ? "#e8c97a" : "#d1d5db",
        fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
        fontWeight: item.highlight ? 700 : 500,
        padding: item.highlight ? "8px 18px" : "8px 14px",
        borderRadius: "7px", transition: "all 0.2s", whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        if (!item.highlight) { e.currentTarget.style.color = "#e8c97a"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }
        else e.currentTarget.style.background = "#e8c97a";
      }}
      onMouseLeave={e => {
        if (!item.highlight) { e.currentTarget.style.color = isActive ? "#e8c97a" : "#d1d5db"; e.currentTarget.style.background = isActive ? "rgba(255,255,255,0.12)" : "none"; }
        else e.currentTarget.style.background = "#c9a84c";
      }}
    >
      {item.label}
    </button>
  );
}

// ── Mobile recursive renderer ────────────────────────────────────
function MobileItem({ item, navigate, close }) {
  const [open, setOpen] = useState(false);

  // Leaf page link
  if (item.page) {
    return (
      <button
        onClick={() => { navigate(item.page); close(); }}
        style={{
          width: "100%", padding: "13px 40px", background: "none", border: "none",
          color: "#a8d5be", fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
          cursor: "pointer", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >{item.label}</button>
    );
  }

  // Group with submenu
  if (item.submenu) {
    return (
      <div>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: "100%", padding: "12px 40px", background: "none", border: "none",
            color: "#e8c97a", fontFamily: "'DM Sans',sans-serif", fontSize: "13.5px",
            fontWeight: 600, cursor: "pointer", textAlign: "left",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          {item.label}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", opacity: 0.6 }}>
            <path d="M0 0l5 6 5-6z"/>
          </svg>
        </button>
        {open && (
          <div style={{ background: "rgba(0,0,0,0.15)" }}>
            {item.submenu.map(s => (
              <button key={s.page} onClick={() => { navigate(s.page); close(); }} style={{
                width: "100%", padding: "11px 56px", background: "none", border: "none",
                color: "#d1fae5", fontFamily: "'DM Sans',sans-serif", fontSize: "13.5px",
                cursor: "pointer", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>{s.label}</button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

// ── NAVBAR ───────────────────────────────────────────────────────
export default function Navbar({ currentPage, navigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeAll = () => { setMobileOpen(false); setMobileExpanded(null); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes dropIn   { from { opacity:0; transform:translateY(-8px);  } to { opacity:1; transform:translateY(0);    } }
        @keyframes slideDown{ from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0);    } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf7f0; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex  !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: "72px", background: "#103d25",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", borderBottom: "3px solid #c9a84c",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}>

        {/* Brand */}
        <button onClick={() => navigate("home")} style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: "none", border: "none", cursor: "pointer",
        }}>
          <div style={{
            width: "46px", height: "46px", borderRadius: "12px",
            background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#103d25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
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

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {NAV_LINKS.map(item => (
            <NavItem key={item.label} item={item} currentPage={currentPage} navigate={navigate} />
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(o => !o)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#fff", padding: "8px" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: "72px", left: 0, right: 0, zIndex: 999,
          background: "#103d25", borderTop: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
          animation: "slideDown 0.2s ease",
          maxHeight: "calc(100vh - 72px)", overflowY: "auto",
        }}>
          {NAV_LINKS.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    style={{
                      width: "100%", padding: "16px 24px", background: "none", border: "none",
                      color: "#d1d5db", fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
                      fontWeight: 500, cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                  >
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"
                      style={{ transform: mobileExpanded === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                      <path d="M0 0l5 6 5-6z"/>
                    </svg>
                  </button>
                  {mobileExpanded === item.label && (
                    <div style={{ background: "rgba(0,0,0,0.2)" }}>
                      {item.dropdown.map((d, j) => (
                        <MobileItem key={j} item={d} navigate={navigate} close={closeAll} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => { navigate(item.page); closeAll(); }}
                  style={{
                    width: "100%", padding: "16px 24px",
                    background: item.highlight ? "rgba(201,168,76,0.15)" : "none",
                    border: "none", color: item.highlight ? "#e8c97a" : "#d1d5db",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
                    fontWeight: item.highlight ? 600 : 400, cursor: "pointer", textAlign: "left",
                  }}
                >{item.label}</button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}