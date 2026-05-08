import PageLayout from "../../components/PageLayout";



export default function PreMedical({ navigate }) {
  return (
    <PageLayout navigate={navigate} icon="🔬" title="FSc Pre-Medical" breadcrumb="Academics → Intermediate → FSc Pre-Medical">
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


      <div className="hero-banner"  style={{background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",borderRadius:"18px",padding:"44px 40px",marginBottom:"36px",position:"relative",overflow:"hidden",boxShadow:"0 12px 40px rgba(16,61,37,0.25)"}}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"180px",height:"180px",borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
          <span style={{fontSize:"44px"}}>🔬</span>
          <div>
            <div className="badge" style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",marginBottom:"8px"}}>Intermediate · 2 Years</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,3vw,28px)",color:"#fff"}}>FSc Pre-Medical</h2>
          </div>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"rgba(255,255,255,0.8)",maxWidth:"620px",lineHeight:1.7}}>The gateway to MBBS, BDS, and allied health sciences. Study Biology, Chemistry, and Physics at the highest intermediate level.</p>
      </div>
      <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px",marginBottom:"36px"}}>
        {[{icon:"📅",label:"Duration",val:"2 Years"},{icon:"🏫",label:"Classes",val:"Mon – Sat"},{icon:"⏰",label:"Timing",val:"8:00 AM – 2:00 PM"},{icon:"📋",label:"Board",val:"BISE Peshawar"}].map((s,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:"12px",padding:"18px 14px",textAlign:"center",border:"1px solid #e9ecef",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",animation:`fadeUp 0.4s ease ${i*0.07}s both`}}>
            <div style={{fontSize:"26px",marginBottom:"6px"}}>{s.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",color:"#103d25",fontWeight:700}}>{s.val}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#9ca3af",marginTop:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="info-card" style={{marginBottom:"28px"}}>
        <div className="badge" style={{background:"rgba(14,116,144,0.08)",color:"#103d25",marginBottom:"16px"}}>📚 Subjects</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"16px"}}>Curriculum</h3>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 32px"}}>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#c9a84c",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:"10px"}}>Compulsory</p>
            {["English","Urdu","Islamic Education / Ethics","Pakistan Studies"].map((s,i)=>(<div key={i} className="subject-row"><span style={{width:"8px",height:"8px",borderRadius:"50%",background:"#c9a84c",flexShrink:0}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151"}}>{s}</span></div>))}
          </div>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#103d25",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:"10px"}}>Core (Science)</p>
            {["Biology (Theory + Practical)","Chemistry (Theory + Practical)","Physics (Theory + Practical)"].map((s,i)=>(<div key={i} className="subject-row"><span style={{width:"8px",height:"8px",borderRadius:"50%",background:"#103d25",flexShrink:0}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151"}}>{s}</span></div>))}
          </div>
        </div>
      </div>
      <div className="info-card" style={{marginBottom:"28px"}}>
        <div className="badge" style={{background:"rgba(201,168,76,0.12)",color:"#8a6a1a",marginBottom:"16px"}}>💰 Fee Structure</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"16px"}}>Annual Fees (Per Year)</h3>
        {[{label:"Admission Fee (one-time)",amount:"PKR 2,000"},{label:"Annual Tuition Fee",amount:"PKR 8,000"},{label:"Examination Fee",amount:"PKR 1,500"},{label:"Laboratory Fee (Bio+Chem+Phy)",amount:"PKR 2,500"},{label:"Library Fee",amount:"PKR 500"},{label:"Sports & Misc Fee",amount:"PKR 800"},{label:"Total (Year 1 approx.)",amount:"PKR 15,300",bold:true}].map((f,i)=>(<div key={i} className="fee-row" style={{fontWeight:f.bold?"700":"400",color:f.bold?"#103d25":"#374151"}}><span>{f.label}</span><span style={{color:f.bold?"#1a5c38":"#6b7280",fontWeight:f.bold?"700":"500"}}>{f.amount}</span></div>))}
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",marginTop:"12px"}}>* Fees are subject to change. Please confirm with administration.</p>
      </div>
      <div style={{marginBottom:"28px"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"16px"}}>👨‍🏫 Subject Teachers</h3>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px"}}>
          {[{name:"Prof. [Name]",subject:"Biology",qual:"MSc Zoology / Botany"},{name:"Prof. [Name]",subject:"Chemistry",qual:"MSc Chemistry"},{name:"Prof. [Name]",subject:"Physics",qual:"MSc Physics"},{name:"Prof. [Name]",subject:"English",qual:"MA English"},{name:"Prof. [Name]",subject:"Urdu",qual:"MA Urdu"},{name:"Prof. [Name]",subject:"Pakistan Studies",qual:"MA History"}].map((p,i)=>(<div key={i} className="prof-card" style={{animationDelay:`${i*0.07}s`}}><div style={{width:"52px",height:"52px",borderRadius:"50%",background:"linear-gradient(135deg,#0f766e,#2a7a4e)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",margin:"0 auto 12px"}}>👨‍🏫</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#103d25",marginBottom:"4px"}}>{p.name}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12.5px",color:"#103d25",fontWeight:600,marginBottom:"3px"}}>{p.subject}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af"}}>{p.qual}</div></div>))}
        </div>
      </div>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"}}>
        <div className="info-card">
          <div className="badge" style={{background:"rgba(14,116,144,0.08)",color:"#103d25",marginBottom:"14px"}}>✅ Eligibility</div>
          {["Passed Matric (SSC) with 60%+ marks","Science subjects (Bio, Chem, Phy) in Matric","Age: 15–20 years","Domicile of KPK / Federal Area"].map((e,i)=>(<div key={i} style={{display:"flex",gap:"10px",marginBottom:"9px",alignItems:"flex-start"}}><span style={{color:"#1a5c38",fontWeight:700,fontSize:"14px",flexShrink:0}}>✓</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.5}}>{e}</span></div>))}
        </div>
        <div className="info-card">
          <div className="badge" style={{background:"rgba(14,116,144,0.08)",color:"#103d25",marginBottom:"14px"}}>🚀 Career Paths</div>
          {["MBBS (Doctor)","BDS (Dentist)","Pharm-D (Pharmacist)","BS Nursing / Physiotherapy","MDCAT / NTS Preparation"].map((c,i)=>(<div key={i} style={{display:"flex",gap:"10px",marginBottom:"9px",alignItems:"flex-start"}}><span style={{color:"#c9a84c",fontWeight:700,fontSize:"14px",flexShrink:0}}>→</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#374151",lineHeight:1.5}}>{c}</span></div>))}
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,#f0f9ff,#e0f7fa)",border:"1.5px solid #7dd3fc",borderRadius:"16px",padding:"30px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"}}>
        <div><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25",marginBottom:"5px"}}>Planning for Medical?</h4><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#6b7280"}}>Our AI Tutor can help you prepare for MDCAT and entry tests.</p></div>
        <button onClick={()=>navigate("ai-helper")} style={{background:"#103d25",color:"#fff",border:"none",padding:"11px 22px",borderRadius:"8px",fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",fontWeight:700,cursor:"pointer"}}>AI Study Helper →</button>
      </div>

    </PageLayout>
  );
}
