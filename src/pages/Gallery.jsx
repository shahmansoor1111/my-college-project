import { useState } from "react";
import PageLayout from "../components/PageLayout";
import one from "../img/1.jpeg"
import two from "../img/2.jpeg"
import three from "../img/3.jpeg"
import four from "../img/4.jpeg"
import five from "../img/5.jpeg"
import six from "../img/6.jpeg"
import seven from "../img/7.jpeg"
import eight from "../img/8.jpeg"
import nine from "../img/9.jpeg"
import ten from "../img/10.jpeg"
import eleven from "../img/11.jpeg"
import twelve from "../img/12.jpeg"
import thirteen from "../img/13.jpeg"
import gall2 from "../img/gall2.jpeg"
import gall1 from "../img/gall1.jpeg"
import vid1 from "../img/v1.mp4"
import vid2 from "../img/v2.mp4"
import vid3 from "../img/v3.mp4"
import vid4 from "../img/v4.mp4"
import grade1 from "../img/grad1.avif"
import grade2 from "../img/grad2.avif"
import hall1 from "../img/hal1.avif"

import pp1 from "../img/p1.avif"


// ── REPLACE these imports with your actual image files ──
// import img1 from "../assets/gallery/img1.jpg";
// import img2 from "../assets/gallery/img2.jpg";
// ... etc

// For now using placeholder colors — swap src values with your imports
const IMAGES = [
  { id: 1,  src: one, category: "Campus",  caption: "Main Building Front View" },
  { id: 2,  src: two, category: "Campus",  caption: "Principals" },
  { id: 3,  src: thirteen, category: "Campus",  caption: "College Grounds & Garden" },
  { id: 4,  src: five, category: "Campus",  caption: "Library Interior" },
  { id: 5,  src: twelve, category: "Campus",  caption: "inside Laboratory" },
  { id: 6,  src: three, category: "Campus",  caption: "Computer Block" },
  { id: 7,  src: gall2, category: "Events",  caption: "Annual Prize Distribution" },
  { id: 8,  src: four, category: "Events",  caption: "Cricket Ground" },
  { id: 9,  src: eight, category: "Events",  caption: "Islmic Center" },
  { id: 10, src: gall1, category: "Events",  caption: "Welcome Ceremony New Students" },
  { id: 11, src: null, category: "Events",  caption: "Science Exhibition" },
  { id: 12, src: null, category: "Events",  caption: "Cultural Fest Performance" },
  { id: 13, src: null, category: "Sports",  caption: "Cricket Match Finals" },
  { id: 14, src: null, category: "Sports",  caption: "Football Tournament" },
  { id: 15, src: null, category: "Sports",  caption: "Athletics Sports Day" },
  { id: 16, src: null, category: "Sports",  caption: "Basketball Court Action" },
  { id: 17, src: null, category: "Academic", caption: "Classroom Session" },
  { id: 18, src: null, category: "Academic", caption: "Students in Discussion" },
  { id: 19, src: null, category: "Academic", caption: "Examination Hall" },
  { id: 20, src: null, category: "Academic", caption: "Faculty Meeting" },
];

// ── REPLACE these with your actual video files or YouTube embed URLs ──
// import vid1 from "../assets/gallery/vid1.mp4";
const VIDEOS = [
  { id: 1, src: vid1, thumb: grade1, caption: "Graduation Cermony",        duration: "3:25" },
  { id: 2, src: vid2, thumb: pp1, caption: "Final Year Project",  duration: "1:22" },
  { id: 3, src: vid3, thumb: grade2, caption: "Short Clip Graduation Ceremony",   duration: "0:57" },
  { id: 4, src: vid4, thumb: hall1, caption: "Respectable Guests",       duration: "0:24" },
  { id: 5, src: null, thumb: gall1, caption: "Students & Faculty Interview",  duration: "5:20" },
];

const CATEGORIES = ["All", "Campus", "Events", "Sports", "Academic"];

const PLACEHOLDER_COLORS = [
  "#1a5c38","#2a7a4e","#103d25","#c9a84c","#8a6a1a",
  "#1a5c38","#2a7a4e","#103d25","#c9a84c","#8a6a1a",
  "#1a5c38","#2a7a4e","#103d25","#c9a84c","#8a6a1a",
  "#1a5c38","#2a7a4e","#103d25","#c9a84c","#8a6a1a",
];

