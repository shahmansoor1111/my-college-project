import { useState } from "react";
import PageLayout from "../components/PageLayout";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const PROGRAMMES = [
  { id: "fsc-cs",      label: "FSc Computer Science", type: "Intermediate", minPct: 45 },
  { id: "pre-medical", label: "FSc Pre-Medical",       type: "Intermediate", minPct: 60 },
  { id: "arts",        label: "Arts (FA)",             type: "Intermediate", minPct: 40 },
  { id: "bs-cs",       label: "BS Computer Science",  type: "BS Degree",    minPct: 45 },
  { id: "bba",         label: "BBA",                  type: "BS Degree",    minPct: 45 },
  { id: "bs-polsci",   label: "BS Political Science", type: "BS Degree",    minPct: 45 },
  { id: "bs-english",  label: "BS English",           type: "BS Degree",    minPct: 45 },
];

const BACKGROUNDS = ["Science (Physics/Maths)","Science (Bio/Chem)","Arts / Humanities","Commerce","Computer Science (ICS)","Other"];

// ─── DECISION ENGINE ─────────────────────────────────────────────────────────
function analyze({ name, pct, programme, background, email, cnic }) {
  const prog = PROGRAMMES.find(p => p.id === programme);
  const num  = parseFloat(pct);
  const id   = Math.random().toString(36).substr(2,8).toUpperCase();

  // Eligibility check first
  if (num < prog.minPct) {
    return {
      id, name, email, programme: prog.label, pct: num,
      status: "REJECTED",
      statusColor: "#dc2626", statusBg: "rgba(220,38,38,0.08)", statusBorder: "rgba(220,38,38,0.2)",
      statusIcon: "❌",
      reason: `Your percentage (${num}%) is below the minimum eligibility of ${prog.minPct}% for ${prog.label}.`,
      recommendation: recommendCourse(num, background),
      strength: getStrength(num),
      advice: getAdvice("REJECTED", num),
    };
  }

  // Decision by marks
  let status, statusColor, statusBg, statusBorder, statusIcon;
  if (num >= 80) {
    status = "ACCEPTED"; statusColor = "#1a5c38";
    statusBg = "rgba(26,92,56,0.08)"; statusBorder = "rgba(26,92,56,0.25)";
    statusIcon = "✅";
  } else if (num >= 60) {
    status = "WAITLISTED"; statusColor = "#c9a84c";
    statusBg = "rgba(201,168,76,0.1)"; statusBorder = "rgba(201,168,76,0.3)";
    statusIcon = "⏳";
  } else {
    status = "REJECTED"; statusColor = "#dc2626";
    statusBg = "rgba(220,38,38,0.08)"; statusBorder = "rgba(220,38,38,0.2)";
    statusIcon = "❌";
  }

  return {
    id, name, email, programme: prog.label, pct: num,
    status, statusColor, statusBg, statusBorder, statusIcon,
    reason: getReason(status, num, prog),
    recommendation: recommendCourse(num, background),
    strength: getStrength(num),
    advice: getAdvice(status, num),
    cnic,
  };
}

function getReason(status, pct, prog) {
  if (status === "ACCEPTED")
    return `Outstanding academic profile! Your ${pct}% marks well exceed the requirements for ${prog.label}. You are a strong candidate.`;
  if (status === "WAITLISTED")
    return `Your ${pct}% marks meet the minimum requirement, but a seat is not immediately guaranteed. You are on the waitlist and will be considered if a seat becomes available.`;
  return `Your ${pct}% marks do not meet the eligibility threshold for ${prog.label}. Consider improving your grades and reapplying.`;
}

function getStrength(pct) {
  if (pct >= 85) return { label: "Excellent",   color: "#1a5c38", pct: 95 };
  if (pct >= 75) return { label: "Good",         color: "#0e7490", pct: 78 };
  if (pct >= 60) return { label: "Average",      color: "#c9a84c", pct: 60 };
  if (pct >= 45) return { label: "Below Average",color: "#ea580c", pct: 45 };
  return                { label: "Weak",          color: "#dc2626", pct: 25 };
}

