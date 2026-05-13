import { useState, useEffect, useRef } from "react";
import PageLayout from "../components/PageLayout";

const QUIZ_DATA = {
  "FSc Science": {
    icon: "⚗️",
    color: "#1a5c38",
    accent: "#c9a84c",
    questions: [
      { q: "What is the SI unit of electric current?", options: ["Ohm", "Ampere", "Watt", "Volt"], answer: 1 },
      { q: "Which gas is most abundant in Earth's atmosphere?", options: ["Hydrogen", "Nitrogen", "Oxygen", "Carbon dioxide"], answer: 1 },
      { q: "Newton's second law relates force to:", options: ["displacement", "momentum", "acceleration", "velocity"], answer: 2 },
      { q: "The atomic number of Carbon is:", options: ["8", "12", "6", "14"], answer: 2 },
      { q: "Which lens corrects myopia?", options: ["Concave", "Bifocal", "Cylindrical", "Convex"], answer: 0 },
      { q: "Photosynthesis takes place in:", options: ["Nucleus", "Ribosome", "Chloroplast", "Mitochondria"], answer: 2 },
      { q: "Value of gravitational acceleration g on Earth:", options: ["10.8 m/s²", "9.8 m/s²", "8.9 m/s²", "7.9 m/s²"], answer: 1 },
      { q: "Chemical formula of water:", options: ["H₂O", "OH", "HO", "H₂O₂"], answer: 0 },
      { q: "Which particle has no electric charge?", options: ["Proton", "Neutron", "Electron", "Positron"], answer: 1 },
      { q: "Speed of light in vacuum:", options: ["3×10¹⁰ m/s", "3×10⁴ m/s", "3×10⁶ m/s", "3×10⁸ m/s"], answer: 3 },
      { q: "Ohm's law states V =", options: ["I+R", "IR", "I²R", "I/R"], answer: 1 },
      { q: "DNA stands for:", options: ["Dinitroribose Acid", "Deoxyribonitric Acid", "Diribonucleic Acid", "Deoxyribonucleic Acid"], answer: 3 },
      { q: "Which blood cells carry oxygen?", options: ["Plasma", "Platelets", "White blood cells", "Red blood cells"], answer: 3 },
      { q: "The powerhouse of the cell is:", options: ["Mitochondria", "Ribosome", "Chloroplast", "Nucleus"], answer: 0 },
      { q: "Boyle's Law is related to:", options: ["Temperature & Volume", "Pressure & Volume", "Volume & Moles", "Pressure & Temperature"], answer: 1 },
    ],
  },
  "FSc Pre-Medical": {
    icon: "🩺",
    color: "#0e7490",
    accent: "#c9a84c",
    questions: [
      { q: "The basic unit of life is:", options: ["Molecule", "Tissue", "Cell", "Organ"], answer: 2 },
      { q: "Which vitamin is produced by sunlight?", options: ["Vitamin B", "Vitamin D", "Vitamin C", "Vitamin A"], answer: 1 },
      { q: "Normal human body temperature:", options: ["37°C", "36°C", "35°C", "39°C"], answer: 0 },
      { q: "The largest organ of human body:", options: ["Lung", "Skin", "Heart", "Liver"], answer: 1 },
      { q: "Insulin is produced by:", options: ["Liver", "Kidney", "Pancreas", "Thyroid"], answer: 2 },
      { q: "Human body cells have how many chromosomes?", options: ["23", "46", "48", "44"], answer: 1 },
      { q: "Universal blood donor type:", options: ["A+", "O-", "AB+", "B-"], answer: 1 },
      { q: "Photosynthesis produces which gas?", options: ["N₂", "H₂", "O₂", "CO₂"], answer: 2 },
      { q: "Study of bones is called:", options: ["Neurology", "Dermatology", "Cardiology", "Osteology"], answer: 3 },
      { q: "Which part of brain controls balance?", options: ["Cerebellum", "Cerebrum", "Medulla", "Thalamus"], answer: 0 },
      { q: "Hemoglobin is found in:", options: ["White blood cells", "Platelets", "Plasma", "Red blood cells"], answer: 3 },
      { q: "Chemical symbol for Gold:", options: ["Ag", "Au", "Gd", "Go"], answer: 1 },
      { q: "Which organ filters blood?", options: ["Heart", "Spleen", "Liver", "Kidney"], answer: 3 },
      { q: "Mitosis results in how many daughter cells?", options: ["4", "2", "1", "3"], answer: 1 },
      { q: "pH of human blood is approximately:", options: ["6.4", "7.4", "8.4", "5.4"], answer: 1 },
    ],
  },
  "Arts (FA)": {
    icon: "🎨",
    color: "#7c3aed",
    accent: "#c9a84c",
    questions: [
      { q: "Who wrote the Pakistani national anthem?", options: ["Faiz Ahmed Faiz", "Allama Iqbal", "Josh Malihabadi", "Hafeez Jalandhari"], answer: 3 },
      { q: "Largest desert in the world:", options: ["Gobi", "Thar", "Arabian", "Sahara"], answer: 3 },
      { q: "Pakistan was founded in:", options: ["1945", "1946", "1947", "1948"], answer: 2 },
      { q: "Capital city of Pakistan:", options: ["Karachi", "Peshawar", "Lahore", "Islamabad"], answer: 3 },
      { q: "Father of the Nation of Pakistan:", options: ["Allama Iqbal", "Quaid-e-Azam", "Liaquat Ali Khan", "Sir Syed"], answer: 1 },
      { q: "KPK provincial capital:", options: ["Lahore", "Peshawar", "Muzaffarabad", "Quetta"], answer: 1 },
      { q: "National language of Pakistan:", options: ["Pashto", "Punjabi", "Sindhi", "Urdu"], answer: 3 },
      { q: "Allama Iqbal's Shikwa was written in:", options: ["Hindi", "Urdu", "Persian", "Punjabi"], answer: 1 },
      { q: "Two-Nation Theory was based on:", options: ["Culture", "Language", "Economy", "Religion"], answer: 3 },
      { q: "Longest river in Pakistan:", options: ["Ravi", "Jhelum", "Indus", "Chenab"], answer: 2 },
      { q: "Peshawar famous historical landmark:", options: ["Faisal Mosque", "Badshahi Mosque", "Lahore Fort", "Qissa Khwani Bazaar"], answer: 3 },
      { q: "In Urdu grammar 'ism' refers to:", options: ["Adjective", "Noun", "Verb", "Adverb"], answer: 1 },
      { q: "Pakistan's first prime minister:", options: ["ZA Bhutto", "Liaquat Ali Khan", "Yahya Khan", "Ayub Khan"], answer: 1 },
      { q: "Khyber Pass connects Pakistan with:", options: ["China", "India", "Afghanistan", "Iran"], answer: 2 },
      { q: "Indus Valley Civilization is approximately how old?", options: ["3000 years", "1000 years", "10000 years", "5000 years"], answer: 3 },
    ],
  },
  "BS Computer Science": {
    icon: "💻",
    color: "#0f766e",
    accent: "#c9a84c",
    questions: [
      { q: "CPU stands for:", options: ["Central Program Unit", "Central Processing Unit", "Computer Processing Unit", "Core Processing Unit"], answer: 1 },
      { q: "Which language is backbone of the web?", options: ["C++", "Java", "HTML", "Python"], answer: 2 },
      { q: "Binary equivalent of decimal 10:", options: ["1010", "1100", "1001", "0110"], answer: 0 },
      { q: "RAM stands for:", options: ["Read Arithmetic Memory", "Read Access Memory", "Random Access Memory", "Rapid Access Memory"], answer: 2 },
      { q: "Which data structure uses LIFO?", options: ["Array", "Stack", "Tree", "Queue"], answer: 1 },
      { q: "OOP stands for:", options: ["Oriented Object Program", "Open Operational Process", "Object-Only Processing", "Object-Oriented Programming"], answer: 3 },
      { q: "A loop that never ends is called:", options: ["While loop", "Nested loop", "Infinite loop", "For loop"], answer: 2 },
      { q: "SQL stands for:", options: ["Simple Query Language", "Structured Question Loop", "Standard Question Language", "Structured Query Language"], answer: 3 },
      { q: "Internet uses which protocol suite?", options: ["HTTP", "TCP/IP", "SMTP", "FTP"], answer: 1 },
      { q: "An algorithm is:", options: ["A database", "A programming language", "A type of computer", "A step-by-step problem solving process"], answer: 3 },
      { q: "Single-line comment in Python:", options: ["//", "--", "/*", "#"], answer: 3 },
      { q: "Output of 2**3 in Python:", options: ["6", "5", "8", "9"], answer: 2 },
      { q: "Primary key in a database must be:", options: ["Duplicate", "Unique", "Optional", "Null"], answer: 1 },
      { q: "Merge Sort average time complexity:", options: ["O(n log n)", "O(log n)", "O(n²)", "O(n)"], answer: 0 },
      { q: "Which is NOT a programming language?", options: ["Microsoft Word", "Python", "Java", "HTML"], answer: 0 },
    ],
  },
  "BS English": {
    icon: "📚",
    color: "#b45309",
    accent: "#c9a84c",
    questions: [
      { q: "Who wrote Romeo and Juliet?", options: ["William Shakespeare", "Jane Austen", "John Keats", "Charles Dickens"], answer: 0 },
      { q: "A word that describes a noun:", options: ["Pronoun", "Adjective", "Verb", "Adverb"], answer: 1 },
      { q: "Repeating consonant sounds at start of words:", options: ["Metaphor", "Onomatopoeia", "Simile", "Alliteration"], answer: 3 },
      { q: "Pride and Prejudice was written by:", options: ["Charlotte Bronte", "Emily Bronte", "Virginia Woolf", "Jane Austen"], answer: 3 },
      { q: "A sonnet has how many lines?", options: ["16", "10", "14", "12"], answer: 2 },
      { q: "Synonym for happy:", options: ["Angry", "Joyful", "Sad", "Tired"], answer: 1 },
      { q: "Study of meaning of words:", options: ["Phonology", "Semantics", "Syntax", "Morphology"], answer: 1 },
      { q: "Which is a Shakespearean tragedy?", options: ["As You Like It", "Hamlet", "The Tempest", "A Midsummer Night Dream"], answer: 1 },
      { q: "A metaphor:", options: ["Uses like or as", "Exaggerates for effect", "Directly compares two things", "Repeats sounds"], answer: 2 },
      { q: "Past tense of write:", options: ["Wrote", "Writed", "Written", "Writ"], answer: 0 },
      { q: "Atticus Finch is in:", options: ["Brave New World", "To Kill a Mockingbird", "The Great Gatsby", "1984"], answer: 1 },
      { q: "The protagonist is:", options: ["The narrator", "A minor character", "The villain", "The main character"], answer: 3 },
      { q: "Iambic pentameter syllables per line:", options: ["12", "14", "8", "10"], answer: 3 },
      { q: "Onomatopoeia means:", options: ["Repetition of vowels", "Comparing two things", "Exaggeration", "A word that sounds like its meaning"], answer: 3 },
      { q: "Haiku is a form of:", options: ["Essay", "Prose", "Drama", "Poetry"], answer: 3 },
    ],
  },
  "BS Political Science": {
    icon: "🏛️",
    color: "#1e3a5f",
    accent: "#c9a84c",
    questions: [
      { q: "Father of Political Science:", options: ["Aristotle", "Machiavelli", "Socrates", "Plato"], answer: 0 },
      { q: "Pakistan follows which government system?", options: ["Federal Parliamentary", "Confederate", "Unitary", "Presidential"], answer: 0 },
      { q: "United Nations was founded in:", options: ["1944", "1945", "1946", "1943"], answer: 1 },
      { q: "Separation of Powers concept by:", options: ["Rousseau", "Montesquieu", "Locke", "Hobbes"], answer: 1 },
      { q: "UN Security Council permanent members:", options: ["5", "3", "6", "4"], answer: 0 },
      { q: "Social Contract theory associated with:", options: ["Rousseau", "Marx", "Hegel", "Aristotle"], answer: 0 },
      { q: "Pakistan constitution adopted in:", options: ["1956", "1973", "1962", "1977"], answer: 1 },
      { q: "Cold War was between:", options: ["UK & France", "Germany & Japan", "USA & China", "USA & USSR"], answer: 3 },
      { q: "Federalism means:", options: ["Military rule", "One party rule", "Power in one center", "Power shared between central and regional governments"], answer: 3 },
      { q: "The Prince was written by:", options: ["Hobbes", "Machiavelli", "Plato", "Aristotle"], answer: 1 },
      { q: "UN organ for peace and security:", options: ["Secretariat", "ICJ", "General Assembly", "Security Council"], answer: 3 },
      { q: "Democracy literally means:", options: ["Rule of the people", "Rule of law", "Rule of the elite", "Rule of God"], answer: 0 },
      { q: "Pakistan became a republic in:", options: ["1952", "1960", "1956", "1947"], answer: 2 },
      { q: "NATO is a:", options: ["Economic alliance", "Cultural alliance", "Trade alliance", "Military alliance"], answer: 3 },
      { q: "Balance of power relates to:", options: ["Constitutional law", "Domestic politics", "Electoral systems", "International relations"], answer: 3 },
    ],
  },
  "BBA": {
    icon: "📊",
    color: "#92400e",
    accent: "#c9a84c",
    questions: [
      { q: "GDP stands for:", options: ["Global Domestic Plan", "Gross Domestic Product", "Gross Development Production", "General Development Plan"], answer: 1 },
      { q: "Marketing mix — which is NOT a P?", options: ["Place", "People", "Product", "Price"], answer: 1 },
      { q: "Which statement shows profitability?", options: ["Trial Balance", "Cash Flow Statement", "Balance Sheet", "Income Statement"], answer: 3 },
      { q: "Supply and demand is a concept in:", options: ["Accounting", "Economics", "Management", "Marketing"], answer: 1 },
      { q: "SWOT — O stands for:", options: ["Operations", "Objectives", "Outcomes", "Opportunities"], answer: 3 },
      { q: "Entrepreneurship means:", options: ["Investing in stocks", "Working for a company", "Starting and running a business", "Government work"], answer: 2 },
      { q: "Inflation means:", options: ["Increase in income", "Decrease in population", "Increase in prices over time", "Decrease in prices"], answer: 2 },
      { q: "HR department manages:", options: ["Employees", "IT systems", "Financial reporting", "Marketing products"], answer: 0 },
      { q: "Break-even point is when:", options: ["Profit is maximum", "Revenue = Cost", "Revenue > Cost", "Revenue < Cost"], answer: 1 },
      { q: "Which is NOT a management function?", options: ["Selling", "Organizing", "Controlling", "Planning"], answer: 0 },
      { q: "E-commerce means:", options: ["Electronic banking", "Buying and selling over the internet", "Electronic manufacturing", "Email communication"], answer: 1 },
      { q: "Fixed costs are:", options: ["Costs that remain constant", "Costs that change with production", "Variable expenses", "Costs of raw materials"], answer: 0 },
      { q: "Stock market is for:", options: ["Buying and selling company shares", "Buying groceries", "Paying taxes", "Storing money"], answer: 0 },
      { q: "Auditing purpose is:", options: ["Hiring employees", "Increasing sales", "Product development", "Verifying financial records"], answer: 3 },
      { q: "Working capital is:", options: ["Current assets minus current liabilities", "Net profit", "Total equity", "Long-term assets"], answer: 0 },
    ],
  },
};

