import { useState, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  PROGRAM DATA
// ─────────────────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "bscs",
    keys: ["bs computer science","bscs","b.s. computer science","computer science program","computer science degree","bs cs","cs program","bachelor computer"],
    negativeKeys: ["fsc computer","fsc cs","ics","intermediate computer","f.sc computer"],
    label: "BS Computer Science", emoji: "💻", route: "bs-cs", color: "#0f4c81", accent: "#1a7fcb",
    duration: "4 Years (8 Semesters)", affiliation: "University of Peshawar",
    description: "BS Computer Science is a 4-year undergraduate degree affiliated with the University of Peshawar. It prepares students for careers in software, AI, cybersecurity, and modern technology through both theory and hands-on practice.",
    subjects: ["Programming Fundamentals (C++, Java, Python)","Data Structures and Algorithms","Database Management Systems","Software Engineering","Artificial Intelligence and Machine Learning","Computer Networks and Cybersecurity","Web Development and Mobile App Development","Operating Systems","Discrete Mathematics and Statistics","Final Year Project"],
    careers: ["Software Engineer / Developer","Web Developer (Frontend & Backend)","Database Administrator","Cybersecurity Analyst","AI / Machine Learning Engineer","Mobile App Developer","IT Consultant","System Analyst","Game Developer","Lecturer / IT Trainer"],
    eligibility: "FSc (Pre-Engineering or ICS with Computer Science) or equivalent with at least 45% marks. FSc Pre-Medical students are generally not eligible. Admission is merit-based.",
    skills: "Programming, problem solving, software design, database handling, networking, AI/ML basics, web technologies, and project management.",
    scope: "CS graduates are in high demand in Pakistan and globally. Work in software houses, banks, telecom, startups, or government IT departments. Excellent salary packages and growth opportunities.",
    fee: "Approximately PKR 45,000 – 55,000 per semester. Final fee is set by the University of Peshawar and may vary slightly each year.",
  },
  {
    id: "bsenglish",
    keys: ["bs english","b.s. english","english program","english degree","bachelor of english","english literature","bs english literature","english department"],
    negativeKeys: [],
    label: "BS English", emoji: "📖", route: "bs-english", color: "#5c1a6e", accent: "#9b3db8",
    duration: "4 Years (8 Semesters)", affiliation: "University of Peshawar",
    description: "BS English is a 4-year undergraduate degree affiliated with the University of Peshawar. It focuses on English literature, linguistics, communication, and language studies — ideal for students who love reading, writing, and communication.",
    subjects: ["British Literature (Poetry, Prose, Drama)","American and World Literature","Linguistics and Phonology","Grammar and Composition","Research Methods and Academic Writing","Creative and Technical Writing","Communication Skills","Translation Studies","Cultural Studies and Literary Theory","Dissertation / Final Research Project"],
    careers: ["English Teacher / Lecturer","Content Writer and Copywriter","Journalist and News Reporter","Editor and Proofreader","Translator and Interpreter","Public Relations Officer","Corporate Communication Manager","Civil Services (CSS, PMS)","Author and Creative Writer","Language Trainer"],
    eligibility: "FA, FSc, or equivalent with at least 45% marks. Both Arts and Science stream students are eligible. Admission is merit-based.",
    skills: "Advanced English writing, critical analysis, public speaking, research, translation, creative writing, and professional communication.",
    scope: "Wide opportunities in education, media, corporate sector, civil services, and international organizations. English proficiency is valued in every profession.",
    fee: "Approximately PKR 40,000 – 50,000 per semester. Final fee is set by the University of Peshawar.",
  },
  {
    id: "bspolsci",
    keys: ["bs political science","political science","b.s. political science","pols","bs pols","political science program","political science degree"],
    negativeKeys: [],
    label: "BS Political Science", emoji: "🏛️", route: "bs-polsci", color: "#7c2d12", accent: "#c2440f",
    duration: "4 Years (8 Semesters)", affiliation: "University of Peshawar",
    description: "BS Political Science is a 4-year undergraduate degree affiliated with the University of Peshawar. It covers government systems, international relations, law, and public policy.",
    subjects: ["Introduction to Political Science","Pakistan Studies and Constitutional Law","International Relations and Diplomacy","Comparative Politics","Political Thought (Ancient, Modern, Contemporary)","Public Administration and Policy","Human Rights and International Law","Local Government and Governance","Research Methods in Social Sciences","Thesis / Final Year Research Project"],
    careers: ["Civil Servant (CSS, PMS, PCS)","Diplomat / Foreign Service Officer","Political Analyst","Journalist / Political Reporter","NGO and Development Sector Professional","Research Analyst at Think Tanks","Lecturer / Professor","Legal Advisor (after Law degree)","Policy Advisor","UN / UNESCO Employee"],
    eligibility: "FA, FSc, or equivalent with at least 45% marks. Both Arts and Science background students are eligible. Admission is merit-based.",
    skills: "Critical thinking, analytical writing, public speaking, research, governance, international relations, and policy analysis.",
    scope: "Excellent career prospects in civil services, diplomacy, journalism, development sector, and academia. One of the best programs for CSS/PMS aspirants.",
    fee: "Approximately PKR 40,000 – 50,000 per semester. Final fee is set by the University of Peshawar.",
  },
  {
    id: "bba",
    keys: ["bba","bachelor of business administration","business administration","business program","bba program","business degree","bba degree"],
    negativeKeys: [],
    label: "BBA (Bachelor of Business Administration)", emoji: "📊", route: "bba", color: "#1e4d2b", accent: "#2e7d47",
    duration: "4 Years (8 Semesters)", affiliation: "University of Peshawar",
    description: "BBA is a 4-year undergraduate degree affiliated with the University of Peshawar. It prepares students for the world of business, management, and entrepreneurship.",
    subjects: ["Principles of Management","Financial Accounting and Cost Accounting","Business Mathematics and Statistics","Marketing Management","Human Resource Management","Business Communication","Entrepreneurship and Business Planning","Economics (Micro and Macro)","Business Law and Ethics","Final Year Business Project"],
    careers: ["Business Manager","Marketing Executive","Bank Officer / Finance Analyst","Human Resource Manager","Entrepreneur / Business Owner","Sales and Business Development Manager","Accountant / Auditor","Supply Chain Manager","Customer Relationship Manager","Corporate Trainer"],
    eligibility: "FA, FSc, ICS, or equivalent with at least 45% marks. Both Arts and Science backgrounds are eligible. Admission is merit-based.",
    skills: "Business planning, financial management, marketing, leadership, communication, team management, problem solving, and entrepreneurship.",
    scope: "BBA graduates are sought after in banks, multinationals, government organizations, and private businesses. You can also pursue MBA for higher management roles.",
    fee: "Approximately PKR 45,000 – 55,000 per semester. Final fee is set by the University of Peshawar.",
  },
  {
    id: "fscmedical",
    keys: ["fsc pre-medical","fsc pre medical","pre-medical","pre medical","fsc premedical","f.sc pre-medical","pre med","pre-med","fsc medical","intermediate medical"],
    negativeKeys: [],
    label: "FSc Pre-Medical", emoji: "🩺", route: "pre-medical", color: "#0d5c5c", accent: "#0e9090",
    duration: "2 Years (Part I & Part II)", affiliation: "BISE Peshawar",
    description: "FSc Pre-Medical is a 2-year intermediate program affiliated with BISE Peshawar. It builds a strong foundation in Biology, Chemistry, and Physics for students aiming to become doctors, dentists, or pharmacists.",
    subjects: ["Biology (Botany & Zoology)","Chemistry (Organic, Inorganic, Physical)","Physics","English (Compulsory)","Urdu (Compulsory)","Islamic Studies / Pak Studies"],
    careers: ["MBBS Doctor (after MDCAT and medical college)","BDS Dentist","Pharm-D Pharmacist","Doctor of Veterinary Medicine (DVM)","BS Nursing","BS Biotechnology / Microbiology","BS Biochemistry","Allied Health Sciences"],
    eligibility: "Matric (Science) with Biology from a recognized board with at least 60% marks. Admission is competitive and merit-based.",
    skills: "Scientific reasoning, laboratory skills, analytical thinking, biological concepts, and MDCAT preparation.",
    scope: "Gateway to medical professions in Pakistan and abroad. After FSc, students appear in MDCAT for MBBS, BDS, and health sciences programs.",
    fee: "Approximately PKR 15,000 – 25,000 per year. Final fee is set by BISE Peshawar.",
  },
  {
    id: "fsccs",
    keys: ["fsc computer science","fsc cs","f.sc computer science","fsc ics","intermediate computer science","ics","fsc with computer","intermediate ics"],
    negativeKeys: [],
    label: "FSc Computer Science (ICS)", emoji: "🖥️", route: "fsc-cs", color: "#1a1a5e", accent: "#2d2db0",
    duration: "2 Years (Part I & Part II)", affiliation: "BISE Peshawar",
    description: "FSc Computer Science (ICS) is a 2-year intermediate program affiliated with BISE Peshawar. It combines computer science with mathematics and provides a strong foundation for BS CS or IT degrees.",
    subjects: ["Computer Science (Programming, Database, Networks)","Mathematics","Physics (in some combinations)","Statistics (in some combinations)","English (Compulsory)","Urdu (Compulsory)","Islamic Studies / Pak Studies"],
    careers: ["BS Computer Science (4-year degree)","BS Software Engineering","BS Information Technology","BS Artificial Intelligence","BS Data Science","Associate Engineer (IT)","Computer Operator / Technician","Web & App Developer (after short courses)"],
    eligibility: "Matric (Science) from a recognized board with at least 45% marks. Students interested in computers, programming, and technology are ideal for this program.",
    skills: "Programming basics (C++), database concepts, networking fundamentals, mathematical reasoning, and problem solving.",
    scope: "Ideal pathway for a technology career. After ICS, students can get admission in BS CS, Software Engineering, or IT programs at universities across Pakistan.",
    fee: "Approximately PKR 12,000 – 22,000 per year. Final fee is set by BISE Peshawar.",
  },
  {
    id: "fa",
    keys: ["fa arts","fa program","faculty of arts","f.a arts","intermediate arts","fa general","fa degree"],
    negativeKeys: [],
    label: "FA (Faculty of Arts)", emoji: "🎨", route: "arts", color: "#6b3a1f", accent: "#b5621e",
    duration: "2 Years (Part I & Part II)", affiliation: "BISE Peshawar",
    description: "FA (Faculty of Arts) is a 2-year intermediate program affiliated with BISE Peshawar. It covers humanities, social sciences, and languages — ideal for students interested in arts subjects.",
    subjects: ["Urdu (Literature & Language)","English (Compulsory)","Islamic Studies / Pak Studies","Electives: Economics, Civics, History, Geography","Electives: Sociology, Psychology, Education","Fine Arts / Drawing (optional)"],
    careers: ["BA / BS in Arts, Humanities, or Social Sciences","BS English, BS Political Science, BBA","B.Ed (Bachelor of Education) — Teaching","LLB (Law Degree)","CSS / PMS Civil Services","Journalism and Media","Social Work and NGO Sector"],
    eligibility: "Matric (Arts or Science) from a recognized board with at least 33% marks. FA is open to all Matric students regardless of previous stream.",
    skills: "Communication in Urdu and English, social sciences, general knowledge, critical thinking, and humanities.",
    scope: "FA opens doors to teaching, law, civil services, journalism, and social work. After FA, students can pursue BS programs in arts and humanities.",
    fee: "Approximately PKR 10,000 – 18,000 per year. Final fee is set by BISE Peshawar.",
  },
];