export default function Gallery({ navigate }) {
  const [activeTab, setActiveTab]       = useState("Photos");
  const [activeCategory, setCategory]   = useState("All");
  const [lightbox, setLightbox]         = useState(null); // { type, item }
  const [videoPlaying, setVideoPlaying] = useState(null);

  const filteredImages = activeCategory === "All"
    ? IMAGES
    : IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = (type, item) => setLightbox({ type, item });
  const closeLightbox = () => { setLightbox(null); setVideoPlaying(null); };

  const lightboxNav = (dir) => {
    if (!lightbox) return;
    if (lightbox.type === "image") {
      const idx = filteredImages.findIndex(i => i.id === lightbox.item.id);
      const next = filteredImages[(idx + dir + filteredImages.length) % filteredImages.length];
      setLightbox({ type: "image", item: next });
    }
  };

  return (
    <PageLayout navigate={navigate} icon="🖼️" title="Gallery" breadcrumb="Gallery">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }

        .gallery-img-card {
          border-radius: 12px; overflow: hidden; cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: transform 0.25s, box-shadow 0.25s;
          animation: fadeUp 0.45s ease both;
          position: relative; background: #e5e7eb;
          aspect-ratio: 4/3;
        }
        .gallery-img-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 14px 36px rgba(0,0,0,0.18); }
        .gallery-img-card:hover .img-overlay { opacity: 1; }
        .img-overlay {
          position: absolute; inset: 0; opacity: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%);
          transition: opacity 0.25s;
          display: flex; align-items: flex-end; padding: 14px;
        }

        .video-card {
          border-radius: 14px; overflow: hidden; cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transition: transform 0.25s, box-shadow 0.25s;
          animation: fadeUp 0.45s ease both;
          background: #0f2418;
        }
        .video-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,0,0,0.22); }
        .video-card:hover .play-btn { transform: scale(1.12); background: #c9a84c; }

        .play-btn {
          width: 54px; height: 54px; border-radius: 50%;
          background: rgba(201,168,76,0.85);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, background 0.2s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        .tab-btn {
          padding: 10px 26px; border-radius: 8px; border: none; cursor: pointer;
          font-family: "DM Sans",sans-serif; font-size: 14px; font-weight: 600;
          transition: all 0.2s;
        }
        .cat-btn {
          padding: 7px 18px; border-radius: 20px; border: 1.5px solid #e5e7eb;
          background: #fff; cursor: pointer; font-family: "DM Sans",sans-serif;
          font-size: 13px; font-weight: 500; color: #6b7280;
          transition: all 0.18s;
        }
        .cat-btn.active { background: #103d25; color: #fff; border-color: #103d25; }
        .cat-btn:not(.active):hover { border-color: #103d25; color: #103d25; }

        /* Lightbox */
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.92);
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.2s ease;
          padding: 20px;
        }
        .lightbox-content {
          position: relative; max-width: 900px; width: 100%;
          animation: scaleIn 0.22s ease;
        }
        .lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.12); border: none; color: #fff;
          font-size: 20px; cursor: pointer; display: flex;
          align-items: center; justify-content: center;
          transition: background 0.2s; z-index: 2;
        }
        .lb-nav:hover { background: rgba(201,168,76,0.7); }
        .lb-close {
          position: absolute; top: -48px; right: 0;
          background: none; border: none; color: rgba(255,255,255,0.7);
          font-size: 32px; cursor: pointer; line-height: 1;
          transition: color 0.2s;
        }
        .lb-close:hover { color: #c9a84c; }

        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
          .video-grid   { grid-template-columns: 1fr !important; }
          .stats-bar    { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ── STATS BAR ── */}
      <div className="stats-bar" style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        gap: "16px", marginBottom: "40px",
      }}>
        {[
          { icon: "🖼️", num: "20", lbl: "Photos" },
          { icon: "🎬", num: "5",  lbl: "Videos" },
          { icon: "📅", num: "4",  lbl: "Categories" },
          { icon: "🏫", num: "75+", lbl: "Years of Memories" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: "14px", padding: "22px 18px",
            textAlign: "center", border: "1px solid #e9ecef",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            animation: `fadeUp 0.4s ease ${i*0.07}s both`,
          }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "26px", color: "#103d25", fontWeight: 700 }}>{s.num}</div>
            <div style={{ fontSize: "12px", color: "#6b7280", fontFamily: "'DM Sans',sans-serif", marginTop: "3px", textTransform: "uppercase", letterSpacing: "0.6px" }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── TABS: Photos / Videos ── */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
        {["Photos", "Videos"].map(tab => (
          <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab)} style={{
            background: activeTab === tab ? "#103d25" : "#fff",
            color: activeTab === tab ? "#fff" : "#6b7280",
            border: activeTab === tab ? "none" : "1.5px solid #e5e7eb",
          }}>
            {tab === "Photos" ? `🖼️ Photos (${IMAGES.length})` : `🎬 Videos (${VIDEOS.length})`}
          </button>
        ))}
      </div>

      {/* ── PHOTOS TAB ── */}
      {activeTab === "Photos" && (
        <>
          {/* Category filter */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`cat-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setCategory(cat)}>
                {cat} {cat !== "All" && `(${IMAGES.filter(i => i.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "14px",
            marginBottom: "16px",
          }}>
            {filteredImages.map((img, i) => (
              <div key={img.id} className="gallery-img-card"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => openLightbox("image", img)}
              >
                {/* ── SWAP img.src with your actual imported image ── */}
                {img.src ? (
                  <img src={img.src} alt={img.caption}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    background: `linear-gradient(135deg, ${PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]}cc, ${PLACEHOLDER_COLORS[(i+1) % PLACEHOLDER_COLORS.length]}88)`,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "8px",
                  }}>
                    <span style={{ fontSize: "32px", opacity: 0.7 }}>🖼️</span>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif", textAlign: "center", padding: "0 8px" }}>
                      img{img.id}.jpg
                    </span>
                  </div>
                )}
                <div className="img-overlay">
                  <div>
                    <div style={{ fontSize: "11px", color: "#e8c97a", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "3px" }}>{img.category}</div>
                    <div style={{ fontSize: "13px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{img.caption}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "'DM Sans',sans-serif", textAlign: "center", marginTop: "8px" }}>
            Click any photo to view full size
          </p>
        </>
      )}

      {/* ── VIDEOS TAB ── */}
      {activeTab === "Videos" && (
        <div className="video-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {VIDEOS.map((vid, i) => (
            <div key={vid.id} className="video-card"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => openLightbox("video", vid)}
            >
              {/* Thumbnail area */}
              <div style={{
                height: "180px", position: "relative", overflow: "hidden",
                background: `linear-gradient(135deg, ${PLACEHOLDER_COLORS[i*2 % 10]}, ${PLACEHOLDER_COLORS[(i*2+1) % 10]})`,
              }}>
                {vid.thumb ? (
                  <img src={vid.thumb} alt={vid.caption}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{
                    width: "100%", height: "100%", display: "flex",
                    alignItems: "center", justifyContent: "center",
                  }}>
                    <div className="play-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#103d25">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                {/* Duration badge */}
                <div style={{
                  position: "absolute", bottom: "10px", right: "10px",
                  background: "rgba(0,0,0,0.7)", color: "#fff",
                  padding: "3px 8px", borderRadius: "4px",
                  fontSize: "12px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                }}>{vid.duration}</div>
              </div>

              {/* Info */}
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "rgba(201,168,76,0.2)", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9a84c">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>
                    {vid.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button className="lb-close" onClick={closeLightbox}>×</button>

            {lightbox.type === "image" && (
              <>
                {/* Prev */}
                <button className="lb-nav" style={{ left: "-56px" }} onClick={() => lightboxNav(-1)}>‹</button>

                {/* Image */}
                <div style={{ borderRadius: "14px", overflow: "hidden", background: "#1a1a1a", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {lightbox.item.src ? (
                    <img src={lightbox.item.src} alt={lightbox.item.caption}
                      style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", display: "block" }} />
                  ) : (
                    <div style={{
                      width: "100%", minHeight: "360px",
                      background: `linear-gradient(135deg, ${PLACEHOLDER_COLORS[lightbox.item.id % 10]}bb, ${PLACEHOLDER_COLORS[(lightbox.item.id+1) % 10]}66)`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
                    }}>
                      <span style={{ fontSize: "56px" }}>🖼️</span>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans',sans-serif", fontSize: "14px" }}>
                        Replace src with: img{lightbox.item.id}.jpg
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div style={{
                  marginTop: "14px", textAlign: "center", padding: "0 8px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: "11px", color: "#e8c97a", fontFamily: "'DM Sans',sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>{lightbox.item.category}</span>
                  <span style={{ fontSize: "14px", color: "#fff", fontFamily: "'Playfair Display',serif" }}>{lightbox.item.caption}</span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
                    {filteredImages.findIndex(i => i.id === lightbox.item.id) + 1} / {filteredImages.length}
                  </span>
                </div>

                {/* Next */}
                <button className="lb-nav" style={{ right: "-56px" }} onClick={() => lightboxNav(1)}>›</button>
              </>
            )}

            {lightbox.type === "video" && (
              <div style={{ borderRadius: "14px", overflow: "hidden", background: "#000" }}>
                {lightbox.item.src ? (
                  <video controls autoPlay src={lightbox.item.src}
                    style={{ width: "100%", maxHeight: "75vh", display: "block" }} />
                ) : (
                  <div style={{
                    minHeight: "360px",
                    background: "linear-gradient(135deg, #103d25, #0b1f11)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px",
                  }}>
                    <span style={{ fontSize: "60px" }}>🎬</span>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans',sans-serif", fontSize: "15px", textAlign: "center", padding: "0 32px" }}>
                      Replace <code style={{ color: "#e8c97a" }}>src: null</code> with your video file import for:<br/>
                      <strong style={{ color: "#fff" }}>{lightbox.item.caption}</strong>
                    </p>
                  </div>
                )}
                <div style={{ padding: "14px 20px", background: "#0f1a12" }}>
                  <span style={{ fontSize: "15px", color: "#fff", fontFamily: "'Playfair Display',serif" }}>{lightbox.item.caption}</span>
                  <span style={{ float: "right", color: "#e8c97a", fontFamily: "'DM Sans',sans-serif", fontSize: "13px" }}>{lightbox.item.duration}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </PageLayout>
  );
}