const PROGRAMMES = Object.keys(QUIZ_DATA);
const QUIZ_TIME = 15 * 60;
const LABELS = ["A", "B", "C", "D"];

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function getResult(pct) {
  if (pct >= 80) return {
    emoji: "🏆", grade: "Excellent!",
    msg: "Outstanding performance! You have a strong grasp of this subject. Great careers await you in this field — keep pushing forward!",
    color: "#1a5c38", light: "rgba(26,92,56,0.08)", border: "rgba(26,92,56,0.25)",
  };
  if (pct >= 60) return {
    emoji: "👍", grade: "Good Job!",
    msg: "Well done! You have a solid foundation. With a bit more study and practice, you will excel in this programme.",
    color: "#c9a84c", light: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.3)",
  };
  if (pct >= 40) return {
    emoji: "📖", grade: "Keep Going!",
    msg: "You are on the right track! Every expert was once a beginner. Revise the topics you missed and try again — you have got this!",
    color: "#0e7490", light: "rgba(14,116,144,0.08)", border: "rgba(14,116,144,0.25)",
  };
  return {
    emoji: "💪", grade: "Don't Give Up!",
    msg: "Every great journey begins with a single step. Failure is just a lesson in disguise. Study harder, believe in yourself, and come back stronger. Your potential is limitless!",
    color: "#b45309", light: "rgba(180,83,9,0.08)", border: "rgba(180,83,9,0.25)",
  };
}