const FAQS = [
  { keys: ["fee structure","fee","fees","how much","cost","tuition","charges","payment"], answer: `Fee Structure at FG Degree College, Peshawar:\n\nBS Programs (4-year, University of Peshawar):\n• BS Computer Science: PKR 45,000 – 55,000 per semester\n• BS English: PKR 40,000 – 50,000 per semester\n• BS Political Science: PKR 40,000 – 50,000 per semester\n• BBA: PKR 45,000 – 55,000 per semester\n\nFSc / FA Programs (2-year, BISE Peshawar):\n• FSc Pre-Medical: PKR 15,000 – 25,000 per year\n• FSc Computer Science (ICS): PKR 12,000 – 22,000 per year\n• FA Arts: PKR 10,000 – 18,000 per year\n\nNote: These are approximate figures. Please visit the college admissions office for the confirmed current fee schedule.` },
  { keys: ["admission","apply","how to apply","admission process","application","when admission","admission date","admission form","last date"], answer: `Admission Process at FG Degree College, Peshawar:\n\nStep 1 — Check Eligibility:\n• FSc / FA programs: Must have passed Matric from a recognized board\n• BS programs: Must have passed FSc / FA / equivalent\n\nStep 2 — Obtain Admission Form:\n• Visit the college admissions office or download from the college website\n\nStep 3 — Submit Documents:\n• Matric or FSc result card / certificate\n• Domicile certificate\n• 4 passport-size photographs\n• CNIC / B-Form copy\n\nStep 4 — Merit List:\n• Admission is based on academic merit\n• Merit lists are displayed on the college notice board\n\nStep 5 — Fee Deposit:\n• After selection, deposit the fee within the given deadline` },
  { keys: ["eligibility","requirement","required marks","minimum marks","who can apply","qualification","criteria"], answer: `Eligibility Criteria at FG Degree College:\n\nFSc Pre-Medical: Matric (Science with Biology) with at least 60% marks\nFSc Computer Science (ICS): Matric (Science) with at least 45% marks\nFA Arts: Matric (Arts or Science) with at least 33% marks\nBS Computer Science: FSc Pre-Engineering or ICS with at least 45% marks\nBS English: FA, FSc, or equivalent with at least 45% marks\nBS Political Science: FA, FSc, or equivalent with at least 45% marks\nBBA: FA, FSc, ICS, or equivalent with at least 45% marks\n\nAll admissions are merit-based.` },
  { keys: ["subjects","course","curriculum","syllabus","what subjects","what is taught"], answer: `Subject Overview for All Programs:\n\nFSc Pre-Medical: Biology, Chemistry, Physics, English, Urdu, Pak Studies\nFSc ICS: Computer Science, Mathematics, Physics/Statistics, English, Urdu\nFA Arts: Urdu, English, Pak Studies, Economics, History, Civics, Psychology\nBS Computer Science: Programming, Data Structures, Databases, AI, Networking\nBS English: Literature, Linguistics, Grammar, Academic Writing, Translation\nBS Political Science: Constitutional Law, International Relations, Public Admin\nBBA: Management, Accounting, Marketing, HR, Business Communication\n\nAsk me about any specific program for full details!` },
  { keys: ["affiliation","university","affiliated","which university","recognized","degree recognized"], answer: `University Affiliation at FG Degree College:\n\nBS Programs (4-year degrees):\n• Affiliated with the University of Peshawar\n• Degrees are HEC (Higher Education Commission) recognized\n\nIntermediate Programs (2-year):\n• Affiliated with BISE Peshawar\n• Certificates recognized across Pakistan\n\nAll degrees and certificates are fully recognized by HEC and IBCC.` },
  { keys: ["duration","how many years","how long","years","semesters","year program"], answer: `Program Duration at FG Degree College:\n\n4-Year Degree Programs (University of Peshawar):\n• BS Computer Science — 4 Years (8 Semesters)\n• BS English — 4 Years (8 Semesters)\n• BS Political Science — 4 Years (8 Semesters)\n• BBA — 4 Years (8 Semesters)\n\n2-Year Intermediate Programs (BISE Peshawar):\n• FSc Pre-Medical — 2 Years (Part I & Part II)\n• FSc Computer Science (ICS) — 2 Years (Part I & Part II)\n• FA Arts — 2 Years (Part I & Part II)` },
  { keys: ["career","scope","job","future","after graduation","after degree","what can i do","opportunities"], answer: `Career Scope After Graduating:\n\nBS Computer Science: Software engineering, AI, cybersecurity, web development. Excellent salaries.\nBS English: Teaching, journalism, content writing, civil services (CSS/PMS), corporate communication.\nBS Political Science: Civil services (CSS/PMS), diplomacy, NGOs, journalism, research.\nBBA: Banking, marketing, HR management, entrepreneurship, finance. Can continue to MBA.\nFSc Pre-Medical: Gateway to MBBS, BDS, Pharm-D, Nursing, Biotechnology.\nFSc ICS: Pathway to BS CS, Software Engineering, IT programs.\nFA Arts: Teaching (B.Ed), law (LLB), civil services, journalism, social work.` },
  { keys: ["hostel","accommodation","where to stay","boarding"], answer: `Hostel and Accommodation:\n\nFG Degree College has hostel facilities available for outstation students providing:\n• Clean and safe accommodation\n• Mess / dining facilities\n• Study rooms\n• Security and supervision\n\nFor exact availability, fees, and seat allocation, please contact the college administration office directly.` },
  { keys: ["library","lab","facility","facilities","computer lab","sports","campus"], answer: `Campus Facilities at FG Degree College:\n\n• Well-equipped Library with academic books and journals\n• Computer Labs with modern computers and internet access\n• Science Laboratories (Physics, Chemistry, Biology)\n• Sports facilities including cricket ground and football field\n• Mosque on campus\n• Cafeteria / Canteen\n• Clean and green campus environment\n• Examination hall and student common rooms` },
  { keys: ["scholarship","financial aid","free education","stipend","ehsaas","needy"], answer: `Scholarships and Financial Aid:\n\n• Federal Government Scholarships — for excellent academic records\n• Ehsaas Undergraduate Scholarship — for financially deserving students (HEC)\n• HEC Need-Based Scholarships — for students from low-income families\n• Prime Minister's Laptop Scheme — for high-performing BS students\n• College Internal Aid — fee concession for financial hardship\n\nVisit hec.gov.pk for updated scholarship opportunities.` },
  { keys: ["location","address","where is","how to reach","college address","situated","located"], answer: `College Location:\n\nFederal Government Degree College for Men\nPeshawar, Khyber Pakhtunkhwa, Pakistan\n\nThe college is accessible by public transport from different areas of Peshawar. Search "FG Degree College Peshawar" on Google Maps for directions.` },
  { keys: ["which program","best program","suggest","recommend","which is better","what should i choose","which degree","help me choose"], answer: `Choosing the Right Program:\n\n• Interested in technology & programming → BS Computer Science or FSc ICS\n• Love reading, writing & communication → BS English or FA Arts\n• Interested in politics & civil services (CSS/PMS) → BS Political Science\n• Want a career in business & banking → BBA\n• Want to become a doctor or pharmacist → FSc Pre-Medical\n• Want to keep options open in humanities → FA Arts\n\nThink about your interests, Matric marks, and long-term career goals. Ask me about any specific program!` },
  { keys: ["contact","phone","number","email","reach","helpline"], answer: `Contact FG Degree College, Peshawar:\n\n• Visit: College Administration / Admissions Office on campus\n• Location: FG Degree College for Men, Peshawar, KPK, Pakistan\n• Timing: Monday to Friday, 8:00 AM – 2:00 PM\n\nFor the most up-to-date contact number and email, please visit the college notice board or ask at the main gate reception.` },
];