function recommendCourse(pct, background) {
  const recs = [];
  if (background === "Science (Physics/Maths)" || background === "Computer Science (ICS)") {
    if (pct >= 60) recs.push("💻 BS Computer Science");
    recs.push("💻 FSc Computer Science");
  }
  if (background === "Science (Bio/Chem)") {
    if (pct >= 60) recs.push("🔬 FSc Pre-Medical");
    recs.push("💻 FSc Computer Science");
  }
  if (background === "Commerce") {
    recs.push("📊 BBA"); recs.push("🏛️ BS Political Science");
  }
  if (background === "Arts / Humanities") {
    recs.push("📚 BS English"); recs.push("🏛️ BS Political Science"); recs.push("🎨 Arts (FA)");
  }
  if (!recs.length) {
    if (pct >= 70) { recs.push("💻 BS Computer Science"); recs.push("📊 BBA"); }
    else { recs.push("🎨 Arts (FA)"); recs.push("📊 BBA"); }
  }
  return recs.slice(0, 3);
}

function getAdvice(status, pct) {
  if (status === "ACCEPTED")
    return "Congratulations! Submit your original documents, paid fee challan, and two passport-size photographs to the admission office within 5 working days to confirm your seat.";
  if (status === "WAITLISTED")
    return "Your application is under review. Check back regularly for status updates. To improve your chances, ensure all documents are complete and submitted on time.";
  return "Don't be discouraged! Focus on improving your grades, consider the recommended programmes, or retake your exams. Many successful people faced rejection before achieving great things.";
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function InputField({ label, name, type="text", value, onChange, placeholder, required, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:600, color:"#374151", marginBottom:"7px" }}>
        {label} {required && <span style={{color:"#dc2626"}}>*</span>}
      </label>
      {children || (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
          style={{
            width:"100%", padding:"11px 14px", border:"1.5px solid #e5e7eb", borderRadius:"9px",
            fontFamily:"'DM Sans',sans-serif", fontSize:"14px", color:"#1a1a1a", background:"#fafafa",
            transition:"border-color 0.2s", outline:"none",
          }}
          onFocus={e=>e.target.style.borderColor="#103d25"}
          onBlur={e=>e.target.style.borderColor="#e5e7eb"}
        />
      )}
    </div>
  );
}

function SelectField({ label, name, value, onChange, required, options }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:600, color:"#374151", marginBottom:"7px" }}>
        {label} {required && <span style={{color:"#dc2626"}}>*</span>}
      </label>
      <select name={name} value={value} onChange={onChange} required={required}
        style={{
          width:"100%", padding:"11px 14px", border:"1.5px solid #e5e7eb", borderRadius:"9px",
          fontFamily:"'DM Sans',sans-serif", fontSize:"14px", color: value?"#1a1a1a":"#9ca3af",
          background:"#fafafa", outline:"none", cursor:"pointer",
          transition:"border-color 0.2s",
        }}
        onFocus={e=>e.target.style.borderColor="#103d25"}
        onBlur={e=>e.target.style.borderColor="#e5e7eb"}
      >
        <option value="">— Select —</option>
        {options.map(o => <option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
      </select>
    </div>
  );
}