// ─── PROGRAMME SELECT ───────────────────────────
function ProgrammeSelect({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ animation: "fadeUp 0.45s ease" }}>
      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",
        borderRadius: "16px",
        padding: "clamp(24px,5vw,44px) clamp(20px,5vw,40px)",
        marginBottom: "28px",
        position: "relative", overflow: "hidden",
        boxShadow: "0 8px 32px rgba(16,61,37,0.22)",
      }}>
        <div style={{ position:"absolute",top:"-40px",right:"-40px",width:"180px",height:"180px",borderRadius:"50%",background:"rgba(201,168,76,0.1)",pointerEvents:"none" }} />
        <div style={{
          display:"inline-flex",alignItems:"center",gap:"6px",
          background:"rgba(201,168,76,0.2)",border:"1px solid #c9a84c",
          color:"#e8c97a",padding:"4px 12px",borderRadius:"20px",
          fontSize:"11px",letterSpacing:"1.5px",textTransform:"uppercase",
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:"14px",
        }}>📝 Assessment Centre</div>
        <h2 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(18px,4vw,28px)",color:"#fff",marginBottom:"12px",lineHeight:1.3,
        }}>Which programme are you applying for?</h2>
        <p style={{
          fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(13px,3vw,15px)",
          color:"rgba(255,255,255,0.72)",lineHeight:1.7,margin:0,
        }}>
          Select your programme to begin. Each quiz has <strong style={{color:"#e8c97a"}}>15 questions</strong> and a <strong style={{color:"#e8c97a"}}>15-minute</strong> countdown timer.
        </p>
      </div>

      {/* Programme cards */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,220px),1fr))",
        gap:"14px",
      }}>
        {PROGRAMMES.map((prog, i) => {
          const d = QUIZ_DATA[prog];
          const isHov = hovered === prog;
          return (
            <button key={prog}
              onClick={() => onSelect(prog)}
              onMouseEnter={() => setHovered(prog)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isHov ? "#f8f9fa" : "#fff",
                border: `2px solid ${isHov ? "#d1d5db" : "#e9ecef"}`,
                borderRadius:"14px",
                padding:"clamp(18px,4vw,26px) clamp(16px,4vw,22px)",
                cursor:"pointer",
                textAlign:"left", transition:"all 0.2s ease",
                boxShadow: isHov ? "0 6px 20px rgba(0,0,0,0.09)" : "0 2px 6px rgba(0,0,0,0.04)",
                transform: isHov ? "translateY(-3px)" : "none",
                animation: `fadeUp 0.4s ease ${i*0.06}s both`,
                width:"100%",
              }}>
              <div style={{ fontSize:"30px",marginBottom:"12px" }}>{d.icon}</div>
              <div style={{
                fontFamily:"'Playfair Display',serif",fontSize:"clamp(14px,3vw,17px)",marginBottom:"4px",
                color:"#103d25",
              }}>{prog}</div>
              <div style={{
                fontFamily:"'DM Sans',sans-serif",fontSize:"12px",
                color:"#9ca3af",marginBottom:"14px",
              }}>15 Questions · 15 Min Timer</div>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:"5px",
                background: isHov ? "#103d25" : "#f3f4f6",
                color: isHov ? "#fff" : "#374151",
                padding:"5px 12px",borderRadius:"20px",
                fontSize:"12px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,
                transition:"all 0.2s ease",
              }}>Start Quiz →</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── QUIZ SCREEN ────────────────────────────────
function QuizScreen({ programme, onFinish, onBack }) {
  const d = QUIZ_DATA[programme];
  const qs = d.questions;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(15).fill(null));
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const timerRef = useRef();
  const topRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); onFinish(answers); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [current]);

  const q = qs[current];
  const timerColor = timeLeft > 300 ? "#1a5c38" : timeLeft > 120 ? "#c9a84c" : "#dc2626";
  const timerBg = timeLeft > 300 ? "rgba(26,92,56,0.08)" : timeLeft > 120 ? "rgba(201,168,76,0.1)" : "rgba(220,38,38,0.08)";

  const confirm = () => {
    if (selected === null) return;
    const a = [...answers]; a[current] = selected; setAnswers(a); setConfirmed(true);
  };
  const next = () => {
    if (current === qs.length - 1) { clearInterval(timerRef.current); onFinish(answers); }
    else { setCurrent(c => c + 1); setSelected(null); setConfirmed(false); }
  };

  const optStyle = (idx) => {
    if (confirmed) {
      if (idx === q.answer)
        return { bg:"rgba(26,92,56,0.08)", border:"#1a5c38", color:"#103d25", labelBg:"#1a5c38", labelColor:"#fff" };
      if (idx === selected && idx !== q.answer)
        return { bg:"rgba(220,38,38,0.06)", border:"#dc2626", color:"#991b1b", labelBg:"#dc2626", labelColor:"#fff" };
    } else if (selected === idx) {
      return { bg:"#f0fdf4", border:"#103d25", color:"#103d25", labelBg:"#103d25", labelColor:"#fff" };
    }
    return { bg:"#fff", border:"#e5e7eb", color:"#374151", labelBg:"#f3f4f6", labelColor:"#6b7280" };
  };

  return (
    <div ref={topRef} style={{ animation:"fadeUp 0.4s ease", scrollMarginTop:"80px" }}>
      {/* Top bar — stacks on mobile */}
      <div style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        flexWrap:"wrap",gap:"10px",marginBottom:"18px",
        background:"#fff",borderRadius:"14px",padding:"12px 16px",
        border:"1px solid #e9ecef",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <button onClick={onBack} style={{
          background:"none",border:"1.5px solid #e5e7eb",borderRadius:"8px",
          padding:"6px 12px",cursor:"pointer",color:"#6b7280",
          fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:500,
          display:"flex",alignItems:"center",gap:"4px",transition:"all 0.18s",
          flexShrink:0,
        }}
        onMouseEnter={e=>{e.currentTarget.style.background="#f8f9fa";}}
        onMouseLeave={e=>{e.currentTarget.style.background="none";}}
        >← Back</button>

        <div style={{ display:"flex",alignItems:"center",gap:"6px",flex:1,justifyContent:"center",minWidth:0 }}>
          <span style={{ fontSize:"16px" }}>{d.icon}</span>
          <span style={{
            fontFamily:"'Playfair Display',serif",fontSize:"clamp(13px,3vw,15px)",
            color:"#103d25",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
          }}>{programme}</span>
        </div>

        {/* Timer — compact on mobile */}
        <div style={{
          display:"flex",alignItems:"center",gap:"6px",
          background:timerBg,border:`2px solid ${timerColor}40`,
          borderRadius:"10px",padding:"6px 12px",transition:"all 0.4s",
          flexShrink:0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={timerColor} strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span style={{
            fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,4vw,18px)",fontWeight:800,
            color:timerColor,letterSpacing:"1.5px",
          }}>{formatTime(timeLeft)}</span>
          {timeLeft < 120 && (
            <span style={{ fontSize:"10px",color:"#dc2626",fontFamily:"'DM Sans',sans-serif",fontWeight:700 }}>!</span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom:"20px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"7px" }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#6b7280",fontWeight:500 }}>
            Question {current+1} <span style={{color:"#9ca3af"}}>of {qs.length}</span>
          </span>
          <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#103d25",fontWeight:600 }}>
            {Math.round((current+1)/qs.length*100)}%
          </span>
        </div>
        <div style={{ background:"#f0f0f0",borderRadius:"6px",height:"6px",overflow:"hidden" }}>
          <div style={{
            height:"100%",borderRadius:"6px",
            background:"linear-gradient(90deg,#103d25,#c9a84c)",
            width:`${((current+1)/qs.length)*100}%`,transition:"width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{
        background:"#fff",borderRadius:"16px",
        padding:"clamp(20px,5vw,36px) clamp(16px,5vw,32px)",
        border:"1px solid #e9ecef",boxShadow:"0 4px 16px rgba(0,0,0,0.05)",
        marginBottom:"18px",
      }}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:"5px",
          background:"rgba(16,61,37,0.06)",border:"1px solid rgba(16,61,37,0.15)",
          color:"#103d25",padding:"3px 10px",borderRadius:"20px",
          fontSize:"11px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,
          letterSpacing:"1px",textTransform:"uppercase",marginBottom:"14px",
        }}>Q {current+1} / {qs.length}</div>

        <p style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(16px,3.5vw,20px)",
          color:"#103d25",lineHeight:1.55,marginBottom:"24px",fontWeight:600,
        }}>{q.q}</p>

        {/* Options — always single column on mobile, 2-col on wider screens */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,260px),1fr))",
          gap:"10px",
        }}>
          {q.options.map((opt, idx) => {
            const s = optStyle(idx);
            const isCorrect = confirmed && idx === q.answer;
            const isWrong = confirmed && idx === selected && idx !== q.answer;
            return (
              <button key={idx}
                onClick={() => !confirmed && setSelected(idx)}
                onMouseEnter={e => {
                  if (!confirmed && selected !== idx) {
                    e.currentTarget.style.background = "#f8f9fa";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }
                }}
                onMouseLeave={e => {
                  if (!confirmed && selected !== idx) {
                    e.currentTarget.style.background = s.bg;
                    e.currentTarget.style.borderColor = s.border;
                  }
                }}
                style={{
                  background:s.bg,border:`2px solid ${s.border}`,
                  borderRadius:"12px",
                  padding:"clamp(11px,3vw,14px) clamp(12px,3vw,16px)",
                  cursor:confirmed?"default":"pointer",
                  textAlign:"left",transition:"all 0.18s ease",
                  color:s.color,fontFamily:"'DM Sans',sans-serif",
                  fontSize:"clamp(13px,3vw,14px)",fontWeight:500,
                  display:"flex",alignItems:"center",gap:"10px",
                  minHeight:"48px",
                  width:"100%",
                }}>
                <span style={{
                  width:"28px",height:"28px",borderRadius:"50%",flexShrink:0,
                  background: isCorrect?"#1a5c38":isWrong?"#dc2626":selected===idx?"#103d25":s.labelBg,
                  color: isCorrect||isWrong||selected===idx?"#fff":s.labelColor,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"11px",fontWeight:800,transition:"all 0.18s",fontFamily:"'DM Sans',sans-serif",
                }}>
                  {isCorrect ? "✓" : isWrong ? "✗" : LABELS[idx]}
                </span>
                <span style={{ flex:1,lineHeight:1.4,wordBreak:"break-word" }}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action row */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px" }}>
        {/* Dot nav — hidden on very small screens to save space */}
        <div style={{ display:"flex",flexWrap:"wrap",gap:"5px",maxWidth:"240px" }}>
          {qs.map((_,i) => (
            <div key={i} style={{
              width:"8px",height:"8px",borderRadius:"50%",
              background: i < current ? "#103d25" : i===current ? "#c9a84c" : "#e5e7eb",
              transition:"background 0.3s",
            }} />
          ))}
        </div>

        {!confirmed ? (
          <button onClick={confirm} disabled={selected===null} style={{
            background: selected===null ? "#f3f4f6" : "linear-gradient(135deg,#103d25,#1a5c38)",
            color: selected===null ? "#9ca3af" : "#fff",
            border:"none",borderRadius:"10px",
            padding:"12px clamp(20px,5vw,30px)",
            fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:700,
            cursor:selected===null?"not-allowed":"pointer",
            boxShadow: selected!==null?"0 4px 14px rgba(16,61,37,0.28)":"none",
            transition:"all 0.2s",whiteSpace:"nowrap",
          }}>Confirm Answer</button>
        ) : (
          <button onClick={next} style={{
            background:"linear-gradient(135deg,#103d25,#1a5c38)",
            color:"#fff",border:"none",borderRadius:"10px",
            padding:"12px clamp(20px,5vw,30px)",
            fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:700,
            cursor:"pointer",boxShadow:"0 4px 14px rgba(16,61,37,0.32)",
            display:"flex",alignItems:"center",gap:"7px",whiteSpace:"nowrap",
          }}>
            {current===qs.length-1 ? "View Results 🎯" : "Next →"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── RESULT SCREEN ──────────────────────────────
function ResultScreen({ programme, answers, onRetry, onHome }) {
  const d = QUIZ_DATA[programme];
  const qs = d.questions;
  const correct = answers.filter((a,i) => a === qs[i].answer).length;
  const skipped = answers.filter(a => a===null).length;
  const wrong = qs.length - correct - skipped;
  const pct = Math.round((correct / qs.length) * 100);
  const res = getResult(pct);
  const radius = 48, circ = 2 * Math.PI * radius;
  const dash = circ - (pct/100)*circ;

  return (
    <div style={{ animation:"fadeUp 0.5s ease" }}>
      {/* Result hero */}
      <div style={{
        background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",
        borderRadius:"18px",
        padding:"clamp(28px,6vw,44px) clamp(20px,6vw,40px)",
        marginBottom:"22px",
        textAlign:"center",position:"relative",overflow:"hidden",
        boxShadow:"0 10px 36px rgba(16,61,37,0.22)",
      }}>
        <div style={{ position:"absolute",top:"-40px",right:"-40px",width:"160px",height:"160px",borderRadius:"50%",background:"rgba(201,168,76,0.1)",pointerEvents:"none" }} />
        <div style={{ fontSize:"clamp(36px,8vw,52px)",marginBottom:"8px" }}>{res.emoji}</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,5vw,30px)",color:"#fff",marginBottom:"10px" }}>
          {res.grade}
        </h2>

        {/* Circular gauge */}
        <div style={{ display:"flex",justifyContent:"center",margin:"16px 0" }}>
          <svg width="120" height="120">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10"/>
            <circle cx="60" cy="60" r={radius} fill="none"
              stroke="#c9a84c" strokeWidth="10"
              strokeDasharray={circ} strokeDashoffset={dash}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition:"stroke-dashoffset 1.5s ease" }}
            />
            <text x="60" y="56" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800"
              fontFamily="Playfair Display,serif">{pct}%</text>
            <text x="60" y="73" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11"
              fontFamily="DM Sans,sans-serif">{correct}/{qs.length}</text>
          </svg>
        </div>

        <p style={{
          fontFamily:"'DM Sans',sans-serif",
          fontSize:"clamp(13px,3vw,15px)",
          color:"rgba(255,255,255,0.82)",lineHeight:1.75,
          maxWidth:"460px",margin:"0 auto",
        }}>
          {res.msg}
        </p>
      </div>

      {/* Score pills — 2x2 on mobile, 4-col on wider */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(2,1fr)",
        gap:"12px",marginBottom:"24px",
      }}>
        {[
          { label:"Correct", val:correct, color:"#1a5c38", bg:"rgba(26,92,56,0.08)", border:"rgba(26,92,56,0.2)" },
          { label:"Wrong",   val:wrong,   color:"#dc2626", bg:"rgba(220,38,38,0.08)", border:"rgba(220,38,38,0.2)" },
          { label:"Skipped", val:skipped, color:"#6b7280", bg:"rgba(107,114,128,0.08)", border:"rgba(107,114,128,0.2)" },
          { label:"Score",   val:`${pct}%`, color:"#103d25", bg:"rgba(16,61,37,0.06)", border:"rgba(16,61,37,0.2)" },
        ].map(p => (
          <div key={p.label} style={{
            background:p.bg,border:`1.5px solid ${p.border}`,
            borderRadius:"14px",padding:"16px 10px",textAlign:"center",
          }}>
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,5vw,26px)",color:p.color,fontWeight:700 }}>{p.val}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#9ca3af",marginTop:"4px",textTransform:"uppercase",letterSpacing:"0.5px" }}>{p.label}</div>
          </div>
        ))}
      </div>

      {/* Answer review */}
      <div style={{ marginBottom:"28px" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(17px,4vw,20px)",color:"#103d25",marginBottom:"14px" }}>
          📋 Answer Review
        </h3>
        <div style={{ display:"flex",flexDirection:"column",gap:"9px" }}>
          {qs.map((q,i) => {
            const ua = answers[i];
            const ok = ua === q.answer;
            const sk = ua === null;
            return (
              <div key={i} style={{
                background:"#fff",borderRadius:"12px",
                padding:"clamp(12px,3vw,16px) clamp(14px,4vw,20px)",
                border:`1.5px solid ${ok?"rgba(26,92,56,0.2)":sk?"#e5e7eb":"rgba(220,38,38,0.2)"}`,
                display:"flex",gap:"10px",alignItems:"flex-start",
              }}>
                <div style={{
                  width:"28px",height:"28px",borderRadius:"50%",flexShrink:0,
                  background: ok?"rgba(26,92,56,0.1)":sk?"rgba(107,114,128,0.1)":"rgba(220,38,38,0.1)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",
                  marginTop:"1px",
                }}>
                  {ok?"✅":sk?"⏭️":"❌"}
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(12px,3vw,13.5px)",color:"#374151",marginBottom:"5px",fontWeight:500,lineHeight:1.45 }}>
                    Q{i+1}. {q.q}
                  </p>
                  <div style={{ display:"flex",gap:"10px",flexWrap:"wrap" }}>
                    {!sk && !ok && (
                      <span style={{ fontSize:"12px",color:"#dc2626",fontFamily:"'DM Sans',sans-serif" }}>
                        ✗ Your: {q.options[ua]}
                      </span>
                    )}
                    <span style={{ fontSize:"12px",color:"#1a5c38",fontFamily:"'DM Sans',sans-serif",fontWeight:500 }}>
                      ✓ Correct: {q.options[q.answer]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center" }}>
        <button onClick={onRetry}
          onMouseEnter={e=>{e.currentTarget.style.opacity="0.9";e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="none";}}
          style={{
            background:"linear-gradient(135deg,#103d25,#1a5c38)",
            color:"#fff",border:"none",borderRadius:"10px",
            padding:"12px clamp(18px,5vw,28px)",
            fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:700,
            cursor:"pointer",boxShadow:"0 4px 14px rgba(16,61,37,0.28)",
            transition:"all 0.2s",flex:"1",minWidth:"140px",maxWidth:"220px",
          }}>🔄 Retry Quiz</button>
        <button onClick={onHome}
          onMouseEnter={e=>{e.currentTarget.style.background="#f8f9fa";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#fff";}}
          style={{
            background:"#fff",color:"#103d25",border:"2px solid #103d25",
            borderRadius:"10px",padding:"12px clamp(18px,5vw,28px)",
            fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,
            cursor:"pointer",transition:"all 0.2s",flex:"1",minWidth:"140px",maxWidth:"220px",
          }}>🏠 All Programmes</button>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────
export default function Assessments({ navigate }) {
  const [step, setStep]           = useState("select");
  const [programme, setProgramme] = useState(null);
  const [finalAnswers, setFinal]  = useState(null);
  const pageTopRef                = useRef();

  const scrollTop = () => {
    if (pageTopRef.current) {
      pageTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelect = (prog) => { setProgramme(prog); setStep("quiz");   scrollTop(); };
  const handleFinish = (ans)  => { setFinal(ans);      setStep("result"); scrollTop(); };
  const handleRetry  = ()     => { setStep("quiz");    setFinal(null);    scrollTop(); };
  const handleHome   = ()     => { setStep("select");  setProgramme(null); setFinal(null); scrollTop(); };

  return (
    <PageLayout navigate={navigate} icon="📝" title="Assessments" breadcrumb="Assessments">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <div ref={pageTopRef} style={{ scrollMarginTop:"80px" }} />
      {step==="select" && <ProgrammeSelect onSelect={handleSelect} />}
      {step==="quiz"   && <QuizScreen programme={programme} onFinish={handleFinish} onBack={handleHome} />}
      {step==="result" && <ResultScreen programme={programme} answers={finalAnswers} onRetry={handleRetry} onHome={handleHome} />}
    </PageLayout>
  );
}