function detectProgram(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  for (const prog of PROGRAMS) {
    if (prog.negativeKeys && prog.negativeKeys.some(k => lower.includes(k))) continue;
    if (prog.keys.some(k => lower.includes(k))) return prog;
  }
  return null;
}
function detectFAQ(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  for (const faq of FAQS) {
    if (faq.keys.some(k => lower.includes(k))) return faq;
  }
  return null;
}
function buildProgramResponse(prog) {
  return `${prog.label}\nDuration: ${prog.duration}\nAffiliated with: ${prog.affiliation}\n\n${prog.description}\n\nMain Subjects:\n${prog.subjects.map(s => `• ${s}`).join("\n")}\n\nCareer Opportunities:\n${prog.careers.map(c => `• ${c}`).join("\n")}\n\nEligibility:\n${prog.eligibility}\n\nFee: ${prog.fee}\n\nScope & Future:\n${prog.scope}`;
}

const SUGGESTIONS = [
  { label: "BS Computer Science", icon: "💻" },
  { label: "BS English", icon: "📖" },
  { label: "BBA Program", icon: "📊" },
  { label: "BS Political Science", icon: "🏛️" },
  { label: "FSc Pre-Medical", icon: "🩺" },
  { label: "FSc Computer Science", icon: "🖥️" },
  { label: "FA Arts", icon: "🎨" },
  { label: "Fee Structure", icon: "💰" },
  { label: "Admission Process", icon: "📋" },
  { label: "Which program is best?", icon: "🤔" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  TYPEWRITER HOOK — streams text char-by-char like ChatGPT
// ─────────────────────────────────────────────────────────────────────────────
function useTypewriter(fullText, isStreaming, speed = 8) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayed(fullText);
      return;
    }
    // reset when a new stream starts
    setDisplayed("");
    indexRef.current = 0;

    const tick = () => {
      indexRef.current += 1;
      // print a few chars per tick for smoother feel
      const chunk = fullText.slice(0, indexRef.current);
      setDisplayed(chunk);
      if (indexRef.current < fullText.length) {
        timerRef.current = setTimeout(tick, speed);
      }
    };
    timerRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, isStreaming]);

  const isDone = displayed.length >= fullText.length;
  return { displayed, isDone };
}

