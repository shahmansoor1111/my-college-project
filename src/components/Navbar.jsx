import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useSession } from "../context/SessionContext";
import CommunityBadge, { CommunityBadgeNumber } from "./community/CommunityBadge";
import logo from "../img/fglogo.jpeg"
function getNavLinks(goToDashboard) {
  const links = [
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
            { label: "💻 FSc Computer Science", page: "fsc-cs"      },
            { label: "🔬 Pre-Medical",          page: "pre-medical" },
            { label: "🎨 Arts (FA)",            page: "arts"        },
          ],
        },
        {
          label: "🏫 BS Programmes",
          submenu: [
            { label: "🖥️ BS Computer Science",  page: "bs-cs"      },
            { label: "📚 BS English",           page: "bs-english" },
            { label: "🏛️ BS Political Science", page: "bs-polsci"  },
            { label: "📊 BBA",                  page: "bba"        },
          ],
        },
      ],
    },
    { label: "Courses",     page: "courses"     },
    { label: "Assessments", page: "assessments" },
    { label: "Community",   page: "community"   },
    { label: "AI Tutor",   page: "ai-helper"   },
    { label: "Gallery", page: "gallery" },
    // ✅ FIX: One "Dashboard" dropdown instead of two separate navbar buttons
    {
      label: "Dashboard",
      dropdown: [
        { label: "🧑‍🏫 Teacher Dashboard", action: () => goToDashboard("teacher") },
        { label: "🎓 Student Dashboard",  action: () => goToDashboard("student") },
      ],
    },
    { label: "Contact Us", page: "contact", highlight: true },
  ];
  return links;
}

