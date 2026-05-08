import PageLayout from "../../components/PageLayout";

export default function BsEnglish({ navigate }) {
  return (
    <PageLayout navigate={navigate} icon="📚" title="BS English" breadcrumb="Academics → BS Programmes → BS English">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .info-card { background:#fff;border:1px solid #e9ecef;border-radius:16px;padding:28px 26px;box-shadow:0 2px 12px rgba(0,0,0,0.05);animation:fadeUp 0.4s ease both;transition:transform 0.2s,box-shadow 0.2s; }
        .info-card:hover { transform:translateY(-3px);box-shadow:0 10px 28px rgba(16,61,37,0.1); }
        .subject-row { display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #f3f4f6; }
        .subject-row:last-child { border-bottom:none; }
        .fee-row { display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f3f4f6;font-family:"DM Sans",sans-serif;font-size:14px; }
        .fee-row:last-child { border-bottom:none; }
        .sem-card { background:#fff;border-radius:14px;border:1px solid #e9ecef;padding:22px 24px;box-shadow:0 2px 10px rgba(0,0,0,0.05);animation:fadeUp 0.4s ease both; }
        .badge { display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:20px;font-size:11px;font-family:"DM Sans",sans-serif;font-weight:700;letter-spacing:1px;text-transform:uppercase; }
        @media(max-width:640px){
          .two-col{grid-template-columns:1fr !important;}
          .three-col{grid-template-columns:1fr 1fr !important;}
          .hero-banner{padding:32px 22px !important;}
        }
      `}</style>

      {/* HERO */}
      <div className="hero-banner" style={{
        background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",
        borderRadius:"18px",
        padding:"44px 40px",
        marginBottom:"36px",
        position:"relative",
        overflow:"hidden",
        boxShadow:"0 12px 40px rgba(16,61,37,0.25)"
      }}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"180px",height:"180px",borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>

        <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
          <span style={{fontSize:"44px"}}>📚</span>
          <div>
            <div className="badge" style={{
              background:"rgba(255,255,255,0.15)",
              border:"1px solid rgba(255,255,255,0.3)",
              color:"#fff",
              marginBottom:"8px"
            }}>
              BS Degree · 4 Years
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,3vw,28px)",color:"#fff"}}>
              BS English
            </h2>
          </div>
        </div>

        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"rgba(255,255,255,0.8)",maxWidth:"620px",lineHeight:1.7}}>
          Study literature, linguistics, writing skills, communication, and critical analysis of English texts. This program builds strong academic, teaching, and professional communication skills.
        </p>
      </div>

      {/* INFO GRID */}
      <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px",marginBottom:"36px"}}>
        {[
          {icon:"📅",label:"Duration",val:"4 Years"},
          {icon:"📆",label:"Semesters",val:"8 Semesters"},
          {icon:"⏰",label:"Timing",val:"8:00 AM – 2:00 PM"},
          {icon:"🎓",label:"Affiliation",val:"Univ. of Peshawar"}
        ].map((s,i)=>(
          <div key={i} style={{
            background:"#fff",
            borderRadius:"12px",
            padding:"18px 14px",
            textAlign:"center",
            border:"1px solid #e9ecef",
            boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
            animation:`fadeUp 0.4s ease ${i*0.07}s both`
          }}>
            <div style={{fontSize:"26px",marginBottom:"6px"}}>{s.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",color:"#103d25",fontWeight:700}}>{s.val}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#9ca3af"}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* SEMESTERS */}
      <div style={{marginBottom:"28px"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"16px"}}>
          📋 Semester-wise Courses
        </h3>

        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
          {[
            {sem:"Semester 1",courses:["Introduction to English Literature","Functional English","Pakistan Studies","Islamic Studies","Basic Writing Skills"]},
            {sem:"Semester 2",courses:["Poetry & Prose (Classical)","Grammar & Composition","Communication Skills","Linguistics Basics","History of English Literature"]},
            {sem:"Semester 3",courses:["Drama & Fiction","Phonetics & Phonology","Sociolinguistics","Research Methods","Academic Writing"]},
            {sem:"Semester 4",courses:["Modern Literature","Syntax & Semantics","Literary Criticism","Translation Studies","World Literature"]},
            {sem:"Semester 5",courses:["American Literature","Stylistics","Discourse Analysis","Language Teaching Methods","Elective I"]},
            {sem:"Semester 6",courses:["Postcolonial Literature","Critical Theory","Media & Communication","Elective II","Advanced Writing"]},
            {sem:"Semester 7",courses:["Research Project I","English Teaching Skills","Elective III","Professional Writing","Seminar"]},
            {sem:"Semester 8",courses:["Research Project II","Applied Linguistics","Elective IV","Viva & Presentation","Career Development"]}
          ].map((s,i)=>(
            <div key={i} className="sem-card">
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                <div style={{
                  width:"32px",height:"32px",borderRadius:"8px",
                  background:"linear-gradient(135deg,#103d25,#2a7a4e)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:"#fff",fontWeight:700
                }}>
                  {i+1}
                </div>
                <span style={{fontFamily:"'Playfair Display',serif",color:"#103d25"}}>{s.sem}</span>
              </div>

              {s.courses.map((c,j)=>(
                <div key={j} className="subject-row">
                  <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#103d25"}}/>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#374151"}}>{c}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FEE */}
      <div className="info-card">
        <div className="badge" style={{background:"rgba(201,168,76,0.12)",color:"#8a6a1a",marginBottom:"16px"}}>
          💰 Fee Structure
        </div>

        {[
          {label:"Admission Fee (one-time)",amount:"PKR 3,500"},
          {label:"Tuition Fee (per semester)",amount:"PKR 9,000"},
          {label:"Examination Fee",amount:"PKR 1,800"},
          {label:"Library Fee",amount:"PKR 800"},
          {label:"Misc Fee",amount:"PKR 600"},
          {label:"Total Per Semester",amount:"PKR 12,200",bold:true},
          {label:"Total Programme",amount:"PKR 97,600 approx.",bold:true}
        ].map((f,i)=>(
          <div key={i} className="fee-row" style={{fontWeight:f.bold?"700":"400"}}>
            <span>{f.label}</span>
            <span style={{color:f.bold?"#103d25":"#6b7280"}}>{f.amount}</span>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}