// ─────────────────────────────────────────────────────────────────────────────
//  PROGRAM CARD
// ─────────────────────────────────────────────────────────────────────────────
function ProgramCard({ program, navigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{marginTop:"10px",background:`linear-gradient(135deg,${program.color}10,${program.accent}18)`,border:`1.5px solid ${program.accent}45`,borderRadius:"12px",padding:"12px 15px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px",flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"38px",height:"38px",borderRadius:"10px",background:`linear-gradient(135deg,${program.color},${program.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",flexShrink:0}}>{program.emoji}</div>
        <div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"13px",color:program.color}}>{program.label}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#888",marginTop:"2px"}}>{program.duration} · Full details & semesters</div>
        </div>
      </div>
      <button
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}
        onClick={()=>navigate(program.route)}
        style={{background:hovered?`linear-gradient(135deg,${program.color},${program.accent})`:"#fff",color:hovered?"#fff":program.accent,border:`2px solid ${program.accent}`,borderRadius:"9px",padding:"7px 14px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"12px",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"5px",flexShrink:0,whiteSpace:"nowrap",boxShadow:hovered?`0 3px 14px ${program.accent}50`:"none"}}
      >
        View Details
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  USER BUBBLE
// ─────────────────────────────────────────────────────────────────────────────
function UserBubble({ text }) {
  return (
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"16px",gap:"8px",alignItems:"flex-end"}}>
      <div style={{background:"#103d25",color:"#fff",borderRadius:"18px 4px 18px 18px",padding:"11px 15px",maxWidth:"78%",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",lineHeight:1.6}}>{text}</div>
      <div style={{width:"30px",height:"30px",borderRadius:"50%",flexShrink:0,background:"#c9a84c",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700,color:"#103d25",fontFamily:"'DM Sans',sans-serif"}}>U</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  AI BUBBLE — with typewriter effect
// ─────────────────────────────────────────────────────────────────────────────
function AIBubble({ text, isNew, loading, programCard, navigate }) {
  const { displayed, isDone } = useTypewriter(text || "", isNew && !loading, 6);
  const showText = loading ? null : (isNew ? displayed : text);
  const showCursor = isNew && !isDone && !loading;
  const showCard = programCard && navigate && !loading && isDone;

  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"16px"}}>
      <div style={{width:"30px",height:"30px",borderRadius:"50%",flexShrink:0,background:"linear-gradient(135deg,#103d25,#2e7d47)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",marginTop:"2px"}}>🎓</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:"4px 18px 18px 18px",padding:"12px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",lineHeight:1.85,color:"#111",whiteSpace:"pre-wrap",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",minHeight:"42px"}}>
          {loading ? (
            <div style={{display:"flex",gap:"5px",alignItems:"center",padding:"2px 0"}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{width:"7px",height:"7px",borderRadius:"50%",background:"#103d25",animation:`chatBounce 1.2s ease ${i*0.2}s infinite`}}/>
              ))}
            </div>
          ) : (
            <>
              {showText}
              {showCursor && (
                <span style={{display:"inline-block",width:"2px",height:"15px",background:"#103d25",marginLeft:"2px",verticalAlign:"text-bottom",animation:"blink 0.7s step-end infinite"}}/>
              )}
            </>
          )}
        </div>
        {showCard && <ProgramCard program={programCard} navigate={navigate}/>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AIHelper({ navigate }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Assalamu Alaikum! 👋 I'm the FG Degree College Admission Assistant.\n\nI can help you with:\n• Program information (BS, FSc, FA, BBA)\n• Admission requirements & eligibility\n• Fee structure & scholarships\n• Career scope after graduation\n• Campus facilities & guidance\n\nSelect a quick topic below or type your question.",
      programCard: null,
      isNew: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async (text) => {
    const question = (text || input).trim();
    if (!question || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", text: question, programCard: null, isNew: false }];
    setMessages(newMessages);

    const matchedProgram = detectProgram(question);
    if (matchedProgram) {
      setTimeout(() => {
        setMessages(m => [...m, {
          role: "ai",
          text: buildProgramResponse(matchedProgram),
          programCard: matchedProgram,
          isNew: true,
        }]);
      }, 300);
      return;
    }

    const matchedFAQ = detectFAQ(question);
    if (matchedFAQ) {
      setTimeout(() => {
        setMessages(m => [...m, {
          role: "ai",
          text: matchedFAQ.answer,
          programCard: null,
          isNew: true,
        }]);
      }, 300);
      return;
    }

    setLoading(true);
    try {
      const history = newMessages
        .filter((m, idx) => m.role !== "ai" || idx > 0)
        .map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          system: `You are a College Admission and Information Assistant for Federal Government Degree College for Men, Peshawar, Pakistan (affiliated with University of Peshawar).

Only answer questions about:
- College admissions, eligibility, fee structure
- Academic programs: BS Computer Science, BS English, BS Political Science, BBA, FSc Pre-Medical, FSc CS/ICS, FA Arts
- Campus facilities, scholarships, hostels, career guidance
- Comparisons between programs

If asked about subject topics (Ohm's Law, DNA, math problems, coding questions, history facts, etc.), respond:
"I can only help with college admissions and program information. For subject help, please consult your class teacher. Is there anything about our programs I can help you with?"

Keep responses short, warm, and simple. Plain text only. No markdown symbols. Use bullet points with • character.`,
          messages: history,
        }),
      });

      const data = await response.json();
      const reply = data?.content?.[0]?.text;
      setLoading(false);
      setMessages(m => [...m, {
        role: "ai",
        text: reply || "I'm sorry, I couldn't process that. Please try asking about a specific program like BS Computer Science, or topics like admission, fee structure, or eligibility.",
        programCard: null,
        isNew: true,
      }]);
    } catch {
      setLoading(false);
      setMessages(m => [...m, {
        role: "ai",
        text: "I wasn't able to connect right now, but I can still help!\n\nPlease try:\n• Type the name of a program (e.g. BS Computer Science)\n• Ask about fee structure, eligibility, or admission process\n• Use the quick buttons above\n\nFor urgent queries, please visit the college admissions office directly.",
        programCard: null,
        isNew: true,
      }]);
    }
  }, [messages, input, loading]);

  const clear = () => {
    setMessages([{
      role: "ai",
      text: "Chat cleared! Ask me anything about our programs or admissions. 🎓",
      programCard: null,
      isNew: true,
    }]);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes chatBounce {
          0%,80%,100%{transform:translateY(0);opacity:0.6;}
          40%{transform:translateY(-6px);opacity:1;}
        }
        @keyframes slideUp {
          from{opacity:0;transform:translateY(8px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes blink {
          0%,100%{opacity:1;}
          50%{opacity:0;}
        }
        .ai-chip:hover{background:#103d25 !important;color:#fff !important;border-color:#103d25 !important;}
        .ai-send:hover:not(:disabled){background:#1a5c38 !important;box-shadow:0 3px 12px rgba(16,61,37,0.35) !important;}
        .ai-clear:hover{background:rgba(255,255,255,0.15) !important;border-color:rgba(255,255,255,0.6) !important;}
        .ai-back:hover{background:rgba(255,255,255,0.2) !important;}
        .ai-chat-input:focus{border-color:#103d25 !important;outline:none;box-shadow:0 0 0 3px rgba(16,61,37,0.1);}
        .chat-scroll::-webkit-scrollbar{width:4px;}
        .chat-scroll::-webkit-scrollbar-track{background:transparent;}
        .chat-scroll::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:10px;}
        body{overflow:hidden;}
        @media(max-width:600px){
          .chip-grid{gap:5px !important;}
          .ai-chip{font-size:11px !important;padding:5px 10px !important;}
          .ai-banner-title{font-size:14px !important;}
        }
      `}</style>

      <div style={{position:"fixed",inset:0,display:"flex",flexDirection:"column",background:"#f3f4f6",zIndex:9999,fontFamily:"'DM Sans',sans-serif"}}>

        {/* ── HEADER ── */}
        <div style={{background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2e7d47 100%)",padding:"13px 18px",display:"flex",alignItems:"center",gap:"12px",flexShrink:0,boxShadow:"0 2px 12px rgba(16,61,37,0.3)"}}>
          <button
            className="ai-back"
            onClick={()=>navigate && navigate("home")}
            style={{background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.22)",color:"#fff",borderRadius:"8px",padding:"6px 11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",display:"flex",alignItems:"center",gap:"5px",flexShrink:0,transition:"all 0.2s"}}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>

          <div style={{fontSize:"26px",lineHeight:1,flexShrink:0}}>🎓</div>

          <div style={{flex:1,minWidth:0}}>
            <div className="ai-banner-title" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(13px,2.5vw,17px)",color:"#fff",fontWeight:700,lineHeight:1.2}}>
              Admission &amp; Information Assistant
            </div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"rgba(255,255,255,0.68)",marginTop:"2px"}}>
              FG Degree College, Peshawar · All programs &amp; guidance
            </div>
          </div>

          <button onClick={clear} className="ai-clear" style={{background:"rgba(255,255,255,0.08)",border:"1.5px solid rgba(255,255,255,0.22)",color:"rgba(255,255,255,0.75)",borderRadius:"8px",padding:"6px 11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11.5px",transition:"all 0.2s",flexShrink:0}}>
            🗑 Clear
          </button>
        </div>

        {/* ── SUGGESTION CHIPS ── */}
        <div style={{padding:"9px 15px 8px",background:"#fff",borderBottom:"1px solid #e9ecef",flexShrink:0}}>
          <div className="chip-grid" style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
            {SUGGESTIONS.map((s,i)=>(
              <button key={i} className="ai-chip" onClick={()=>send(s.label)} disabled={loading} style={{background:"#f9fafb",border:"1.5px solid #e5e7eb",borderRadius:"20px",padding:"5px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#555",cursor:"pointer",transition:"all 0.18s",display:"flex",alignItems:"center",gap:"4px",animation:`slideUp 0.3s ease ${i*0.03}s both`}}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CHAT AREA ── */}
        <div className="chat-scroll" style={{flex:1,overflowY:"auto",padding:"18px 16px",display:"flex",flexDirection:"column"}}>
          {messages.map((m,i)=>
            m.role==="user"
              ? <UserBubble key={i} text={m.text}/>
              : <AIBubble key={i} text={m.text} isNew={m.isNew} programCard={m.programCard} navigate={navigate}/>
          )}
          {loading && <AIBubble loading text="" isNew={false}/>}
          <div ref={bottomRef}/>
        </div>

        {/* ── INPUT BAR ── */}
        <div style={{padding:"11px 15px",background:"#fff",borderTop:"1px solid #e9ecef",flexShrink:0,boxShadow:"0 -2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",gap:"9px",alignItems:"center"}}>
            <input
              ref={inputRef}
              className="ai-chat-input"
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
              placeholder="Ask about a program, fee, admission, eligibility..."
              disabled={loading}
              style={{flex:1,padding:"12px 16px",border:"2px solid #e5e7eb",borderRadius:"12px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",background:"#fff",color:"#111",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}
            />
            <button className="ai-send" onClick={()=>send()} disabled={loading||!input.trim()} style={{background:loading||!input.trim()?"#e5e7eb":"#103d25",color:loading||!input.trim()?"#aaa":"#fff",border:"none",borderRadius:"12px",width:"46px",height:"46px",flexShrink:0,cursor:loading||!input.trim()?"not-allowed":"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10.5px",color:"#ccc",marginTop:"7px",textAlign:"center"}}>
            For subject help, consult your class teacher. This assistant covers admissions &amp; program guidance only.
          </p>
        </div>
      </div>
    </>
  );
}