// ─── RESULT CARD ─────────────────────────────────────────────────────────────
function ResultCard({ result, onReset }) {
  const barW = Math.min(result.pct, 100);
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      {/* Status banner */}
      <div style={{
        background: result.status === "ACCEPTED"
          ? "linear-gradient(135deg,#103d25,#1a5c38)"
          : result.status === "WAITLISTED"
          ? "linear-gradient(135deg,#78580a,#c9a84c)"
          : "linear-gradient(135deg,#7f1d1d,#dc2626)",
        borderRadius:"18px", padding:"40px 36px", marginBottom:"24px",
        position:"relative", overflow:"hidden",
        boxShadow: result.status === "ACCEPTED" ? "0 12px 40px rgba(16,61,37,0.3)"
          : result.status === "WAITLISTED" ? "0 12px 40px rgba(201,168,76,0.3)"
          : "0 12px 40px rgba(220,38,38,0.3)",
      }}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"180px",height:"180px",borderRadius:"50%",background:"rgba(255,255,255,0.07)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"flex-start",gap:"18px",flexWrap:"wrap"}}>
          <div style={{fontSize:"52px",lineHeight:1}}>{result.statusIcon}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",marginBottom:"6px"}}>
              Application ID: {result.id}
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,30px)",color:"#fff",marginBottom:"6px"}}>
              {result.status === "ACCEPTED" ? "Congratulations!" : result.status === "WAITLISTED" ? "On Waitlist" : "Application Not Selected"}
            </h2>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"rgba(255,255,255,0.8)",marginBottom:"14px"}}>
              {result.name} — {result.programme}
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:"10px",background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"10px",padding:"8px 18px"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#fff",fontWeight:700}}>{result.pct}%</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.7)"}}>Your Marks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"}}>

        {/* Profile strength */}
        <div style={{background:"#fff",borderRadius:"14px",padding:"24px",border:"1px solid #e9ecef",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"12px"}}>Profile Strength</div>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:result.strength.color,fontWeight:700}}>{result.strength.label}</span>
          </div>
          <div style={{background:"#f3f4f6",borderRadius:"6px",height:"10px",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:"6px",background:`linear-gradient(90deg,${result.strength.color},${result.strength.color}88)`,width:`${result.strength.pct}%`,transition:"width 1.2s ease"}}/>
          </div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",marginTop:"8px"}}>{result.pct}% — {result.strength.label} academic profile</div>
        </div>

        {/* Decision reason */}
        <div style={{background:"#fff",borderRadius:"14px",padding:"24px",border:`1.5px solid ${result.statusBorder}`,background:result.statusBg,boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"12px"}}>Decision Reason</div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#374151",lineHeight:1.7}}>{result.reason}</p>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{background:"#fff",borderRadius:"14px",padding:"24px",border:"1px solid #e9ecef",marginBottom:"16px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"14px"}}>🎯 Recommended Programmes for You</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
          {result.recommendation.map((r,i)=>(
            <div key={i} style={{background:"rgba(16,61,37,0.07)",border:"1.5px solid rgba(16,61,37,0.2)",borderRadius:"10px",padding:"10px 18px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#103d25",fontWeight:600}}>
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div style={{background:"linear-gradient(135deg,#faf3e0,#fff8e8)",border:"1.5px solid #e8c97a",borderRadius:"14px",padding:"22px 26px",marginBottom:"24px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#8a6a1a",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"10px"}}>📌 Next Steps</div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.75}}>{result.advice}</p>
      </div>

      {/* Action buttons */}
      <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
        <button onClick={onReset} style={{background:"linear-gradient(135deg,#103d25,#1a5c38)",color:"#fff",border:"none",padding:"12px 26px",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(16,61,37,0.3)"}}>
          ← Apply Again
        </button>
        <button onClick={()=>window.print()} style={{background:"#fff",color:"#103d25",border:"2px solid #103d25",padding:"12px 26px",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,cursor:"pointer"}}>
          🖨 Print Result
        </button>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard({ applications, onOverride, onClose }) {
  const counts = {
    ACCEPTED:   applications.filter(a=>a.status==="ACCEPTED").length,
    WAITLISTED: applications.filter(a=>a.status==="WAITLISTED").length,
    REJECTED:   applications.filter(a=>a.status==="REJECTED").length,
  };

  return (
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"24px",flexWrap:"wrap",gap:"12px"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#103d25"}}>🛡️ Admin Dashboard</h3>
        <button onClick={onClose} style={{background:"none",border:"1.5px solid #e5e7eb",borderRadius:"8px",padding:"7px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#6b7280"}}>← Back</button>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px",marginBottom:"24px"}}>
        {[
          {label:"Accepted",   val:counts.ACCEPTED,   color:"#1a5c38", bg:"rgba(26,92,56,0.08)",   icon:"✅"},
          {label:"Waitlisted", val:counts.WAITLISTED, color:"#c9a84c", bg:"rgba(201,168,76,0.1)",  icon:"⏳"},
          {label:"Rejected",   val:counts.REJECTED,   color:"#dc2626", bg:"rgba(220,38,38,0.08)", icon:"❌"},
        ].map((s,i)=>(
          <div key={i} style={{background:s.bg,border:`1.5px solid ${s.color}30`,borderRadius:"12px",padding:"20px",textAlign:"center"}}>
            <div style={{fontSize:"28px",marginBottom:"6px"}}>{s.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"28px",color:s.color,fontWeight:700}}>{s.val}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",marginTop:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Applications table */}
      {applications.length === 0 ? (
        <div style={{background:"#fff",borderRadius:"14px",border:"2px dashed #e5e7eb",padding:"60px",textAlign:"center"}}>
          <div style={{fontSize:"48px",marginBottom:"12px"}}>📋</div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"#9ca3af"}}>No applications yet. Submit one using the form.</p>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {applications.map((app,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:"12px",padding:"18px 20px",border:"1px solid #e9ecef",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:"200px"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#103d25",marginBottom:"3px"}}>{app.name}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12.5px",color:"#6b7280"}}>{app.programme} · {app.pct}% · ID: {app.id}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
                <span style={{
                  background: app.status==="ACCEPTED"?"rgba(26,92,56,0.1)":app.status==="WAITLISTED"?"rgba(201,168,76,0.12)":"rgba(220,38,38,0.08)",
                  color: app.status==="ACCEPTED"?"#1a5c38":app.status==="WAITLISTED"?"#8a6a1a":"#dc2626",
                  border: `1px solid ${app.status==="ACCEPTED"?"rgba(26,92,56,0.3)":app.status==="WAITLISTED"?"rgba(201,168,76,0.35)":"rgba(220,38,38,0.25)"}`,
                  padding:"5px 14px",borderRadius:"20px",
                  fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,
                }}>{app.status}</span>
                <select value={app.status} onChange={e=>onOverride(i,e.target.value)}
                  style={{padding:"6px 10px",border:"1.5px solid #e5e7eb",borderRadius:"8px",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",cursor:"pointer",background:"#fafafa"}}>
                  <option value="ACCEPTED">✅ Accept</option>
                  <option value="WAITLISTED">⏳ Waitlist</option>
                  <option value="REJECTED">❌ Reject</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AITutor({ navigate }) {
  const [view, setView] = useState("home");   // home | form | result | admin
  const [form, setForm] = useState({ name:"", email:"", cnic:"", pct:"", programme:"", background:"" });
  const [result, setResult]       = useState(null);
  const [applications, setApps]   = useState([]);
  const [adminPass, setAdminPass] = useState("");
  const [adminErr, setAdminErr]   = useState(false);
  const [errors, setErrors]       = useState({});

  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}));

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name       = "Full name is required";
    if (!form.email.includes("@")) e.email    = "Valid email required";
    if (!form.cnic.trim())       e.cnic       = "CNIC / Roll number required";
    if (!form.pct || isNaN(form.pct) || +form.pct<0 || +form.pct>100) e.pct = "Enter valid marks (0–100)";
    if (!form.programme)         e.programme  = "Select a programme";
    if (!form.background)        e.background = "Select your background";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const res = analyze(form);
    setResult(res);
    setApps(a=>[...a, res]);
    setView("result");
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const adminLogin = () => {
    if (adminPass === "admin123") { setView("admin"); setAdminErr(false); }
    else setAdminErr(true);
  };

  const override = (idx, status) => {
    setApps(a=>a.map((app,i)=>i===idx?{...app,status}:app));
  };

  return (
    <PageLayout navigate={navigate} icon="🧠" title="Smart Admission Intelligence System" breadcrumb="AI Tutor → Admission System">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:640px){
          .details-grid{grid-template-columns:1fr !important;}
          .stats-grid{grid-template-columns:1fr 1fr !important;}
        }
      `}</style>

      {/* ══════════ HOME ══════════ */}
      {view==="home" && (
        <div style={{animation:"fadeUp 0.45s ease"}}>
          {/* Hero */}
          <div style={{background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",borderRadius:"18px",padding:"48px 40px",marginBottom:"32px",position:"relative",overflow:"hidden",boxShadow:"0 12px 40px rgba(16,61,37,0.25)"}}>
            <div style={{position:"absolute",top:"-50px",right:"-50px",width:"220px",height:"220px",borderRadius:"50%",background:"rgba(201,168,76,0.1)",pointerEvents:"none"}}/>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(201,168,76,0.2)",border:"1px solid #c9a84c",color:"#e8c97a",padding:"4px 14px",borderRadius:"20px",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:"20px"}}>
              🧠 AI-Powered System
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,34px)",color:"#fff",marginBottom:"14px",lineHeight:1.25}}>
              Smart Admission Intelligence System
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"rgba(255,255,255,0.75)",maxWidth:"600px",lineHeight:1.75,marginBottom:"32px"}}>
              Submit your academic profile and our intelligent system will instantly analyse your eligibility, give you an admission decision, and recommend the best programme for you — all in seconds.
            </p>
            <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
              <button onClick={()=>setView("form")} style={{background:"#c9a84c",color:"#103d25",border:"none",padding:"14px 30px",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"15px",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(201,168,76,0.4)"}}>
                📋 Apply Now
              </button>
              <button onClick={()=>setView("admin-login")} style={{background:"rgba(255,255,255,0.1)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.35)",padding:"14px 30px",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"15px",fontWeight:500,cursor:"pointer"}}>
                🛡️ Admin Panel
              </button>
            </div>
          </div>

          {/* How it works */}
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#103d25",marginBottom:"20px"}}>How It Works</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"16px",marginBottom:"32px"}}>
            {[
              {step:"01",icon:"📋",title:"Submit Application",desc:"Fill in your name, marks, email, and choose your desired programme."},
              {step:"02",icon:"⚙️",title:"System Analyses",desc:"Our rule engine checks your eligibility and academic strength instantly."},
              {step:"03",icon:"🎯",title:"Smart Decision",desc:"Receive Accept, Waitlist, or Reject status with a detailed explanation."},
              {step:"04",icon:"💡",title:"Course Suggestion",desc:"Get personalised programme recommendations based on your profile."},
            ].map((s,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:"14px",padding:"24px 20px",border:"1px solid #e9ecef",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",animation:`fadeUp 0.4s ease ${i*0.08}s both`}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                  <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#103d25,#1a5c38)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#fff",fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>{s.step}</div>
                  <span style={{fontSize:"22px"}}>{s.icon}</span>
                </div>
                <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",color:"#103d25",marginBottom:"7px"}}>{s.title}</h4>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#6b7280",lineHeight:1.65}}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Decision rules */}
          <div style={{background:"#fff",borderRadius:"16px",padding:"28px 32px",border:"1px solid #e9ecef",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
            <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"18px"}}>📊 Decision Rules</h4>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {[
                {range:"80% and above",  status:"ACCEPTED",   color:"#1a5c38", bg:"rgba(26,92,56,0.08)",  border:"rgba(26,92,56,0.2)",  icon:"✅", desc:"Strong academic profile — direct admission."},
                {range:"60% – 79%",      status:"WAITLISTED", color:"#8a6a1a", bg:"rgba(201,168,76,0.1)", border:"rgba(201,168,76,0.3)", icon:"⏳", desc:"Average profile — placed on waitlist, subject to seat availability."},
                {range:"Below 60%",      status:"REJECTED",   color:"#dc2626", bg:"rgba(220,38,38,0.08)", border:"rgba(220,38,38,0.2)", icon:"❌", desc:"Does not meet minimum requirements."},
              ].map((r,i)=>(
                <div key={i} style={{background:r.bg,border:`1.5px solid ${r.border}`,borderRadius:"10px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
                  <span style={{fontSize:"20px"}}>{r.icon}</span>
                  <div style={{flex:1}}>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:700,color:r.color}}>{r.range}</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#6b7280",marginLeft:"12px"}}>→ {r.desc}</span>
                  </div>
                  <span style={{background:r.color,color:"#fff",padding:"3px 12px",borderRadius:"12px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ APPLICATION FORM ══════════ */}
      {view==="form" && (
        <div style={{animation:"fadeUp 0.4s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"28px",flexWrap:"wrap"}}>
            <button onClick={()=>setView("home")} style={{background:"none",border:"1.5px solid #e5e7eb",borderRadius:"8px",padding:"7px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#6b7280",transition:"all 0.18s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#103d25";e.currentTarget.style.color="#103d25"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.color="#6b7280"}}>← Back</button>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#103d25"}}>📋 Admission Application Form</h3>
          </div>

          <div style={{background:"#fff",borderRadius:"18px",padding:"36px",border:"1px solid #e9ecef",boxShadow:"0 4px 20px rgba(0,0,0,0.06)",maxWidth:"680px"}}>
            {/* Personal info */}
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#c9a84c",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"18px",paddingBottom:"10px",borderBottom:"1px solid #f3f4f6"}}>👤 Personal Information</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
              <div>
                <InputField label="Full Name" name="name" value={form.name} onChange={handle} placeholder="Muhammad Ali Khan" required />
                {errors.name && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#dc2626",marginTop:"-12px",marginBottom:"12px"}}>⚠ {errors.name}</p>}
              </div>
              <div>
                <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handle} placeholder="student@email.com" required />
                {errors.email && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#dc2626",marginTop:"-12px",marginBottom:"12px"}}>⚠ {errors.email}</p>}
              </div>
            </div>
            <InputField label="CNIC / B-Form / Roll Number" name="cnic" value={form.cnic} onChange={handle} placeholder="42101-1234567-1" required />
            {errors.cnic && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#dc2626",marginTop:"-12px",marginBottom:"12px"}}>⚠ {errors.cnic}</p>}

            {/* Academic info */}
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#c9a84c",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",margin:"20px 0 18px",paddingBottom:"10px",borderBottom:"1px solid #f3f4f6"}}>📚 Academic Information</div>

            <InputField label="Matric / Equivalent Marks (%)" name="pct" type="number" value={form.pct} onChange={handle} placeholder="e.g. 75.5" required />
            {errors.pct && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#dc2626",marginTop:"-12px",marginBottom:"12px"}}>⚠ {errors.pct}</p>}

            {form.pct && !isNaN(form.pct) && +form.pct>=0 && +form.pct<=100 && (
              <div style={{marginTop:"-10px",marginBottom:"18px",background:"rgba(16,61,37,0.05)",borderRadius:"8px",padding:"12px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#6b7280"}}>{getStrength(+form.pct).label} Profile</span>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,color:getStrength(+form.pct).color}}>{form.pct}%</span>
                </div>
                <div style={{background:"#e5e7eb",borderRadius:"4px",height:"6px",overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:"4px",background:getStrength(+form.pct).color,width:`${Math.min(+form.pct,100)}%`,transition:"width 0.5s"}}/>
                </div>
              </div>
            )}

            <SelectField label="Previous Academic Background" name="background" value={form.background} onChange={handle} required options={BACKGROUNDS.map(b=>({value:b,label:b}))} />
            {errors.background && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#dc2626",marginTop:"-12px",marginBottom:"12px"}}>⚠ {errors.background}</p>}

            <SelectField label="Desired Programme" name="programme" value={form.programme} onChange={handle} required
              options={PROGRAMMES.map(p=>({value:p.id,label:`${p.label} (${p.type}) — Min ${p.minPct}%`}))} />
            {errors.programme && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#dc2626",marginTop:"-12px",marginBottom:"12px"}}>⚠ {errors.programme}</p>}

            {/* Eligibility preview */}
            {form.programme && form.pct && !isNaN(form.pct) && (
              <div style={{
                marginBottom:"20px",padding:"12px 16px",borderRadius:"10px",
                background: +form.pct >= PROGRAMMES.find(p=>p.id===form.programme)?.minPct ? "rgba(26,92,56,0.07)" : "rgba(220,38,38,0.07)",
                border: `1px solid ${+form.pct >= PROGRAMMES.find(p=>p.id===form.programme)?.minPct ? "rgba(26,92,56,0.2)" : "rgba(220,38,38,0.2)"}`,
              }}>
                {+form.pct >= PROGRAMMES.find(p=>p.id===form.programme)?.minPct
                  ? <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#1a5c38",fontWeight:600}}>✅ You meet the minimum eligibility for this programme.</span>
                  : <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#dc2626",fontWeight:600}}>⚠ Your marks are below the {PROGRAMMES.find(p=>p.id===form.programme)?.minPct}% minimum for this programme.</span>
                }
              </div>
            )}

            <button onClick={submit} style={{width:"100%",background:"linear-gradient(135deg,#103d25,#1a5c38)",color:"#fff",border:"none",padding:"15px",borderRadius:"10px",fontFamily:"'DM Sans',sans-serif",fontSize:"15px",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(16,61,37,0.3)",transition:"opacity 0.2s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.9"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              🚀 Submit Application & Get Decision
            </button>
          </div>
        </div>
      )}

      {/* ══════════ RESULT ══════════ */}
      {view==="result" && result && (
        <ResultCard result={result} onReset={()=>{setView("form");setForm({name:"",email:"",cnic:"",pct:"",programme:"",background:""});setErrors({});}} />
      )}

      {/* ══════════ ADMIN LOGIN ══════════ */}
      {view==="admin-login" && (
        <div style={{animation:"fadeUp 0.4s ease",maxWidth:"420px"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"1.5px solid #e5e7eb",borderRadius:"8px",padding:"7px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#6b7280",marginBottom:"24px"}}>← Back</button>
          <div style={{background:"#fff",borderRadius:"18px",padding:"36px",border:"1px solid #e9ecef",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
            <div style={{textAlign:"center",marginBottom:"24px"}}>
              <div style={{fontSize:"44px",marginBottom:"10px"}}>🛡️</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#103d25",marginBottom:"6px"}}>Admin Login</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#9ca3af"}}>Enter admin password to access the dashboard</p>
            </div>
            <input type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} placeholder="Enter password"
              onKeyDown={e=>e.key==="Enter"&&adminLogin()}
              style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${adminErr?"#dc2626":"#e5e7eb"}`,borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",marginBottom:"14px",outline:"none",transition:"border-color 0.2s"}}
              onFocus={e=>e.target.style.borderColor="#103d25"} onBlur={e=>e.target.style.borderColor=adminErr?"#dc2626":"#e5e7eb"}
            />
            {adminErr && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#dc2626",marginBottom:"12px"}}>⚠ Incorrect password. Default: admin123</p>}
            <button onClick={adminLogin} style={{width:"100%",background:"linear-gradient(135deg,#103d25,#1a5c38)",color:"#fff",border:"none",padding:"13px",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:700,cursor:"pointer"}}>
              Login →
            </button>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11.5px",color:"#c9a84c",textAlign:"center",marginTop:"14px"}}>Default password: admin123 (change in production)</p>
          </div>
        </div>
      )}

      {/* ══════════ ADMIN DASHBOARD ══════════ */}
      {view==="admin" && (
        <AdminDashboard applications={applications} onOverride={override} onClose={()=>setView("home")} />
      )}
    </PageLayout>
  );
}