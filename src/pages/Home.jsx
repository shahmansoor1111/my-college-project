import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import fg1 from "../img/fg1.jpeg";
import fg2 from "../img/fg2.jpeg";

import principalImg from "../img/principal.jpeg";
import bsCoordImg from "../img/Bscoordinator.jpeg";
import hodImg from "../img/HOD.jpeg";
import seniorProfImg from "../img/Seniorprofessor.jpeg"; 

import galleryImg1 from "../img/gall1.jpeg";
import galleryImg2 from "../img/gall2.jpeg";
import galleryImg3 from "../img/gall3.jpeg";
import galleryImg4 from "../img/gall4.jpeg";



import galleryVid1 from "../img/gall5.mp4";
import galleryVid2 from "../img/gall6.mp4";

const IMG1 = fg1;
const IMG2 = fg2;

const CARDS = [
  { icon: "📖", label: "Courses",     page: "courses",     desc: "Browse subjects and learning materials." },
  { icon: "📝", label: "Assessments", page: "assessments", desc: "Take quizzes and track your performance." },
  
  { icon: "🖼️", label: "Gallery",     page: "gallery",     desc: "Explore campus photos and videos." },
];

const STATS = [
  { num: "75+",   lbl: "Years of Excellence" },
  { num: "5000+", lbl: "Students Enrolled" },
  { num: "200+",  lbl: "Faculty Members" },
  { num: "7",     lbl: "Programs Offered" },
];

const SLIDES = [IMG1, IMG2];

 const FACULTY = [
  {
    img: principalImg,
    name: "Prof. [Muhammad Shoaib]",
    role: "Principal",
    badge: "🎓",
    desc: "Leading the college with over 30 years of academic excellence, dedicated to fostering a culture of learning, integrity, and innovation across all departments.",
  },
  {
    img: bsCoordImg,
    name: "Mr. [Zafar Ali]",
    role: "BS Coordinator",
    badge: "📋",
    desc: "Overseeing the Bachelor of Science programs, ensuring academic standards are maintained and guiding students through their undergraduate journey with care and expertise.",
  },
  {
    img: hodImg,
    name: "Mr. [Ikram Ullah]",
    role: "Head of Department",
    badge: "🏛️",
    desc: "Providing visionary leadership to the department, coordinating faculty efforts and curriculum development to deliver a world-class educational experience.",
  },
  {
    img: seniorProfImg,
    name: "Mr.[Ghazi]",
    role: "Senior Professor",
    badge: "📚",
    desc: "A distinguished educator with decades of teaching experience, known for inspiring students and contributing to cutting-edge research in the field.",
  },
];