function DropdownLeaf({ item, navigate, closeAll }) {
  return (
    <button
      onClick={() => { if (item.action) item.action(); else navigate(item.page); closeAll(); }}
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
          width: "100%", padding: "11px 20px", background: open ? "#f0f7f3" : "none",
          border: "none", cursor: "pointer", fontSize: "14px",
          color: open ? "#103d25" : "#1a1a1a", borderBottom: "1px solid #f0f0f0",
          fontFamily: "'DM Sans', sans-serif", fontWeight: open ? 600 : 400,
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
          zIndex: 10000,
        }}>
          {item.submenu.map(sub => (
            <DropdownLeaf key={sub.page} item={sub} navigate={navigate} closeAll={closeAll} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavItem({ item, currentPage, navigate, closeMobile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const isActive = item.page && (item.page === currentPage ||
    (item.dropdown && item.dropdown.some(d =>
      d.page === currentPage ||
      (d.submenu && d.submenu.some(s => s.page === currentPage))
    )));

  const closeAll = () => { setOpen(false); closeMobile && closeMobile(); };

  if (item.dropdown) {
    return (
      <div ref={ref} style={{ position: "relative" }}>
        <button onClick={() => setOpen(o => !o)} style={{
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
            zIndex: 9999,
          }}>
            {item.dropdown.map((d, i) =>
              d.submenu
                ? <DropdownGroup key={i} item={d} navigate={navigate} closeAll={closeAll} />
                : <DropdownLeaf  key={i} item={d} navigate={navigate} closeAll={closeAll} />
            )}
          </div>
        )}
      </div>
    );
  }

  if (item.action) {
    return (
      <button onClick={() => { item.action(); closeMobile && closeMobile(); }} style={{
        background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
        cursor: "pointer", color: "#e8c97a",
        fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
        padding: "7px 13px", borderRadius: "7px", transition: "all 0.2s", whiteSpace: "nowrap",
      }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(232,201,122,0.2)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
      >
        {item.label}
      </button>
    );
  }

  return (
    <button onClick={() => { navigate(item.page); closeMobile && closeMobile(); }} style={{
      background: item.highlight ? "#c9a84c" : isActive ? "rgba(255,255,255,0.12)" : "none",
      border: "none", cursor: "pointer",
      color: item.highlight ? "#103d25" : isActive ? "#e8c97a" : "#d1d5db",
      fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
      fontWeight: item.highlight ? 700 : 500,
      padding: item.highlight ? "8px 18px" : "8px 14px",
    borderRadius: "7px", transition: "all 0.2s", whiteSpace: "nowrap",
      position: "relative",
      
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
      {item.page === "community" && <CommunityBadge />}
    </button>
  );
}

function MobileItem({ item, navigate, close }) {
  const [open, setOpen] = useState(false);

  if (item.action) {
    return (
      <button onClick={() => { item.action(); close(); }} style={{
        width: "100%", padding: "13px 40px", background: "rgba(232,201,122,0.08)",
        border: "none", color: "#e8c97a", fontFamily: "'DM Sans',sans-serif",
        fontSize: "14px", fontWeight: 600, cursor: "pointer", textAlign: "left",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>{item.label}</button>
    );
  }

  if (item.page) {
  return (
    <button onClick={() => { navigate(item.page); close(); }} style={{
      width: "100%", padding: "13px 40px", background: "none", border: "none",
      color: "#a8d5be", fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
      cursor: "pointer", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)",
      display: "flex", alignItems: "center", gap: "8px",
    }}>
      {item.label}
      {item.page === "community" && (
        <span style={{
          minWidth: "18px", height: "18px", padding: "0 4px", borderRadius: "9px",
          background: "#dc2626", color: "#fff", fontSize: "11px", fontWeight: 700,
          lineHeight: "18px", textAlign: "center", display: "inline-block",
        }}>
          <CommunityBadgeNumber />
        </span>
      )}
    </button>
  );
}

  if (item.submenu) {
    return (
      <div>
        <button onClick={() => setOpen(o => !o)} style={{
          width: "100%", padding: "12px 40px", background: "none", border: "none",
          color: "#e8c97a", fontFamily: "'DM Sans',sans-serif", fontSize: "13.5px",
          fontWeight: 600, cursor: "pointer", textAlign: "left",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
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

export default function Navbar({ currentPage, navigate, goToDashboard }) {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const { teacher, student, logoutTeacher, logoutStudent } = useSession();
  const NAV_LINKS = getNavLinks(goToDashboard);
  const closeAll = () => { setMobileOpen(false); setMobileExpanded(null); };

  const isLoggedIn    = teacher || student;
  const whoIsLoggedIn = teacher ? `👨‍🏫 ${teacher.name}` : student ? `🎓 ${student.full_name}` : null;

  function handleSignOut() {
    if (teacher) logoutTeacher();
    if (student) logoutStudent();
    navigate("home");
    closeAll();
  }

  // ─────────────────────────────────────────────────────────────────────
  // IMPORTANT: `barsRef` wraps ONLY the two solid bars (logo row + nav
  // row) — NOT the mobile dropdown menu. We measure that, not the whole
  // header, because the mobile menu mounts/unmounts inside the same
  // fixed container. If we measured the container that includes the
  // dropdown, opening the menu would grow the measured height, which
  // would resize the page spacer below it on every open/close — that's
  // what was causing the whole page to flash/jump when the hamburger
  // was tapped. The two bars never change height when the menu toggles,
  // so measuring just them keeps the spacer (and the rest of the page)
  // completely still.
  // ─────────────────────────────────────────────────────────────────────
  const barsRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(96);

  // ── Ticker (continuous marquee, no state/re-render needed) ─────────────
  const MESSAGES = [
    "🎓 Admissions Open — Apply Now for the New Academic Session",
    "🌟 Empowering Future Leaders Through Quality Education",
    "🏆 Excellence in Academics, Discipline, and Character Building",
  ];

  useLayoutEffect(() => {
    if (!barsRef.current) return;
    const update = () => setHeaderHeight(Math.ceil(barsRef.current.getBoundingClientRect().height));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(barsRef.current);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  // Render one full pass of the message set, with a decorative divider between items
  const renderTickerPass = (keyPrefix) => (
    <div className="ticker-track" aria-hidden={keyPrefix === "b" ? true : undefined}>
      {MESSAGES.map((msg, i) => (
        <span className="ticker-item" key={`${keyPrefix}-${i}`}>
          <span className="ticker-text">{msg}</span>
          <span className="ticker-dot">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes dropIn    { from { opacity:0; transform:translateY(-8px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf7f0; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex  !important; }
        }

        /* ===== Ticker marquee ===== */
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tickerShine {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .ticker-bar {
          position: relative;
          background: linear-gradient(90deg, #0b2e1c 0%, #123c26 50%, #0b2e1c 100%);
          border-bottom: 1px solid rgba(201,168,76,0.35);
          overflow: hidden;
          min-height: 42px;
          display: flex;
          align-items: center;
        }
        /* soft fade at the edges so text doesn't hard-cut */
        .ticker-bar::before, .ticker-bar::after {
          content: "";
          position: absolute; top: 0; bottom: 0; width: 56px; z-index: 2; pointer-events: none;
        }
        .ticker-bar::before { left: 0;  background: linear-gradient(90deg, #0b2e1c 10%, transparent); }
        .ticker-bar::after  { right: 0; background: linear-gradient(270deg, #0b2e1c 10%, transparent); }

        .ticker-scroller {
          display: flex;
          width: max-content;
          animation: tickerScroll 26s linear infinite;
        }
        .ticker-bar:hover .ticker-scroller { animation-play-state: paused; }

        .ticker-track {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 28px;
          white-space: nowrap;
        }
        .ticker-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 15.5px;
          font-weight: 600;
          letter-spacing: 0.4px;
          background: linear-gradient(90deg, #cfe8da 0%, #f3e3ae 25%, #e8c97a 50%, #f3e3ae 75%, #cfe8da 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: tickerShine 6s linear infinite;
        }
        .ticker-dot {
          color: #c9a84c;
          font-size: 13px;
          opacity: 0.8;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .ticker-text { font-size: 13.5px; }
          .ticker-item { gap: 14px; padding: 0 18px; }
          .ticker-bar { min-height: 38px; }
        }
      `}</style>

      {/* ===== SINGLE FIXED HEADER: ticker row + nav row, stacked ===== */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>

        <div ref={barsRef}>

          {/* --- Row 1: attractive continuous marquee ticker --- */}
          <div className="ticker-bar">
            <div className="ticker-scroller">
              {renderTickerPass("a")}
              {renderTickerPass("b")}
            </div>
          </div>

          {/* --- Row 2: nav row (logo+FG left, menu items right) --- */}
          <nav style={{
            background: "#103d25",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 32px", borderBottom: "3px solid #c9a84c",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)", position: "relative",
          }}>

            {/* Logo + FG on the left */}
           <button
  onClick={() => navigate("home")}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
  }}
>
<img
  src={logo}
  alt="FG Logo"
  style={{
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
  }}
/>

  <span
    style={{
      fontFamily: "'Poppins', sans-serif",
      color: "#e8c97a",
      fontSize: "24px",
      fontWeight: 700,
      letterSpacing: "0.5px",
    }}
  >
    FG
  </span>
</button>

            {/* Desktop Nav — pushed to the right */}
            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {NAV_LINKS.map((item, i) => (
                <NavItem key={i} item={item} currentPage={currentPage} navigate={navigate} />
              ))}
            </div>

            <button className="hamburger" onClick={() => setMobileOpen(o => !o)}
              style={{
                display: "none", background: "none", border: "none", cursor: "pointer", color: "#fff",
                padding: "8px",
              }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </nav>
        </div>

        {/* --- Mobile Menu (sibling of barsRef wrapper, NOT inside it) --- */}
        {mobileOpen && (
          <div style={{
            background: "#103d25", borderTop: "1px solid rgba(201,168,76,0.3)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            maxHeight: `calc(100vh - ${headerHeight}px)`, overflowY: "auto",
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
                  <MobileItem item={item} navigate={navigate} close={closeAll} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Spacer so page content isn't hidden under the single fixed header */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
}