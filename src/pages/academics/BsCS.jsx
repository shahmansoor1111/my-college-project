import PageLayout from "../../components/PageLayout";

export default function BsCs({ navigate }) {
  return (
    <PageLayout navigate={navigate} icon="💻" title="BS Computer Science" breadcrumb="Academics → BS Programmes → BS Computer Science">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .info-card { background:#fff;border:1px solid #e9ecef;border-radius:16px;padding:28px 26px;box-shadow:0 2px 12px rgba(0,0,0,0.05);animation:fadeUp 0.4s ease both;transition:transform 0.2s,box-shadow 0.2s; }
        .info-card:hover { transform:translateY(-3px);box-shadow:0 10px 28px rgba(15,76,129,0.1); }
        .subject-row { display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #f3f4f6; }
        .subject-row:last-child { border-bottom:none; }
        .fee-row { display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f3f4f6;font-family:"DM Sans",sans-serif;font-size:14px; }
        .fee-row:last-child { border-bottom:none; }
        .sem-card { background:#fff;border-radius:14px;border:1px solid #e9ecef;padding:22px 24px;box-shadow:0 2px 10px rgba(0,0,0,0.05);animation:fadeUp 0.4s ease both; }
        .badge { display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:20px;font-size:11px;font-family:"DM Sans",sans-serif;font-weight:700;letter-spacing:1px;text-transform:uppercase; }
        @media(max-width:640px){
          .two-col{grid-template-columns:1fr !important;}
          .four-col{grid-template-columns:1fr 1fr !important;}
          .hero-banner{padding:32px 22px !important;}
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="hero-banner" style={{
        background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",
        borderRadius:"18px",padding:"44px 40px",marginBottom:"36px",
        position:"relative",overflow:"hidden",
        boxShadow:"0 12px 40px rgba(15,76,129,0.28)"
      }}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"200px",height:"200px",borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-60px",left:"30%",width:"140px",height:"140px",borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
          <span style={{fontSize:"44px"}}>💻</span>
          <div>
            <div className="badge" style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",marginBottom:"8px"}}>
              BS Degree · 4 Years
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,3vw,28px)",color:"#fff",margin:0}}>
              BS Computer Science
            </h2>
          </div>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"rgba(255,255,255,0.82)",maxWidth:"640px",lineHeight:1.75,margin:0}}>
          Master software engineering, artificial intelligence, cybersecurity, and modern technology. Affiliated with the University of Peshawar — one of the most in-demand degrees in Pakistan and globally.
        </p>
      </div>

      {/* ── STATS ── */}
      <div className="four-col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px",marginBottom:"36px"}}>
        {[
          {icon:"📅",label:"Duration",val:"4 Years"},
          {icon:"📆",label:"Semesters",val:"8 Semesters"},
          {icon:"⏰",label:"Timing",val:"8:00 AM – 2:00 PM"},
          {icon:"🎓",label:"Affiliation",val:"Univ. of Peshawar"},
        ].map((s,i)=>(
          <div key={i} style={{
            background:"#fff",borderRadius:"12px",padding:"18px 14px",textAlign:"center",
            border:"1px solid #e9ecef",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
            animation:`fadeUp 0.4s ease ${i*0.07}s both`
          }}>
            <div style={{fontSize:"26px",marginBottom:"6px"}}>{s.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",color:"#103d25",fontWeight:700}}>{s.val}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#9ca3af",marginTop:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── SEMESTER COURSES ── */}
      <div style={{marginBottom:"28px"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"16px"}}>
          📋 Semester-wise Courses
        </h3>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
          {[
            {
              sem:"Semester 1",
              courses:["Programming Fundamentals (C++)","Calculus & Analytical Geometry","Introduction to Computing","Islamic Studies","Pakistan Studies","English Composition"]
            },
            {
              sem:"Semester 2",
              courses:["Object Oriented Programming (Java)","Discrete Mathematics","Digital Logic Design","Communication Skills","Linear Algebra","Lab: OOP"]
            },
            {
              sem:"Semester 3",
              courses:["Data Structures & Algorithms","Computer Organisation & Assembly","Statistics & Probability","Technical Writing","Database Systems","Lab: Data Structures"]
            },
            {
              sem:"Semester 4",
              courses:["Operating Systems","Software Engineering","Computer Networks","Numerical Computing","Web Technologies (HTML/CSS/JS)","Lab: Networks"]
            },
            {
              sem:"Semester 5",
              courses:["Artificial Intelligence","Theory of Automata","Database Administration","Design & Analysis of Algorithms","Elective I","Lab: AI"]
            },
            {
              sem:"Semester 6",
              courses:["Machine Learning","Compiler Construction","Information Security","Mobile App Development","Elective II","Lab: Mobile Dev"]
            },
            {
              sem:"Semester 7",
              courses:["Final Year Project – I","Cloud Computing","Deep Learning / Data Science","Human Computer Interaction","Elective III","Professional Ethics"]
            },
            {
              sem:"Semester 8",
              courses:["Final Year Project – II","Distributed Systems","Elective IV","Elective V","Viva & Defence","Career Development"]
            },
          ].map((s,i)=>(
            <div key={i} className="sem-card" style={{animationDelay:`${i*0.06}s`}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                <div style={{
                  width:"32px",height:"32px",borderRadius:"8px",
                  background:"linear-gradient(135deg,#103d25,#2a7a4e)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"13px",fontWeight:700,color:"#fff",
                  fontFamily:"'DM Sans',sans-serif",flexShrink:0
                }}>{i+1}</div>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#103d25"}}>{s.sem}</span>
              </div>
              {s.courses.map((c,j)=>(
                <div key={j} className="subject-row">
                  <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#2a7a4e",flexShrink:0}}/>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#374151"}}>{c}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEE STRUCTURE ── */}
      <div className="info-card" style={{marginBottom:"28px"}}>
        <div className="badge" style={{background:"rgba(201,168,76,0.12)",color:"#8a6a1a",marginBottom:"16px"}}>
          💰 Fee Structure (Per Semester)
        </div>
        {[
          {label:"Admission Fee (one-time)",       amount:"PKR 3,500"},
          {label:"Tuition Fee (per semester)",      amount:"PKR 10,500"},
          {label:"Examination Fee",                 amount:"PKR 1,800"},
          {label:"Library Fee",                     amount:"PKR 800"},
          {label:"Misc / Lab / Activity Fee",       amount:"PKR 1,200"},
          {label:"Total Per Semester",              amount:"PKR 14,300",  bold:true},
          {label:"Total Programme (8 semesters)",   amount:"PKR 1,14,400 approx.", bold:true},
        ].map((f,i)=>(
          <div key={i} className="fee-row" style={{fontWeight:f.bold?"700":"400",color:f.bold?"#103d25":"#374151"}}>
            <span>{f.label}</span>
            <span style={{color:f.bold?"#1a5c38":"#6b7280",fontWeight:f.bold?"700":"500"}}>{f.amount}</span>
          </div>
        ))}
      </div>

      {/* ── ELIGIBILITY + CAREERS ── */}
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"}}>
        <div className="info-card">
          <div className="badge" style={{background:"rgba(15,76,129,0.08)",color:"#103d25",marginBottom:"14px"}}>
            ✅ Eligibility
          </div>
          {[
            "FSc Pre-Engineering or ICS (Computer Science)",
            "Minimum 45% marks in intermediate",
            "FSc Pre-Medical students are NOT eligible",
            "Admission is merit-based (University of Peshawar)",
          ].map((e,i)=>(
            <div key={i} style={{display:"flex",gap:"10px",marginBottom:"9px",alignItems:"flex-start"}}>
              <span style={{color:"#2a7a4e",fontWeight:700,fontSize:"14px",flexShrink:0}}>✓</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.5}}>{e}</span>
            </div>
          ))}
        </div>

        <div className="info-card">
          <div className="badge" style={{background:"rgba(15,76,129,0.08)",color:"#103d25",marginBottom:"14px"}}>
            🚀 Career Paths
          </div>
          {[
            "Software Engineer / Developer",
            "AI / Machine Learning Engineer",
            "Cybersecurity Analyst",
            "Web & Mobile App Developer",
            "Database Administrator",
            "IT Consultant / System Analyst",
            "Game Developer",
            "Lecturer / IT Trainer",
          ].map((c,i)=>(
            <div key={i} style={{display:"flex",gap:"10px",marginBottom:"9px",alignItems:"flex-start"}}>
              <span style={{color:"#c9a84c",fontWeight:700,fontSize:"14px",flexShrink:0}}>→</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.5}}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SKILLS + SCOPE ── */}
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"8px"}}>
        <div className="info-card">
          <div className="badge" style={{background:"rgba(15,76,129,0.08)",color:"#103d25",marginBottom:"14px"}}>
            🧠 Skills You Will Gain
          </div>
          {[
            "Programming: C++, Java, Python, JavaScript",
            "Data Structures & Algorithm Design",
            "Database Design & Administration",
            "AI, ML & Deep Learning Basics",
            "Networking & Cybersecurity",
            "Web & Mobile Development",
            "Software Project Management",
          ].map((s,i)=>(
            <div key={i} style={{display:"flex",gap:"10px",marginBottom:"9px",alignItems:"flex-start"}}>
              <span style={{color:"#2a7a4e",fontWeight:700,fontSize:"13px",flexShrink:0}}>▸</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#374151",lineHeight:1.5}}>{s}</span>
            </div>
          ))}
        </div>

        <div className="info-card">
          <div className="badge" style={{background:"rgba(15,76,129,0.08)",color:"#103d25",marginBottom:"14px"}}>
            🌐 Scope & Future
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#374151",lineHeight:1.75,margin:"0 0 12px"}}>
            CS graduates are among the highest-paid professionals in Pakistan and globally. Opportunities span software houses, banks, telecom, government IT departments, and international tech firms.
          </p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#374151",lineHeight:1.75,margin:0}}>
            After BS CS, you can pursue <strong>MS Computer Science</strong>, <strong>MBA IT</strong>, or start your own tech startup. The field grows every year with new demand in AI, cloud, and cybersecurity.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}