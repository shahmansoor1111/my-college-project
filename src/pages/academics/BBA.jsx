import PageLayout from "../../components/PageLayout";



export default function BBA({ navigate }) {
  return (
    <PageLayout navigate={navigate} icon="📊" title="BBA — Bachelor of Business Administration" breadcrumb="Academics → BS Programmes → BBA">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .info-card { background:#fff;border:1px solid #e9ecef;border-radius:16px;padding:28px 26px;box-shadow:0 2px 12px rgba(0,0,0,0.05);animation:fadeUp 0.4s ease both;transition:transform 0.2s,box-shadow 0.2s; }
        .info-card:hover { transform:translateY(-3px);box-shadow:0 10px 28px rgba(16,61,37,0.1); }
        .subject-row { display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #f3f4f6; }
        .subject-row:last-child { border-bottom:none; }
        .fee-row { display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f3f4f6;font-family:"DM Sans",sans-serif;font-size:14px; }
        .fee-row:last-child { border-bottom:none; }
        .prof-card { background:#fff;border:1px solid #e9ecef;border-radius:14px;padding:22px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);animation:fadeUp 0.4s ease both;transition:transform 0.2s,box-shadow 0.2s; }
        .prof-card:hover { transform:translateY(-3px);box-shadow:0 8px 24px rgba(16,61,37,0.1); }
        .sem-card { background:#fff;border-radius:14px;border:1px solid #e9ecef;padding:22px 24px;box-shadow:0 2px 10px rgba(0,0,0,0.05);animation:fadeUp 0.4s ease both; }
        .badge { display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:20px;font-size:11px;font-family:"DM Sans",sans-serif;font-weight:700;letter-spacing:1px;text-transform:uppercase; }
        @media(max-width:640px){
          .two-col{grid-template-columns:1fr !important;}
          .three-col{grid-template-columns:1fr 1fr !important;}
          .hero-banner{padding:32px 22px !important;}
        }
      `}</style>


      <div className="hero-banner" style={{background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",borderRadius:"18px",padding:"44px 40px",marginBottom:"36px",position:"relative",overflow:"hidden",boxShadow:"0 12px 40px rgba(146,64,14,0.25)"}}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"180px",height:"180px",borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
          <span style={{fontSize:"44px"}}>📊</span>
          <div>
            <div className="badge" style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",marginBottom:"8px"}}>BS Degree · 4 Years</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,3vw,28px)",color:"#fff"}}>BBA — Bachelor of Business Administration</h2>
          </div>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"rgba(255,255,255,0.8)",maxWidth:"620px",lineHeight:1.7}}>Build a strong foundation in management, finance, marketing, and entrepreneurship. Affiliated with University of Peshawar.</p>
      </div>
      <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px",marginBottom:"36px"}}>
        {[{icon:"📅",label:"Duration",val:"4 Years"},{icon:"📆",label:"Semesters",val:"8 Semesters"},{icon:"⏰",label:"Timing",val:"8:00 AM – 2:00 PM"},{icon:"🎓",label:"Affiliation",val:"Univ. of Peshawar"}].map((s,i)=>(<div key={i} style={{background:"#fff",borderRadius:"12px",padding:"18px 14px",textAlign:"center",border:"1px solid #e9ecef",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",animation:`fadeUp 0.4s ease ${i*0.07}s both`}}><div style={{fontSize:"26px",marginBottom:"6px"}}>{s.icon}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",color:"#103d25",fontWeight:700}}>{s.val}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#9ca3af",marginTop:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.label}</div></div>))}
      </div>
      <div style={{marginBottom:"28px"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"16px"}}>📋 Semester-wise Courses</h3>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
          {[
            {sem:"Semester 1",courses:["Principles of Management","Business Mathematics","Business Communication","Introduction to Economics","Islamic Studies"]},
            {sem:"Semester 2",courses:["Financial Accounting","Microeconomics","Business Statistics","Principles of Marketing","Pakistan Studies"]},
            {sem:"Semester 3",courses:["Cost Accounting","Macroeconomics","Business Law","Human Resource Management","Computer Applications in Business"]},
            {sem:"Semester 4",courses:["Financial Management","Organisational Behaviour","Research Methodology","Marketing Management","Entrepreneurship"]},
            {sem:"Semester 5",courses:["Strategic Management","Operations Management","Business Ethics","Investment & Portfolio Mgmt","Elective I"]},
            {sem:"Semester 6",courses:["International Business","E-Commerce","Project Management","Consumer Behaviour","Elective II"]},
            {sem:"Semester 7",courses:["Business Project – I","Corporate Governance","Supply Chain Management","Elective III","Internship"]},
            {sem:"Semester 8",courses:["Business Project – II","Professional Development","Elective IV","Viva & Defence","Report Writing"]},
          ].map((s,i)=>(<div key={i} className="sem-card" style={{animationDelay:`${i*0.06}s`}}><div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}><div style={{width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#103d25,#2a7a4e)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#fff",fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>{i+1}</div><span style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#103d25"}}>{s.sem}</span></div>{s.courses.map((c,j)=>(<div key={j} className="subject-row"><span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#103d25",flexShrink:0}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#374151"}}>{c}</span></div>))}</div>))}
        </div>
      </div>
      <div className="info-card" style={{marginBottom:"28px"}}>
        <div className="badge" style={{background:"rgba(201,168,76,0.12)",color:"#8a6a1a",marginBottom:"16px"}}>💰 Fee Structure (Per Semester)</div>
        {[{label:"Admission Fee (one-time)",amount:"PKR 4,000"},{label:"Tuition Fee (per semester)",amount:"PKR 10,000"},{label:"Examination Fee",amount:"PKR 2,000"},{label:"Library Fee",amount:"PKR 800"},{label:"Sports & Activity Fee",amount:"PKR 700"},{label:"Total Per Semester",amount:"PKR 13,500",bold:true},{label:"Total Programme (8 sem)",amount:"PKR 1,08,000 approx.",bold:true}].map((f,i)=>(<div key={i} className="fee-row" style={{fontWeight:f.bold?"700":"400",color:f.bold?"#103d25":"#374151"}}><span>{f.label}</span><span style={{color:f.bold?"#1a5c38":"#6b7280",fontWeight:f.bold?"700":"500"}}>{f.amount}</span></div>))}
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",marginTop:"12px"}}>* Please confirm current fees with administration.</p>
      </div>
      <div style={{marginBottom:"28px"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"16px"}}>👨‍🏫 Faculty</h3>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px"}}>
          {[{name:"Prof. [Name]",subject:"Management & Strategy",qual:"MBA / MS Management"},{name:"Prof. [Name]",subject:"Finance & Accounting",qual:"MBA Finance / CA"},{name:"Prof. [Name]",subject:"Marketing",qual:"MBA Marketing"},{name:"Prof. [Name]",subject:"Economics",qual:"MA / MS Economics"},{name:"Prof. [Name]",subject:"Business Law",qual:"LLB / LLM"},{name:"Prof. [Name]",subject:"Business Communication",qual:"MA English / MBA"}].map((p,i)=>(<div key={i} className="prof-card" style={{animationDelay:`${i*0.07}s`}}><div style={{width:"52px",height:"52px",borderRadius:"50%",background:"linear-gradient(135deg,#103d25,#2a7a4e)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",margin:"0 auto 12px"}}>👨‍🏫</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#103d25",marginBottom:"4px"}}>{p.name}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12.5px",color:"#103d25",fontWeight:600,marginBottom:"3px"}}>{p.subject}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af"}}>{p.qual}</div></div>))}
        </div>
      </div>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"}}>
        <div className="info-card"><div className="badge" style={{background:"rgba(146,64,14,0.08)",color:"#103d25",marginBottom:"14px"}}>✅ Eligibility</div>{["FA / FSc / ICS with 45%+ marks","Any recognised board","Age as per UOP guidelines","Entrance test may be required"].map((e,i)=>(<div key={i} style={{display:"flex",gap:"10px",marginBottom:"9px",alignItems:"flex-start"}}><span style={{color:"#1a5c38",fontWeight:700,fontSize:"14px",flexShrink:0}}>✓</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.5}}>{e}</span></div>))}</div>
        <div className="info-card"><div className="badge" style={{background:"rgba(146,64,14,0.08)",color:"#103d25",marginBottom:"14px"}}>🚀 Career Paths</div>{["Business Manager","Marketing Executive","HR Manager","Financial Analyst","Entrepreneur","Civil Services (BPS)"].map((c,i)=>(<div key={i} style={{display:"flex",gap:"10px",marginBottom:"9px",alignItems:"flex-start"}}><span style={{color:"#c9a84c",fontWeight:700,fontSize:"14px",flexShrink:0}}>→</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.5}}>{c}</span></div>))}</div>
      </div>

    </PageLayout>
  );
}