const GALLERY_ITEMS = [
  // Row 1: 2 images + 1 video
  { type: "image", src: galleryImg1, caption: "Graduation Ceremony 2025",       sub: "Annual convocation honouring graduating students" },
  { type: "image", src: galleryImg2, caption: "Graduation Ceremony Group Photo",              sub: "Students Group Photo " },
  { type: "video", src: galleryVid1, caption: "Short clip ",                     sub: "Annual convocation Cermony" },
  // Row 2: 1 video + 2 images
  { type: "video", src: galleryVid2, caption: "Annual Ceremony",              sub: "During the graduation ceremony with the Principal and a Brigadier from the Pakistan Army." },
  { type: "image", src: galleryImg3, caption: "Library & Study Hall",            sub: "Our state-of-the-art learning resources" },
  { type: "image", src: galleryImg4, caption: "Cultural Fest",                   sub: "Celebrating diversity through arts and culture" },
]; 

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ items, startIndex, onClose }) {
  const [current, setCurrent]   = useState(startIndex);
  const [visible, setVisible]   = useState(false);
  const videoRef                = useRef(null);
  const item                    = items[current];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => {
      if (e.key === "Escape")     handleClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft")  go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  const go = (dir) => {
    if (videoRef.current) { videoRef.current.pause(); }
    setCurrent((prev) => (prev + dir + items.length) % items.length);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.96)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.28s ease",
      }}
    >
      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
          zIndex: 2,
        }}
      >
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px", color: "#fff", fontWeight: 700 }}>
            {item.caption}
          </div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "2px" }}>
            {item.sub}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
            {current + 1} / {items.length}
          </span>
          <button
            onClick={handleClose}
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff", fontSize: "20px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 1,
            }}
          >×</button>
        </div>
      </div>

      {/* Prev / Next arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            style={{
              position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
              width: "48px", height: "48px", borderRadius: "50%",
              border: "2px solid rgba(201,168,76,0.5)",
              background: "rgba(0,0,0,0.5)", color: "#c9a84c",
              fontSize: "24px", cursor: "pointer", zIndex: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.2)"; e.currentTarget.style.borderColor = "#c9a84c"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.5)";      e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; }}
          >‹</button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            style={{
              position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
              width: "48px", height: "48px", borderRadius: "50%",
              border: "2px solid rgba(201,168,76,0.5)",
              background: "rgba(0,0,0,0.5)", color: "#c9a84c",
              fontSize: "24px", cursor: "pointer", zIndex: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.2)"; e.currentTarget.style.borderColor = "#c9a84c"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.5)";      e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; }}
          >›</button>
        </>
      )}

      {/* Media */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "92vw", maxHeight: "80vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: "12px", overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
        }}
      >
        {item.type === "image" ? (
          item.src ? (
            <img
              src={item.src}
              alt={item.caption}
              style={{ maxWidth: "92vw", maxHeight: "80vh", objectFit: "contain", display: "block", borderRadius: "12px" }}
            />
          ) : (
            <div style={{
              width: "min(700px, 88vw)", height: "min(480px, 60vh)",
              background: "linear-gradient(135deg, #0d3020, #1a5c3a)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              borderRadius: "12px", gap: "16px",
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'DM Sans',sans-serif", fontSize: "14px" }}>
                {item.caption}
              </span>
            </div>
          )
        ) : (
          item.src ? (
            <video
              ref={videoRef}
              src={item.src}
              controls
              autoPlay
              style={{ maxWidth: "92vw", maxHeight: "80vh", borderRadius: "12px", display: "block", background: "#000" }}
            />
          ) : (
            <div style={{
              width: "min(700px, 88vw)", height: "min(480px, 60vh)",
              background: "linear-gradient(135deg, #071a10, #0f3322)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              borderRadius: "12px", gap: "16px",
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
              <span style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'DM Sans',sans-serif", fontSize: "14px" }}>
                {item.caption}
              </span>
            </div>
          )
        )}
      </div>

      {/* Thumbnail strip */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: "10px", alignItems: "center",
          background: "rgba(0,0,0,0.5)", padding: "10px 16px", borderRadius: "40px",
          backdropFilter: "blur(8px)", maxWidth: "90vw", overflowX: "auto",
        }}
      >
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => { if (videoRef.current) videoRef.current.pause(); setCurrent(i); }}
            style={{
              width: "48px", height: "48px", borderRadius: "8px",
              border: current === i ? "2px solid #c9a84c" : "2px solid rgba(255,255,255,0.15)",
              overflow: "hidden", cursor: "pointer", padding: 0, flexShrink: 0,
              opacity: current === i ? 1 : 0.5,
              transform: current === i ? "scale(1.1)" : "scale(1)",
              transition: "all 0.2s ease",
              background: "#0d3020",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {it.type === "image" ? (
              it.src ? (
                <img src={it.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )
            ) : (
              it.src ? (
                <video src={it.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                </svg>
              )
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Gallery Card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, index, onOpen }) {
  const videoRef            = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else         { videoRef.current.play();  setPlaying(true);  }
  };

  return (
    <div
      onClick={() => onOpen(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px", overflow: "hidden",
        border: "1px solid rgba(201,168,76,0.18)",
        background: "#0d2518", cursor: "pointer",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.25)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Media */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", flexShrink: 0 }}>
        {item.type === "image" ? (
          item.src ? (
            <img
              src={item.src} alt={item.caption}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease",
              }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(135deg, #0d3020 0%, #1a5c3a 60%, #0d3020 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px",
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span style={{ fontSize: "12px", color: "rgba(201,168,76,0.45)", fontFamily: "'DM Sans',sans-serif" }}>Image {index + 1}</span>
            </div>
          )
        ) : (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {item.src ? (
              <video
                ref={videoRef}
                src={item.src}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onEnded={() => setPlaying(false)}
                playsInline
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: "linear-gradient(135deg, #071a10 0%, #0f3322 60%, #071a10 100%)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px",
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                </svg>
                <span style={{ fontSize: "12px", color: "rgba(201,168,76,0.45)", fontFamily: "'DM Sans',sans-serif" }}>Video {index + 1}</span>
              </div>
            )}
            {/* Play / Pause overlay */}
            <button
              onClick={item.src ? togglePlay : (e) => e.stopPropagation()}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                background: playing ? "transparent" : "rgba(0,0,0,0.22)",
                border: "none", cursor: item.src ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              {!playing && (
                <div style={{
                  width: "50px", height: "50px", borderRadius: "50%",
                  background: "rgba(201,168,76,0.92)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  transform: hovered ? "scale(1.12)" : "scale(1)",
                  transition: "transform 0.2s ease",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0d3020"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              )}
              {playing && (
                <div style={{
                  width: "50px", height: "50px", borderRadius: "50%",
                  background: "rgba(0,0,0,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: hovered ? 1 : 0, transition: "opacity 0.2s",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                  </svg>
                </div>
              )}
            </button>
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              background: "rgba(201,168,76,0.92)", color: "#0d3020",
              padding: "3px 10px", borderRadius: "20px",
              fontSize: "11px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
            }}>▶ VIDEO</div>
          </div>
        )}

        {item.type === "image" && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: "rgba(13,48,32,0.88)", color: "#c9a84c",
            padding: "3px 10px", borderRadius: "20px",
            fontSize: "11px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif",
            border: "1px solid rgba(201,168,76,0.3)",
          }}>📷 PHOTO</div>
        )}

        {/* Expand hint on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0)",
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          padding: "12px",
          opacity: hovered ? 1 : 0, transition: "opacity 0.2s",
          pointerEvents: "none",
        }}>
          <div style={{
            background: "rgba(0,0,0,0.6)", borderRadius: "8px",
            padding: "6px 10px", display: "flex", alignItems: "center", gap: "6px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            <span style={{ color: "#fff", fontSize: "11px", fontFamily: "'DM Sans',sans-serif" }}>Expand</span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{ padding: "15px 17px 17px", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{
          fontSize: "14px", fontWeight: 700, color: "#e8c97a",
          fontFamily: "'DM Sans',sans-serif", marginBottom: "4px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{item.caption}</div>
        <div style={{
          fontSize: "12px", color: "rgba(255,255,255,0.48)",
          fontFamily: "'DM Sans',sans-serif", lineHeight: 1.5,
        }}>{item.sub}</div>
      </div>
    </div>
  );
}

// ── Main Home ─────────────────────────────────────────────────────────────────
export default function Home({ navigate }) {
  const [activeSlide,   setActiveSlide]   = useState(0);
  const [activeFaculty, setActiveFaculty] = useState(0);
  const [animating,     setAnimating]     = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(p => (p + 1) % SLIDES.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => goToFaculty((activeFaculty + 1) % FACULTY.length), 5000);
    return () => clearInterval(t);
  }, [activeFaculty]);

  const goToFaculty = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActiveFaculty(index); setAnimating(false); }, 300);
  };

  const f = FACULTY[activeFaculty];

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", background: "#faf7f0" }}>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <style>{`
        @keyframes kenBurns0 { 0% { transform: scale(1.0) translateX(0px); } 100% { transform: scale(1.12) translateX(-20px); } }
        @keyframes kenBurns1 { 0% { transform: scale(1.0) translateX(0px); } 100% { transform: scale(1.12) translateX(20px); } }
        .slide-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 1.2s ease-in-out; }
        .slide-img.active { opacity:1; }
        .slide-img.active.kb0 { animation: kenBurns0 6s ease-in-out forwards; }
        .slide-img.active.kb1 { animation: kenBurns1 6s ease-in-out forwards; }
        @keyframes facultyFadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .faculty-card-content { animation: facultyFadeIn 0.45s ease forwards; }
        .faculty-dot { width:10px; height:10px; border-radius:50%; border:none; cursor:pointer; transition:all 0.3s ease; padding:0; }
        .faculty-nav-btn { width:40px; height:40px; border-radius:50%; border:2px solid rgba(201,168,76,0.5); background:rgba(255,255,255,0.08); color:#c9a84c; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s ease; flex-shrink:0; }
        .faculty-nav-btn:hover { background:rgba(201,168,76,0.15); border-color:#c9a84c; }
        .gallery-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .more-btn { background:transparent; border:2px solid #c9a84c; color:#c9a84c; padding:13px 36px; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; letter-spacing:0.3px; transition:all 0.2s ease; display:inline-flex; align-items:center; gap:8px; }
        .more-btn:hover { background:#c9a84c; color:#0d3020; }
        @media (max-width:900px) {
          .faculty-inner { flex-direction:column !important; }
          .faculty-photo-wrap { width:100% !important; height:220px !important; min-width:unset !important; }
          .faculty-text-wrap { padding:24px 20px !important; }
          .gallery-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width:580px) {
          .gallery-grid { grid-template-columns:1fr !important; }
          .stats-grid  { grid-template-columns:repeat(2,1fr) !important; }
          .faculty-nav-btn { width:34px !important; height:34px !important; font-size:15px !important; }
        }
      `}</style>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div style={{ position:"relative", overflow:"hidden", minHeight:"520px", display:"flex", alignItems:"center" }}>
        {SLIDES.map((src,i) => <img key={i} src={src} alt="" className={`slide-img${activeSlide===i?" active kb"+i:""}`} />)}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(58,59,58,0.82) 0%,rgba(27,28,27,0.7) 55%,rgba(42,44,43,0.55) 100%)", zIndex:1 }} />
        <div style={{ position:"absolute", bottom:"24px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"10px", zIndex:3 }}>
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => setActiveSlide(i)} style={{ width:activeSlide===i?"32px":"10px", height:"10px", borderRadius:"5px", border:"none", background:activeSlide===i?"#c9a84c":"rgba(255,255,255,0.45)", cursor:"pointer", transition:"all 0.4s ease", padding:0 }} />
          ))}
        </div>
        <div style={{ position:"relative", zIndex:2, padding:"90px 48px 100px", width:"100%" }}>
          <div style={{ display:"inline-block", background:"rgba(201,168,76,0.25)", border:"1px solid #c9a84c", color:"#e8c97a", padding:"5px 16px", borderRadius:"20px", fontSize:"12px", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"22px", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>Est. 1947 · Peshawar</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,5vw,60px)", color:"#ffffff", lineHeight:1.12, marginBottom:"20px", maxWidth:"720px", fontWeight:700, textShadow:"0 2px 20px rgba(0,0,0,0.6)", letterSpacing:"-0.5px" }}>
            Federal Government<br />Degree College for Men
          </h1>
          <p style={{ fontSize:"clamp(15px,2vw,18px)", color:"rgba(255,255,255,0.95)", maxWidth:"560px", lineHeight:1.75, marginBottom:"38px", fontFamily:"'DM Sans',sans-serif", fontWeight:500, textShadow:"0 1px 8px rgba(0,0,0,0.7)" }}>
            Empowering generations through quality education, discipline, and a commitment to excellence in the heart of Peshawar.
          </p>
          <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
            <button onClick={() => navigate("courses")} style={{ background:"#c9a84c", color:"#103d25", border:"none", padding:"14px 30px", borderRadius:"8px", fontSize:"15px", fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 16px rgba(201,168,76,0.4)", transition:"background 0.2s,transform 0.15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#e8c97a"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#c9a84c"; e.currentTarget.style.transform="none"; }}>Explore Courses</button>
            <button onClick={() => navigate("contact")} style={{ background:"transparent", color:"#fff", border:"2px solid rgba(255,255,255,0.7)", padding:"14px 30px", borderRadius:"8px", fontSize:"15px", fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", backdropFilter:"blur(4px)", transition:"border-color 0.2s,background 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="#fff"; e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.7)"; e.currentTarget.style.background="transparent"; }}>Get In Touch</button>
          </div>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"#0d3020", borderBottom:"2px solid #c9a84c" }}>
        {STATS.map((s,i) => (
          <div key={i} style={{ padding:"26px 16px", textAlign:"center", borderRight:i<3?"1px solid rgba(255,255,255,0.08)":"none" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"28px", color:"#e8c97a" }}>{s.num}</div>
            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.55)", marginTop:"4px", fontFamily:"'DM Sans',sans-serif", letterSpacing:"0.5px" }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Faculty Slider ─────────────────────────────────────────────── */}
      <div style={{ background:"#0d3020", padding:"60px 32px" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"32px", flexWrap:"wrap", gap:"16px" }}>
            <div>
              <div style={{ display:"inline-block", background:"rgba(201,168,76,0.15)", border:"1px solid rgba(201,168,76,0.4)", color:"#c9a84c", padding:"4px 14px", borderRadius:"20px", fontSize:"11px", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom:"10px" }}>Our Leadership</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,30px)", color:"#ffffff", margin:0, fontWeight:700 }}>Meet the Faculty</h2>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <button className="faculty-nav-btn" onClick={() => goToFaculty((activeFaculty-1+FACULTY.length)%FACULTY.length)}>‹</button>
              <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                {FACULTY.map((_,i) => <button key={i} className="faculty-dot" onClick={() => goToFaculty(i)} style={{ background:activeFaculty===i?"#c9a84c":"rgba(255,255,255,0.25)", transform:activeFaculty===i?"scale(1.3)":"scale(1)" }} />)}
              </div>
              <button className="faculty-nav-btn" onClick={() => goToFaculty((activeFaculty+1)%FACULTY.length)}>›</button>
            </div>
          </div>
          <div style={{ borderRadius:"18px", overflow:"hidden", border:"1px solid rgba(201,168,76,0.25)", boxShadow:"0 20px 60px rgba(0,0,0,0.35)" }}>
            <div key={activeFaculty} className="faculty-inner faculty-card-content" style={{ display:"flex", flexDirection:"row", opacity:animating?0:1, transition:"opacity 0.3s ease" }}>
              <div className="faculty-photo-wrap" style={{ width:"300px", minWidth:"300px", height:"340px", position:"relative", flexShrink:0 }}>
                {f.img ? <img src={f.img} alt={f.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} /> : (
                  <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#0d3020 0%,#1a5c3a 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:"52px", marginBottom:"8px" }}>{f.badge}</span>
                    <span style={{ fontSize:"13px", color:"rgba(201,168,76,0.6)", fontFamily:"'DM Sans',sans-serif" }}>Photo Coming Soon</span>
                  </div>
                )}
                <div style={{ position:"absolute", bottom:"16px", left:"16px", background:"#c9a84c", color:"#0d3020", padding:"5px 14px", borderRadius:"20px", fontSize:"12px", fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>{f.role}</div>
              </div>
              <div className="faculty-text-wrap" style={{ flex:1, background:"#112c1a", padding:"40px 36px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <div style={{ fontSize:"12px", color:"rgba(201,168,76,0.5)", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1px", marginBottom:"16px" }}>{String(activeFaculty+1).padStart(2,"0")} / {String(FACULTY.length).padStart(2,"0")}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,2.5vw,26px)", color:"#ffffff", margin:"0 0 6px", fontWeight:700, lineHeight:1.2 }}>{f.name}</h3>
                <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", color:"#c9a84c", fontSize:"13px", fontWeight:600, fontFamily:"'DM Sans',sans-serif", marginBottom:"20px" }}>
                  <span style={{ width:"24px", height:"2px", background:"#c9a84c", borderRadius:"2px", display:"inline-block" }} />{f.role}
                </div>
                <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.75)", lineHeight:1.8, margin:"0 0 28px", fontFamily:"'DM Sans',sans-serif" }}>{f.desc}</p>
                <div style={{ marginTop:"auto" }}>
                  <div style={{ height:"3px", background:"rgba(255,255,255,0.08)", borderRadius:"3px", overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:"3px", background:"linear-gradient(90deg,#c9a84c,#e8c97a)", width:`${((activeFaculty+1)/FACULTY.length)*100}%`, transition:"width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:"12px", marginTop:"20px", justifyContent:"center", flexWrap:"wrap" }}>
            {FACULTY.map((member,i) => (
              <button key={i} onClick={() => goToFaculty(i)} style={{ width:"64px", height:"64px", borderRadius:"12px", border:activeFaculty===i?"2px solid #c9a84c":"2px solid rgba(255,255,255,0.1)", overflow:"hidden", cursor:"pointer", padding:0, transition:"all 0.3s ease", opacity:activeFaculty===i?1:0.55, transform:activeFaculty===i?"scale(1.1)":"scale(1)", flexShrink:0 }}>
                {member.img ? <img src={member.img} alt={member.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : (
                  <div style={{ width:"100%", height:"100%", background:"#0d3020", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>{member.badge}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery Section ────────────────────────────────────────────── */}
      <div style={{ background:"#071810", padding:"70px 32px" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"36px", flexWrap:"wrap", gap:"16px" }}>
            <div>
              <div style={{ display:"inline-block", background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.35)", color:"#c9a84c", padding:"4px 14px", borderRadius:"20px", fontSize:"11px", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom:"10px" }}>Campus Life</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,3vw,34px)", color:"#ffffff", margin:0, fontWeight:700 }}>Gallery</h2>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.45)", fontFamily:"'DM Sans',sans-serif", marginTop:"8px", marginBottom:0 }}>A glimpse into our vibrant campus and events</p>
            </div>
            <button className="more-btn" onClick={() => navigate("gallery")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              More Images
            </button>
          </div>

          <div className="gallery-grid">
            {GALLERY_ITEMS.map((item, i) => (
              <GalleryCard key={i} item={item} index={i} onOpen={setLightboxIndex} />
            ))}
          </div>

          <div style={{ textAlign:"center", marginTop:"40px" }}>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)", fontFamily:"'DM Sans',sans-serif", marginBottom:"16px" }}>
              Showing 4 photos & 2 videos · Visit the full gallery for more
            </p>
            <button className="more-btn" onClick={() => navigate("gallery")} style={{ padding:"14px 44px" }}>
              View Full Gallery
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft:"4px" }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Access ───────────────────────────────────────────────── */}
      <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"56px 32px" }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"26px", color:"#103d25", marginBottom:"28px" }}>Quick Access</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"20px" }}>
          {CARDS.map(c => (
            <button key={c.page} onClick={() => navigate(c.page)} style={{ background:"#fff", border:"1px solid #e9ecef", borderRadius:"14px", padding:"28px 22px", textAlign:"left", cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", transition:"transform 0.2s,box-shadow 0.2s", fontFamily:"'DM Sans',sans-serif" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.05)"; }}>
              <div style={{ fontSize:"34px", marginBottom:"12px" }}>{c.icon}</div>
              <div style={{ fontSize:"16px", fontWeight:600, color:"#103d25", marginBottom:"7px" }}>{c.label}</div>
              <div style={{ fontSize:"13px", color:"#6b7280", lineHeight:1.6 }}>{c.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}