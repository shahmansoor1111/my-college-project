import { useState } from "react";
import PageLayout from "../components/PageLayout";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROGRAMMES = [
  {
    id: "fsc-cs",
    label: "FSc Computer Science",
    icon: "💻",
    color: "#1a5c38",
    light: "rgba(26,92,56,0.08)",
    border: "rgba(26,92,56,0.2)",
    type: "Intermediate",
    years: [
      {
        label: "Year 1",
        subjects: [
          {
            name: "Computer Science",
            icon: "🖥️",
            topics: ["Number Systems","Input/Output Devices","Memory & Storage","Introduction to Programming","Algorithms & Flowcharts","MS Office Basics","Internet & Email"],
            pdf: "#",
          },
          {
            name: "Mathematics",
            icon: "📐",
            topics: ["Sets & Functions","Quadratic Equations","Matrices & Determinants","Sequences & Series","Trigonometry","Permutations & Combinations","Partial Fractions"],
            pdf: "#",
          },
          {
            name: "Physics",
            icon: "⚛️",
            topics: ["Measurements & Units","Vectors & Scalars","Kinematics","Dynamics (Newton's Laws)","Work, Power & Energy","Circular Motion","Fluid Mechanics"],
            pdf: "#",
          },
          {
            name: "English",
            icon: "📝",
            topics: ["Reading Comprehension","Grammar & Usage","Essay Writing","Letter Writing","Precis Writing","Vocabulary Development","Spoken English"],
            pdf: "#",
          },
          {
            name: "Urdu",
            icon: "📖",
            topics: ["نثر","نظم","قواعد","تلخیص نویسی","خط نویسی","مضمون نویسی","اصطلاحات"],
            pdf: "#",
          },
          {
            name: "Islamic Education",
            icon: "☪️",
            topics: ["Quran & Tafseer","Hadith","Seerat-un-Nabi (S.A.W)","Islamic Ethics","Fiqh Basics","History of Islam","Islamic Values"],
            pdf: "#",
          },
          {
            name: "Pakistan Studies",
            icon: "🇵🇰",
            topics: ["Geography of Pakistan","History (1857–1947)","Independence Movement","Constitution of Pakistan","Economy","Foreign Policy","National Institutions"],
            pdf: "#",
          },
        ],
      },
      {
        label: "Year 2",
        subjects: [
          {
            name: "Computer Science",
            icon: "🖥️",
            topics: ["C++ Programming Basics","Control Structures","Functions & Arrays","Pointers","File Handling","Database Concepts","HTML & Web Basics"],
            pdf: "#",
          },
          {
            name: "Mathematics",
            icon: "📐",
            topics: ["Limits & Continuity","Differentiation","Integration","Differential Equations","Analytical Geometry","Conic Sections","Linear Programming"],
            pdf: "#",
          },
          {
            name: "Physics",
            icon: "⚛️",
            topics: ["Waves & Sound","Optics & Light","Heat & Thermodynamics","Electrostatics","Current Electricity","Magnetism","Nuclear Physics"],
            pdf: "#",
          },
          { name: "English",         icon: "📝", topics: ["Advanced Grammar","Comprehension Passages","Formal Writing","Report Writing","Literature Extracts","Poetry Analysis","Interview Skills"], pdf: "#" },
          { name: "Urdu",            icon: "📖", topics: ["ادبی اصناف","داستان","ناول","ڈرامہ","انشائیہ","افسانہ","شاعری کی اقسام"],                                                               pdf: "#" },
          { name: "Islamic Studies", icon: "☪️", topics: ["Tawheed","Risalat","Aakhirat","Islamic Social System","Islamic Economic System","Jihad & Peace","Muslim World Today"], pdf: "#" },
          { name: "Pakistan Studies",icon: "🇵🇰", topics: ["Post-Independence History","Wars & Conflicts","Economic Development","Environmental Issues","Current Affairs","Pakistan & World","National Challenges"], pdf: "#" },
        ],
      },
    ],
  },

  {
    id: "pre-medical",
    label: "FSc Pre-Medical",
    icon: "🔬",
    color: "#0e7490",
    light: "rgba(14,116,144,0.08)",
    border: "rgba(14,116,144,0.2)",
    type: "Intermediate",
    years: [
      {
        label: "Year 1",
        subjects: [
          {
            name: "Biology",
            icon: "🧬",
            topics: ["Introduction to Biology","Cell Structure & Function","Biological Molecules","Enzymes","Bioenergetics","Nutrition in Plants & Animals","Transport in Plants"],
            pdf: "#",
          },
          {
            name: "Chemistry",
            icon: "⚗️",
            topics: ["Basic Concepts","Atomic Structure","Periodic Table","Chemical Bonding","States of Matter","Solutions","Electrochemistry Intro"],
            pdf: "#",
          },
          {
            name: "Physics",
            icon: "⚛️",
            topics: ["Measurements","Kinematics","Dynamics","Work & Energy","Circular Motion","Fluid Mechanics","Oscillations"],
            pdf: "#",
          },
          { name: "English",         icon: "📝", topics: ["Reading & Comprehension","Essay Writing","Grammar","Vocabulary","Letter Writing","Spoken English","Precis"], pdf: "#" },
          { name: "Urdu",            icon: "📖", topics: ["نثر","نظم","قواعد","خط","مضمون","تلخیص","محاورے"],                                                      pdf: "#" },
          { name: "Islamic Studies", icon: "☪️", topics: ["Quran","Hadith","Seerat","Ethics","Fiqh","History","Values"],                                               pdf: "#" },
          { name: "Pakistan Studies",icon: "🇵🇰", topics: ["Geography","History","Independence","Constitution","Economy","Foreign Policy","Institutions"],              pdf: "#" },
        ],
      },
      {
        label: "Year 2",
        subjects: [
          { name: "Biology",         icon: "🧬", topics: ["Gaseous Exchange","Nervous System","Muscles & Movement","Support & Movement","Reproduction","Inheritance & Genetics","Biotechnology Intro"], pdf: "#" },
          { name: "Chemistry",       icon: "⚗️", topics: ["Reaction Kinetics","Chemical Equilibrium","Acids, Bases & Salts","Organic Chemistry Basics","Hydrocarbons","Functional Groups","Biomolecules"], pdf: "#" },
          { name: "Physics",         icon: "⚛️", topics: ["Waves","Optics","Thermodynamics","Electrostatics","Current Electricity","Electromagnetism","Nuclear Physics"], pdf: "#" },
          { name: "English",         icon: "📝", topics: ["Advanced Writing","Literature","Grammar","Report","Research Skills","Formal Correspondence","Critical Reading"], pdf: "#" },
          { name: "Urdu",            icon: "📖", topics: ["ادبی اصناف","داستان","افسانہ","شاعری","انشائیہ","ناول","ڈرامہ"],                                           pdf: "#" },
          { name: "Islamic Studies", icon: "☪️", topics: ["Tawheed","Risalat","Islamic System","Jihad","Muslim World","Ethics","Contemporary Issues"],                   pdf: "#" },
          { name: "Pakistan Studies",icon: "🇵🇰", topics: ["Post-Independence","Wars","Economy","Environment","Current Affairs","Pakistan & World","Challenges"],          pdf: "#" },
        ],
      },
    ],
  },

  {
    id: "arts",
    label: "Arts (FA)",
    icon: "🎨",
    color: "#7c3aed",
    light: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
    type: "Intermediate",
    years: [
      {
        label: "Year 1",
        subjects: [
          { name: "English",          icon: "📝", topics: ["Reading Comprehension","Essay Writing","Letter Writing","Grammar","Vocabulary","Poetry","Precis Writing"],             pdf: "#" },
          { name: "Urdu",             icon: "📖", topics: ["نثر","نظم","قواعد","مضمون","خط","تلخیص","اصطلاحات"],                                                             pdf: "#" },
          { name: "Islamic Studies",  icon: "☪️", topics: ["Quran & Tafseer","Hadith","Seerat","Fiqh","Ethics","History","Values"],                                              pdf: "#" },
          { name: "Pakistan Studies", icon: "🇵🇰", topics: ["Geography","History","Independence","Constitution","Economy","Foreign Policy","Institutions"],                       pdf: "#" },
          { name: "Economics",        icon: "📈", topics: ["Basic Concepts","Demand & Supply","Price Theory","Production","Market Structures","Money & Banking","National Income"], pdf: "#" },
          { name: "Civics",           icon: "🏛️", topics: ["The State","Constitution","Government Structure","Rights & Duties","Political Parties","Elections","Local Govt"],      pdf: "#" },
          { name: "History",          icon: "📜", topics: ["Ancient Civilisations","Islamic Empires","Mughal Empire","British India","Independence Movement","Post-1947 Pak","World History"], pdf: "#" },
        ],
      },
      {
        label: "Year 2",
        subjects: [
          { name: "English",          icon: "📝", topics: ["Advanced Grammar","Formal Writing","Literature","Report Writing","Drama & Poetry","Analytical Reading","Interview Skills"], pdf: "#" },
          { name: "Urdu",             icon: "📖", topics: ["ادبی اصناف","داستان","افسانہ","انشائیہ","شاعری","ناول","ڈرامہ"],                                                    pdf: "#" },
          { name: "Islamic Studies",  icon: "☪️", topics: ["Tawheed","Risalat","Islamic Systems","Jihad","Muslim World","Contemporary Ethics","Issues"], pdf: "#" },
          { name: "Pakistan Studies", icon: "🇵🇰", topics: ["Post-Independence","Wars","Economy","Environment","Current Affairs","Pakistan & World","National Challenges"],          pdf: "#" },
          { name: "Economics",        icon: "📈", topics: ["International Trade","Fiscal Policy","Development Economics","Agriculture Economy","Industry","Globalisation","Pak Economy"], pdf: "#" },
          { name: "Civics",           icon: "🏛️", topics: ["Federal System","Provincial Govt","Judiciary","Fundamental Rights","International Relations","UN","Human Rights"],       pdf: "#" },
          { name: "History",          icon: "📜", topics: ["1947–1971","East Pakistan","1973 Constitution","ZA Bhutto Era","Zia Regime","Democracy 1988–99","21st Century Pak"],     pdf: "#" },
        ],
      },
    ],
  },

  {
    id: "bs-cs",
    label: "BS Computer Science",
    icon: "🖥️",
    color: "#0f766e",
    light: "rgba(15,118,110,0.08)",
    border: "rgba(15,118,110,0.2)",
    type: "BS Degree",
    semesters: [
      { sem: 1, courses: [
        { name:"Programming Fundamentals",    icon:"💻", topics:["Variables & Data Types","Control Flow","Functions","Arrays","Pointers","Structs","File I/O"],        pdf:"#" },
        { name:"Calculus & Analytic Geometry",icon:"📐", topics:["Limits","Derivatives","Integration","Multivariable Calc","Series","Vectors","Geometry"],             pdf:"#" },
        { name:"English Composition",         icon:"📝", topics:["Academic Writing","Paragraph Structure","Essay Types","Research Writing","Grammar","Vocabulary","Presentations"], pdf:"#" },
        { name:"Islamic Studies",             icon:"☪️", topics:["Quran","Hadith","Seerat","Ethics","Fiqh","History","Values"],                                        pdf:"#" },
        { name:"Pakistan Studies",            icon:"🇵🇰", topics:["History","Geography","Economy","Constitution","Society","Foreign Policy","National Issues"],         pdf:"#" },
      ]},
      { sem: 2, courses: [
        { name:"Object-Oriented Programming", icon:"💻", topics:["Classes & Objects","Encapsulation","Inheritance","Polymorphism","Abstract Classes","Templates","STL"],  pdf:"#" },
        { name:"Discrete Mathematics",        icon:"📐", topics:["Logic","Sets & Relations","Functions","Graph Theory","Combinatorics","Trees","Proofs"],                pdf:"#" },
        { name:"Digital Logic Design",        icon:"🔌", topics:["Binary Systems","Boolean Algebra","Logic Gates","Combinational Circuits","Sequential Circuits","Flip-Flops","Registers"], pdf:"#" },
        { name:"Communication Skills",        icon:"📝", topics:["Spoken English","Presentations","Technical Writing","Email Writing","Interviews","Group Discussion","Report Writing"], pdf:"#" },
        { name:"Introduction to Computing",   icon:"🖥️", topics:["History of Computers","Hardware","Software","OS Basics","Networking Basics","Security Intro","Future Trends"], pdf:"#" },
      ]},
      { sem: 3, courses: [
        { name:"Data Structures & Algorithms",icon:"💻", topics:["Arrays & Linked Lists","Stacks & Queues","Trees & Heaps","Graphs","Sorting Algorithms","Searching","Complexity Analysis"], pdf:"#" },
        { name:"Database Systems",            icon:"🗄️", topics:["ER Model","Relational Model","SQL","Normalisation","Transactions","Indexing","Query Optimisation"],    pdf:"#" },
        { name:"Linear Algebra",              icon:"📐", topics:["Matrices","Determinants","Vector Spaces","Linear Transformations","Eigenvalues","Systems of Equations","Applications"], pdf:"#" },
        { name:"Operating Systems",           icon:"🖥️", topics:["Process Management","Threads","Scheduling","Memory Management","Virtual Memory","File Systems","Security"], pdf:"#" },
        { name:"Web Technologies",            icon:"🌐", topics:["HTML5","CSS3","JavaScript","Responsive Design","DOM Manipulation","Forms","Basic Backend Intro"],        pdf:"#" },
      ]},
      { sem: 4, courses: [
        { name:"Design & Analysis of Algorithms",icon:"💻", topics:["Divide & Conquer","Dynamic Programming","Greedy Algorithms","Backtracking","NP-Completeness","Graph Algorithms","Amortised Analysis"], pdf:"#" },
        { name:"Computer Networks",           icon:"🌐", topics:["OSI Model","TCP/IP","LAN & WAN","Routing & Switching","DNS & DHCP","HTTP & FTP","Network Security"], pdf:"#" },
        { name:"Software Engineering",        icon:"🛠️", topics:["SDLC Models","Requirements Engineering","UML Diagrams","Testing Strategies","Project Management","Agile & Scrum","Maintenance"], pdf:"#" },
        { name:"Probability & Statistics",    icon:"📊", topics:["Probability Rules","Distributions","Hypothesis Testing","Regression","Estimation","Bayesian Methods","Data Analysis"], pdf:"#" },
        { name:"Computer Architecture",       icon:"🔌", topics:["CPU Design","Instruction Sets","Pipelining","Memory Hierarchy","Cache","I/O Organisation","Parallel Processing"], pdf:"#" },
      ]},
      { sem: 5, courses: [
        { name:"Artificial Intelligence",    icon:"🤖", topics:["Search Algorithms","Knowledge Representation","Expert Systems","Machine Learning Intro","Neural Networks","NLP Basics","AI Ethics"], pdf:"#" },
        { name:"Theory of Automata",         icon:"📐", topics:["Finite Automata","Regular Expressions","Context-Free Grammars","Pushdown Automata","Turing Machines","Decidability","Complexity"], pdf:"#" },
        { name:"Information Security",       icon:"🔒", topics:["Cryptography","Symmetric & Asymmetric Encryption","Digital Signatures","Network Security","Firewalls","Ethical Hacking Intro","Cyber Laws"], pdf:"#" },
        { name:"Mobile App Development",     icon:"📱", topics:["Android Basics","Activities & Fragments","UI Design","REST APIs","Local Storage","Firebase","Publishing Apps"], pdf:"#" },
        { name:"Technical Writing",          icon:"📝", topics:["Technical Reports","User Manuals","Documentation","Research Papers","Proposals","Presentations","Academic Integrity"], pdf:"#" },
      ]},
      { sem: 6, courses: [
        { name:"Machine Learning",           icon:"🤖", topics:["Supervised Learning","Unsupervised Learning","SVM","Decision Trees","Random Forests","Neural Networks","Model Evaluation"], pdf:"#" },
        { name:"Cloud Computing",            icon:"☁️", topics:["Cloud Models (IaaS/PaaS/SaaS)","AWS / Azure Basics","Virtualisation","Containers & Docker","Microservices","Serverless","Cloud Security"], pdf:"#" },
        { name:"Human-Computer Interaction", icon:"🎨", topics:["UX Design Principles","User Research","Prototyping","Usability Testing","Accessibility","Interface Design","Design Thinking"], pdf:"#" },
        { name:"Compiler Construction",      icon:"💻", topics:["Lexical Analysis","Syntax Analysis","Parsing","Semantic Analysis","Code Generation","Optimisation","Symbol Tables"], pdf:"#" },
        { name:"Elective I",                 icon:"📚", topics:["As per student choice — Game Development / IoT / Blockchain / Data Science / AR-VR / Cybersecurity","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
      ]},
      { sem: 7, courses: [
        { name:"Final Year Project – I",     icon:"🎓", topics:["Project Proposal","Literature Review","Problem Statement","Methodology","System Design","Initial Prototype","Mid-Review Presentation"], pdf:"#" },
        { name:"Software Project Management",icon:"🛠️", topics:["Project Planning","Cost Estimation","Risk Management","Scheduling","Agile Practices","Team Management","Quality Assurance"], pdf:"#" },
        { name:"Elective II",                icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Elective III",               icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Internship / Research",      icon:"🏢", topics:["Industry Internship 6–8 weeks","Research Report","Internship Diary","Technical Tasks","Presentation","Evaluation","Certification"], pdf:"#" },
      ]},
      { sem: 8, courses: [
        { name:"Final Year Project – II",    icon:"🎓", topics:["Full Implementation","Testing & Debugging","Deployment","Documentation","Final Presentation","Viva Defence","Demonstration"], pdf:"#" },
        { name:"Professional Ethics in IT",  icon:"📜", topics:["Code of Ethics","Intellectual Property","Privacy Laws","Cyber Laws (PECA)","Professional Conduct","Social Responsibility","Career Development"], pdf:"#" },
        { name:"Elective IV",                icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Elective V",                 icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Thesis & Viva",              icon:"🎓", topics:["Thesis Writing","Format & Structure","References","Final Corrections","External Evaluation","Viva Questions","Degree Completion"], pdf:"#" },
      ]},
    ],
  },

  {
    id: "bba",
    label: "BBA",
    icon: "📊",
    color: "#92400e",
    light: "rgba(146,64,14,0.08)",
    border: "rgba(146,64,14,0.2)",
    type: "BS Degree",
    semesters: [
      { sem:1, courses:[
        { name:"Principles of Management",   icon:"📋", topics:["Management Functions","Planning","Organising","Leading","Controlling","Decision Making","Management Theories"], pdf:"#" },
        { name:"Business Mathematics",       icon:"📐", topics:["Sets & Functions","Linear Equations","Matrices","Sequences","Financial Mathematics","Interest","Break-Even Analysis"], pdf:"#" },
        { name:"Business Communication",     icon:"📝", topics:["Oral Communication","Written Communication","Business Letters","Emails","Reports","Presentations","Meetings"], pdf:"#" },
        { name:"Introduction to Economics",  icon:"📈", topics:["Scarcity & Choice","Demand & Supply","Elasticity","Consumer Behaviour","Production Theory","Market Structures","Intro to Macro"], pdf:"#" },
        { name:"Islamic Studies",            icon:"☪️", topics:["Quran","Hadith","Seerat","Ethics","Fiqh","History","Values"], pdf:"#" },
      ]},
      { sem:2, courses:[
        { name:"Financial Accounting",       icon:"💰", topics:["Accounting Equation","Journal & Ledger","Trial Balance","Financial Statements","Depreciation","Bank Reconciliation","Errors & Corrections"], pdf:"#" },
        { name:"Microeconomics",             icon:"📈", topics:["Consumer Theory","Indifference Curves","Production & Costs","Perfect Competition","Monopoly","Oligopoly","Game Theory"], pdf:"#" },
        { name:"Business Statistics",        icon:"📊", topics:["Data Collection","Measures of Central Tendency","Dispersion","Probability","Normal Distribution","Sampling","Index Numbers"], pdf:"#" },
        { name:"Principles of Marketing",    icon:"🛒", topics:["Marketing Concepts","Marketing Mix (4Ps)","Consumer Behaviour","Market Segmentation","Product Development","Pricing","Distribution"], pdf:"#" },
        { name:"Pakistan Studies",           icon:"🇵🇰", topics:["History","Geography","Economy","Constitution","Society","Foreign Policy","National Issues"], pdf:"#" },
      ]},
      { sem:3, courses:[
        { name:"Cost Accounting",            icon:"💰", topics:["Cost Classification","Job Costing","Process Costing","Overhead Absorption","Marginal Costing","Standard Costing","Variance Analysis"], pdf:"#" },
        { name:"Macroeconomics",             icon:"📈", topics:["National Income","GDP & GNP","Aggregate Demand & Supply","Fiscal Policy","Monetary Policy","Inflation","Unemployment"], pdf:"#" },
        { name:"Business Law",               icon:"⚖️", topics:["Contract Law","Agency Law","Partnership Law","Company Law","Sale of Goods","Negotiable Instruments","Consumer Protection"], pdf:"#" },
        { name:"Human Resource Management", icon:"👥", topics:["HRM Functions","Job Analysis","Recruitment & Selection","Training & Development","Performance Appraisal","Compensation","Labour Laws"], pdf:"#" },
        { name:"Computer Applications",     icon:"💻", topics:["MS Word","MS Excel","MS PowerPoint","Database Basics","Internet for Business","E-Commerce Intro","Accounting Software"], pdf:"#" },
      ]},
      { sem:4, courses:[
        { name:"Financial Management",       icon:"💰", topics:["Time Value of Money","Capital Budgeting","Capital Structure","Working Capital","Dividend Policy","Risk & Return","Financial Analysis"], pdf:"#" },
        { name:"Organisational Behaviour",   icon:"👥", topics:["Individual Behaviour","Motivation Theories","Group Dynamics","Leadership","Communication","Conflict Management","Organisational Culture"], pdf:"#" },
        { name:"Research Methodology",       icon:"📋", topics:["Research Design","Literature Review","Data Collection Methods","Questionnaire Design","Sampling Techniques","Data Analysis","Report Writing"], pdf:"#" },
        { name:"Marketing Management",       icon:"🛒", topics:["Strategic Marketing","Brand Management","Digital Marketing Intro","Sales Management","IMC","CRM","Marketing Analytics"], pdf:"#" },
        { name:"Entrepreneurship",           icon:"🚀", topics:["Entrepreneurial Mindset","Business Idea Generation","Feasibility Study","Business Plan","Startup Financing","Legal Aspects","Case Studies"], pdf:"#" },
      ]},
      { sem:5, courses:[
        { name:"Strategic Management",       icon:"📋", topics:["Vision & Mission","SWOT Analysis","Porter's Five Forces","Competitive Advantage","Strategy Formulation","Implementation","Evaluation"], pdf:"#" },
        { name:"Operations Management",      icon:"🏭", topics:["Production Systems","Capacity Planning","Inventory Management","Quality Control","Supply Chain Basics","Lean Management","TQM"], pdf:"#" },
        { name:"Business Ethics & CSR",      icon:"⚖️", topics:["Ethical Theories","Corporate Governance","CSR Framework","Stakeholder Management","Environmental Ethics","Whistleblowing","Ethics in Pakistan"], pdf:"#" },
        { name:"Investment Analysis",        icon:"💰", topics:["Stock Markets","Bond Valuation","Portfolio Theory","Risk Management","Fundamental Analysis","Technical Analysis","Mutual Funds"], pdf:"#" },
        { name:"Elective I",                 icon:"📚", topics:["As per student choice — Banking / Retail / HR / International Business","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
      ]},
      { sem:6, courses:[
        { name:"International Business",     icon:"🌍", topics:["Globalisation","International Trade Theories","FDI","MNCs","Trade Agreements","WTO & CPEC","Cross-Cultural Management"], pdf:"#" },
        { name:"E-Commerce",                 icon:"🛒", topics:["E-Commerce Models","Online Retail","Payment Systems","Digital Marketing","Social Media Commerce","Mobile Commerce","Logistics"], pdf:"#" },
        { name:"Project Management",         icon:"📋", topics:["Project Life Cycle","Scope Management","Time Management","Cost Management","Risk Management","Stakeholders","PMP Framework"], pdf:"#" },
        { name:"Consumer Behaviour",         icon:"👥", topics:["Consumer Decision Process","Cultural Influences","Psychological Factors","Social Influences","Brand Loyalty","Online Behaviour","Market Research"], pdf:"#" },
        { name:"Elective II",                icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
      ]},
      { sem:7, courses:[
        { name:"Business Project – I",       icon:"🎓", topics:["Topic Selection","Proposal Writing","Data Collection","Analysis","Interim Report","Supervisor Review","Presentation"], pdf:"#" },
        { name:"Corporate Governance",       icon:"⚖️", topics:["Board of Directors","Audit Committees","Transparency","Accountability","SECP Regulations","Global Standards","Case Studies"], pdf:"#" },
        { name:"Supply Chain Management",    icon:"🏭", topics:["SCM Overview","Procurement","Logistics","Warehousing","Distribution","ERP Systems","CPEC & Trade Routes"], pdf:"#" },
        { name:"Elective III",               icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Internship",                 icon:"🏢", topics:["6–8 Week Industry Placement","Internship Report","Practical Experience","Professional Skills","Networking","Evaluation","Certificate"], pdf:"#" },
      ]},
      { sem:8, courses:[
        { name:"Business Project – II",      icon:"🎓", topics:["Full Research Implementation","Data Analysis","Findings","Recommendations","Final Report","Viva Defence","Degree Completion"], pdf:"#" },
        { name:"Professional Development",   icon:"📜", topics:["Career Planning","CV & Cover Letter","Interview Skills","LinkedIn Profile","Networking","Professional Certifications","Job Market Pakistan"], pdf:"#" },
        { name:"Elective IV",                icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Thesis & Viva",              icon:"🎓", topics:["Thesis Format","Referencing (APA)","Final Corrections","External Examiner","Viva Questions","Defence Tips","Degree Completion"], pdf:"#" },
      ]},
    ],
  },

  {
    id: "bs-polsci",
    label: "BS Political Science",
    icon: "🏛️",
    color: "#1e3a5f",
    light: "rgba(30,58,95,0.08)",
    border: "rgba(30,58,95,0.2)",
    type: "BS Degree",
    semesters: [
      { sem:1, courses:[
        { name:"Introduction to Political Science", icon:"🏛️", topics:["Nature & Scope","Key Concepts","State & Government","Political Ideologies","Democracy","Political Behaviour","Political Systems"], pdf:"#" },
        { name:"Pakistan Studies",                  icon:"🇵🇰", topics:["History","Geography","Economy","Constitution","Society","Foreign Policy","National Issues"], pdf:"#" },
        { name:"English Composition",               icon:"📝", topics:["Academic Writing","Essays","Research Skills","Grammar","Vocabulary","Presentations","Critical Thinking"], pdf:"#" },
        { name:"Islamic Studies",                   icon:"☪️", topics:["Quran","Hadith","Seerat","Ethics","Islamic Political Thought","History","Values"], pdf:"#" },
        { name:"History of Political Thought",      icon:"📜", topics:["Plato & Aristotle","Medieval Thought","Machiavelli","Hobbes","Locke","Rousseau","Montesquieu"], pdf:"#" },
      ]},
      { sem:2, courses:[
        { name:"Comparative Politics",              icon:"🏛️", topics:["Political Systems Comparison","Presidential vs Parliamentary","Federal vs Unitary","Electoral Systems","Political Parties","Interest Groups","Civil Society"], pdf:"#" },
        { name:"Constitutional Law of Pakistan",    icon:"⚖️", topics:["Constitution 1973","Fundamental Rights","Parliament","Judiciary","Executive","Federalism","Constitutional Amendments"], pdf:"#" },
        { name:"Sociology",                         icon:"👥", topics:["Society & Culture","Social Institutions","Social Change","Class & Stratification","Gender","Ethnicity","Globalisation"], pdf:"#" },
        { name:"Communication Skills",              icon:"📝", topics:["Spoken English","Debates","Public Speaking","Report Writing","Email Communication","Critical Reading","Media Literacy"], pdf:"#" },
        { name:"Government of Pakistan",            icon:"🏛️", topics:["Federal Govt Structure","Parliament","President & PM","Provincial Govts","Local Government","Judiciary","Bureaucracy"], pdf:"#" },
      ]},
      { sem:3, courses:[
        { name:"International Relations Theory",    icon:"🌍", topics:["Realism","Liberalism","Constructivism","Marxism","Feminism in IR","Post-Colonialism","Critical Theory"], pdf:"#" },
        { name:"Political Economy",                 icon:"📈", topics:["Political Economy Concepts","State & Market","Development Theory","Dependency Theory","Neo-Liberalism","Globalisation","Pakistan's Political Economy"], pdf:"#" },
        { name:"Research Methods",                  icon:"📋", topics:["Qualitative Research","Quantitative Research","Mixed Methods","Data Collection","Surveys","Case Studies","Academic Writing"], pdf:"#" },
        { name:"Local Government in Pakistan",      icon:"🏛️", topics:["Local Govt History","LG System Post-2001","Devolution Plan","Urban Governance","Rural Governance","LG in KPK","Issues & Reforms"], pdf:"#" },
        { name:"Public Administration",             icon:"📋", topics:["Public vs Private Admin","Bureaucracy","Administrative Reforms","Public Policy","Accountability","E-Government","NPM"], pdf:"#" },
      ]},
      { sem:4, courses:[
        { name:"Foreign Policy of Pakistan",        icon:"🌍", topics:["Foundations of Foreign Policy","Pakistan-USA Relations","Pakistan-China (CPEC)","Pakistan-India","Pakistan & Muslim World","UN Membership","Geo-Politics"], pdf:"#" },
        { name:"Political Sociology",               icon:"👥", topics:["Politics & Society","Social Movements","Political Culture","Civil Society","Media & Politics","Ethnicity & Nationalism","Religion & Politics"], pdf:"#" },
        { name:"Human Rights Law",                  icon:"⚖️", topics:["UDHR","Civil & Political Rights","Economic & Social Rights","International Human Rights Law","Human Rights in Pakistan","NGOs","Refugee Rights"], pdf:"#" },
        { name:"South Asian Politics",              icon:"🌏", topics:["SAARC","India-Pakistan Relations","Afghanistan","Bangladesh","Sri Lanka","Kashmir Issue","Regional Cooperation"], pdf:"#" },
        { name:"Ideology of Pakistan",              icon:"🇵🇰", topics:["Two-Nation Theory","Allama Iqbal's Vision","Quaid's Political Thought","Islamic Ideology","Objectives Resolution","National Identity","Contemporary Challenges"], pdf:"#" },
      ]},
      { sem:5, courses:[
        { name:"United Nations & World Politics",   icon:"🌍", topics:["UN Structure","Security Council","General Assembly","Specialised Agencies","UN Peacekeeping","Reforms","Pakistan & UN"], pdf:"#" },
        { name:"Political Parties & Elections",     icon:"🗳️", topics:["Party Systems","Major Parties of Pakistan","Electoral Process","ECP","Electoral Reforms","Voters Behaviour","Democratic Consolidation"], pdf:"#" },
        { name:"Gender & Politics",                 icon:"👥", topics:["Women in Politics","Feminist Political Theory","Gender & Development","Women Rights in Pakistan","Quota System","Global Trends","Case Studies"], pdf:"#" },
        { name:"Islamic Political Thought",         icon:"☪️", topics:["Islamic State Concept","Shura & Democracy","Khilafat","Al-Farabi","Ibn Khaldun","Al-Mawardi","Contemporary Islamic Political Movements"], pdf:"#" },
        { name:"Elective I",                        icon:"📚", topics:["As per student choice — War & Conflict / Environmental Politics / Terrorism / Media Law","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
      ]},
      { sem:6, courses:[
        { name:"Globalisation & Politics",          icon:"🌍", topics:["Globalisation Theories","Economic Globalisation","Cultural Globalisation","Political Globalisation","Anti-Globalisation","NGOs & INGOs","Future Trends"], pdf:"#" },
        { name:"Conflict Resolution",               icon:"☮️", topics:["Conflict Types","Causes of Conflict","Negotiation","Mediation","Arbitration","UN Role","Conflict in South Asia"], pdf:"#" },
        { name:"Development Studies",               icon:"📈", topics:["Development Theories","Human Development","MDGs & SDGs","Aid & Development","CPEC & Development","Gender & Development","Poverty in Pakistan"], pdf:"#" },
        { name:"Media & Politics",                  icon:"📺", topics:["Mass Media & Democracy","Press Freedom","Social Media & Politics","Propaganda","Media in Pakistan","Fake News","Regulation"], pdf:"#" },
        { name:"Elective II",                       icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
      ]},
      { sem:7, courses:[
        { name:"Research Project – I",              icon:"🎓", topics:["Topic Finalization","Proposal","Literature Review","Data Collection","Analysis","Interim Report","Presentation"], pdf:"#" },
        { name:"Contemporary Issues Pakistan",      icon:"🇵🇰", topics:["Terrorism & Extremism","Economic Crisis","Political Instability","Water Crisis","Education Crisis","Climate Change","Population"], pdf:"#" },
        { name:"Federalism & Devolution",           icon:"🏛️", topics:["18th Amendment","Provincial Autonomy","NFC Award","FATA Merger","Local Bodies","Centre-Province Relations","Challenges"], pdf:"#" },
        { name:"Elective III",                      icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"CSS / PMS Preparation",             icon:"📝", topics:["CSS Syllabus Overview","Essay Writing","Current Affairs","Pakistan Affairs","International Affairs","Precis","Exam Strategy"], pdf:"#" },
      ]},
      { sem:8, courses:[
        { name:"Research Project – II",             icon:"🎓", topics:["Final Research","Full Analysis","Findings","Recommendations","Final Report","Viva Preparation","Defence"], pdf:"#" },
        { name:"Diplomacy & Foreign Affairs",       icon:"🌍", topics:["Diplomacy Types","Diplomatic Protocol","Consular Functions","Pakistan's Diplomacy","Economic Diplomacy","Public Diplomacy","Career in Diplomacy"], pdf:"#" },
        { name:"Elective IV",                       icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Viva & Professional Development",   icon:"🎓", topics:["Thesis Submission","External Examiner","Viva Defence","CV Building","Career Paths","CSS/PMS Tips","Networking"], pdf:"#" },
      ]},
    ],
  },

  {
    id: "bs-english",
    label: "BS English",
    icon: "📚",
    color: "#b45309",
    light: "rgba(180,83,9,0.08)",
    border: "rgba(180,83,9,0.2)",
    type: "BS Degree",
    semesters: [
      { sem:1, courses:[
        { name:"Introduction to Literature",  icon:"📚", topics:["What is Literature?","Prose","Poetry","Drama","Fiction","Non-Fiction","Critical Reading"], pdf:"#" },
        { name:"English Grammar & Composition",icon:"📝", topics:["Parts of Speech","Sentence Structure","Tenses","Punctuation","Paragraph Writing","Essay Writing","Error Analysis"], pdf:"#" },
        { name:"Introduction to Linguistics", icon:"🗣️", topics:["Nature of Language","Language Levels","Phonetics","Morphology","Syntax","Semantics","Pragmatics Intro"], pdf:"#" },
        { name:"Islamic Studies",             icon:"☪️", topics:["Quran","Hadith","Seerat","Ethics","History","Fiqh","Values"], pdf:"#" },
        { name:"Pakistan Studies",            icon:"🇵🇰", topics:["History","Geography","Economy","Constitution","Society","Foreign Policy","National Issues"], pdf:"#" },
      ]},
      { sem:2, courses:[
        { name:"British Literature I (Medieval–17th C)", icon:"📚", topics:["Old English & Chaucer","The Canterbury Tales","Renaissance Literature","Marlowe & Shakespeare","Metaphysical Poetry","Donne & Milton","Restoration Drama"], pdf:"#" },
        { name:"Phonetics & Phonology",       icon:"🗣️", topics:["IPA Chart","Vowels & Consonants","Syllable Structure","Stress & Intonation","Connected Speech","Accents","Transcription Practice"], pdf:"#" },
        { name:"Academic Writing",            icon:"📝", topics:["Research Paper Structure","Thesis Statements","Argument Writing","APA & MLA Citation","Paraphrasing","Summarising","Plagiarism"], pdf:"#" },
        { name:"Communication Skills",        icon:"📝", topics:["Spoken English","Group Discussions","Presentations","Negotiation","Email Writing","Interview Techniques","Professional Communication"], pdf:"#" },
        { name:"Introduction to Poetry",      icon:"📚", topics:["Poetic Devices","Metre & Rhythm","Sonnet","Ode","Elegy","Imagery","Close Reading Poetry"], pdf:"#" },
      ]},
      { sem:3, courses:[
        { name:"British Literature II (18th–19th C)",icon:"📚", topics:["Augustan Age","Alexander Pope","The Novel Rise","Defoe & Swift","Romantic Poetry","Wordsworth & Keats","Victorian Literature"], pdf:"#" },
        { name:"Morphology & Syntax",         icon:"🗣️", topics:["Word Formation","Morphemes","Derivation & Inflection","Phrase Structure","Sentence Types","Transformational Grammar","Tree Diagrams"], pdf:"#" },
        { name:"Research Methods",            icon:"📋", topics:["Research Design","Qualitative Methods","Quantitative Methods","Literature Review","Data Collection","Textual Analysis","Academic Integrity"], pdf:"#" },
        { name:"Short Story & Prose",         icon:"📚", topics:["Short Story History","Chekhov & Hemingway","The Gothic","Magical Realism","Narrative Techniques","Close Reading Prose","Pakistani Short Stories"], pdf:"#" },
        { name:"World Literature",            icon:"🌍", topics:["Latin American Lit","African Literature","Middle Eastern Lit","South Asian Lit","Nobel Laureates","Postmodern Texts","Translation Issues"], pdf:"#" },
      ]},
      { sem:4, courses:[
        { name:"American Literature",         icon:"📚", topics:["Colonial Period","American Romanticism","Realism & Naturalism","Modernism","Harlem Renaissance","Postwar Literature","Contemporary American Lit"], pdf:"#" },
        { name:"Semantics & Pragmatics",      icon:"🗣️", topics:["Meaning Types","Sense & Reference","Semantic Fields","Speech Acts","Grice's Maxims","Implicature","Discourse Markers"], pdf:"#" },
        { name:"Literary Criticism & Theory", icon:"📚", topics:["Formalism","New Criticism","Structuralism","Post-Structuralism","Deconstruction","Feminist Criticism","Post-Colonial Theory"], pdf:"#" },
        { name:"Drama & Theatre",             icon:"🎭", topics:["Greek Drama","Shakespearean Drama","Restoration Comedy","Modern Drama","Absurdist Theatre","Pakistani Drama","Stagecraft"], pdf:"#" },
        { name:"Translation Studies",         icon:"🌍", topics:["Translation Theory","Types of Translation","Equivalence","Bible Translation","Literary Translation","Urdu↔English Translation","Subtitling"], pdf:"#" },
      ]},
      { sem:5, courses:[
        { name:"Post-Colonial Literature",    icon:"📚", topics:["Post-Colonial Theory","Chinua Achebe","V.S. Naipaul","Salman Rushdie","Arundhati Roy","Pakistani Lit in English","Decolonisation Discourse"], pdf:"#" },
        { name:"Discourse Analysis",          icon:"🗣️", topics:["Discourse & Text","Critical Discourse Analysis","Conversation Analysis","Institutional Discourse","Media Discourse","Ideology in Language","Pakistani Discourse"], pdf:"#" },
        { name:"Creative Writing",            icon:"✍️", topics:["Short Fiction Writing","Poetry Writing","Personal Essays","Scriptwriting","Flash Fiction","Editing & Revision","Publishing Basics"], pdf:"#" },
        { name:"Pakistani Lit in English",    icon:"📚", topics:["Bapsi Sidhwa","Mohsin Hamid","Mohammed Hanif","Daniyal Mueenuddin","Kamila Shamsie","Contemporary Voices","Pakistan Through Literature"], pdf:"#" },
        { name:"Elective I",                  icon:"📚", topics:["As per student choice — Journalism / Content Writing / TEFL / Comparative Lit / Film Studies","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
      ]},
      { sem:6, courses:[
        { name:"Contemporary Literature",     icon:"📚", topics:["21st Century Fiction","Cli-Fi (Climate Fiction)","Dystopian Lit","Graphic Novels","Digital Literature","Diaspora Writing","Global Trends"], pdf:"#" },
        { name:"Sociolinguistics",            icon:"🗣️", topics:["Language & Society","Language Variation","Diglossia","Language & Gender","Language & Power","Endangered Languages","Multilingualism in Pakistan"], pdf:"#" },
        { name:"Business & Technical Writing",icon:"📝", topics:["Business Reports","Technical Manuals","Proposals","Grant Writing","Web Content","SEO Writing","Corporate Communication"], pdf:"#" },
        { name:"Media & Communication",       icon:"📺", topics:["Print Media Writing","Broadcast Writing","Online Journalism","Social Media Content","Editing","Media Ethics","Career in Media Pakistan"], pdf:"#" },
        { name:"Elective II",                 icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
      ]},
      { sem:7, courses:[
        { name:"Research Project – I",        icon:"🎓", topics:["Topic Selection","Proposal","Literature Review","Methodology","Data Analysis","Interim Draft","Presentation"], pdf:"#" },
        { name:"Language Teaching Methodology",icon:"🗣️", topics:["ELT Approaches","CLT","Grammar Translation Method","Task-Based Learning","TESOL/TEFL","Lesson Planning","Assessment in ELT"], pdf:"#" },
        { name:"Elective III",                icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Comparative Literature",      icon:"📚", topics:["Comparative Method","Influence & Intertextuality","Theme Studies","Genre Comparison","National vs World Lit","Urdu-English Comparison","Translations"], pdf:"#" },
        { name:"ELT Practicum",               icon:"🗣️", topics:["Teaching Practice","Lesson Delivery","Classroom Management","Student Assessment","Feedback","Reflection Journal","Portfolio"], pdf:"#" },
      ]},
      { sem:8, courses:[
        { name:"Research Project – II",       icon:"🎓", topics:["Final Implementation","Complete Analysis","Findings","Recommendations","Final Report","Viva Preparation","Degree Completion"], pdf:"#" },
        { name:"Advanced Literary Theory",    icon:"📚", topics:["New Historicism","Ecocriticism","Cognitive Poetics","Digital Humanities","Affect Theory","Trauma Studies","Contemporary Debates"], pdf:"#" },
        { name:"Elective IV",                 icon:"📚", topics:["As per student choice","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"], pdf:"#" },
        { name:"Thesis & Viva",               icon:"🎓", topics:["Thesis Format","APA/MLA Referencing","Final Submission","External Evaluation","Viva Defence","Career Paths","Professional Development"], pdf:"#" },
      ]},
    ],
  },
];

// ─── COURSE CARD ──────────────────────────────────────────────────────────────
function CourseCard({ course, color, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background:"#fff", borderRadius:"14px",
      border:`1.5px solid ${open ? color : "#e9ecef"}`,
      boxShadow: open ? `0 8px 28px ${color}18` : "0 2px 10px rgba(0,0,0,0.05)",
      transition:"all 0.22s",
      animation:`fadeUp 0.4s ease ${idx*0.05}s both`,
      overflow:"hidden",
    }}>
      {/* Header */}
      <button onClick={()=>setOpen(o=>!o)} style={{
        width:"100%", padding:"18px 20px", background:"none", border:"none",
        cursor:"pointer", display:"flex", alignItems:"center", gap:"12px",
        textAlign:"left",
      }}>
        <div style={{
          width:"42px", height:"42px", borderRadius:"10px", flexShrink:0,
          background:`linear-gradient(135deg,${color},${color}99)`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px",
        }}>{course.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#103d25",fontWeight:600}}>{course.name}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",marginTop:"2px"}}>{course.topics.length} topics covered</div>
        </div>
        <svg width="12" height="8" viewBox="0 0 12 8" fill={color}
          style={{transform:open?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0}}>
          <path d="M0 0l6 8 6-8z"/>
        </svg>
      </button>

      {/* Topics */}
      {open && (
        <div style={{padding:"0 20px 18px",borderTop:`1px solid ${color}20`}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"14px",marginBottom:"14px"}}>
            {course.topics.map((t,i)=>(
              <span key={i} style={{
                background:`${color}0f`, border:`1px solid ${color}25`,
                color:color, padding:"4px 12px", borderRadius:"20px",
                fontFamily:"'DM Sans',sans-serif", fontSize:"12.5px", fontWeight:500,
              }}>{t}</span>
            ))}
          </div>
          <a href={course.pdf} download style={{
            display:"inline-flex", alignItems:"center", gap:"7px",
            background:color, color:"#fff", textDecoration:"none",
            padding:"9px 18px", borderRadius:"8px",
            fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:700,
            transition:"opacity 0.2s",
          }}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
          onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          onClick={e=>{e.preventDefault();alert(`PDF for "${course.name}" — add your PDF file path to course.pdf`)}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF Notes
          </a>
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Courses({ navigate }) {
  const [activeProg, setActiveProg] = useState("fsc-cs");
  const [activeYear, setActiveYear]   = useState(0);
  const [activeSem, setActiveSem]     = useState(0);
  const [search, setSearch]           = useState("");

  const prog = PROGRAMMES.find(p=>p.id===activeProg);
  const isBS = prog.type === "BS Degree";

  const filteredCourses = () => {
    if (isBS) {
      return prog.semesters[activeSem].courses.filter(c =>
        !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.topics.some(t=>t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return prog.years[activeYear].subjects.filter(c =>
      !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.topics.some(t=>t.toLowerCase().includes(search.toLowerCase()))
    );
  };

  return (
    <PageLayout navigate={navigate} icon="📖" title="Courses" breadcrumb="Courses">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .prog-btn:hover{border-color:var(--c) !important;background:var(--bg) !important;}
        .tab-btn:hover{background:rgba(16,61,37,0.06);}
        .search-input:focus{border-color:#103d25 !important;outline:none;}
      `}</style>

      {/* ── HEADER BANNER ── */}
      <div style={{background:"linear-gradient(135deg,#103d25 0%,#1a5c38 60%,#2a7a4e 100%)",borderRadius:"18px",padding:"40px 36px",marginBottom:"32px",position:"relative",overflow:"hidden",boxShadow:"0 12px 40px rgba(16,61,37,0.25)"}}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"200px",height:"200px",borderRadius:"50%",background:"rgba(201,168,76,0.1)",pointerEvents:"none"}}/>
        <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(201,168,76,0.2)",border:"1px solid #c9a84c",color:"#e8c97a",padding:"4px 14px",borderRadius:"20px",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:"14px"}}>📖 Course Library</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,3vw,28px)",color:"#fff",marginBottom:"10px"}}>All Programmes — Courses & Study Material</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"rgba(255,255,255,0.72)",maxWidth:"600px",lineHeight:1.7}}>Select your programme, choose your year or semester, and browse all subjects with topics. Download PDF notes for each subject.</p>
      </div>

      {/* ── PROGRAMME SELECTOR ── */}
      <div style={{marginBottom:"24px"}}>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#9ca3af",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"12px"}}>Select Programme</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
          {PROGRAMMES.map(p=>(
            <button key={p.id} onClick={()=>{setActiveProg(p.id);setActiveYear(0);setActiveSem(0);setSearch("");}}
              style={{
                background: activeProg===p.id ? p.color : "#fff",
                color: activeProg===p.id ? "#fff" : "#374151",
                border:`2px solid ${activeProg===p.id ? p.color : "#e5e7eb"}`,
                borderRadius:"10px", padding:"9px 16px", cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", fontSize:"13.5px", fontWeight:activeProg===p.id?700:500,
                display:"flex", alignItems:"center", gap:"7px",
                transition:"all 0.2s",
                boxShadow: activeProg===p.id?`0 4px 14px ${p.color}35`:"none",
              }}>
              <span>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── YEAR / SEM TABS ── */}
      <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #e9ecef",padding:"16px 20px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          {isBS
            ? prog.semesters.map((s,i)=>(
              <button key={i} className="tab-btn" onClick={()=>setActiveSem(i)} style={{
                padding:"7px 14px", borderRadius:"8px", border:"none", cursor:"pointer",
                background: activeSem===i ? prog.color : "transparent",
                color: activeSem===i ? "#fff" : "#6b7280",
                fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:activeSem===i?700:400,
                transition:"all 0.18s",
              }}>Sem {s.sem}</button>
            ))
            : prog.years.map((y,i)=>(
              <button key={i} className="tab-btn" onClick={()=>setActiveYear(i)} style={{
                padding:"7px 18px", borderRadius:"8px", border:"none", cursor:"pointer",
                background: activeYear===i ? prog.color : "transparent",
                color: activeYear===i ? "#fff" : "#6b7280",
                fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:activeYear===i?700:400,
                transition:"all 0.18s",
              }}>{y.label}</button>
            ))
          }
        </div>

        {/* Search */}
        <input className="search-input" value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="🔍 Search subjects or topics..."
          style={{
            padding:"8px 14px", border:"1.5px solid #e5e7eb", borderRadius:"8px",
            fontFamily:"'DM Sans',sans-serif", fontSize:"13.5px", background:"#fafafa",
            minWidth:"220px", transition:"border-color 0.2s",
          }}/>
      </div>

      {/* ── CURRENT LABEL ── */}
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"18px"}}>
        <span style={{fontSize:"20px"}}>{prog.icon}</span>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#103d25"}}>
          {prog.label} — {isBS ? `Semester ${prog.semesters[activeSem].sem}` : prog.years[activeYear].label}
        </h3>
        <span style={{background:`${prog.color}12`,color:prog.color,border:`1px solid ${prog.color}30`,padding:"3px 10px",borderRadius:"12px",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:600}}>
          {filteredCourses().length} subjects
        </span>
      </div>

      {/* ── COURSE CARDS ── */}
      {filteredCourses().length === 0
        ? <div style={{background:"#fff",borderRadius:"14px",border:"2px dashed #e5e7eb",padding:"60px",textAlign:"center"}}>
            <div style={{fontSize:"48px",marginBottom:"12px"}}>🔍</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"#9ca3af"}}>No subjects match your search. Try a different keyword.</p>
          </div>
        : <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            {filteredCourses().map((c,i)=>(
              <CourseCard key={i} course={c} color={prog.color} idx={i}/>
            ))}
          </div>
      }

      {/* ── BOTTOM NOTE ── */}
      <div style={{marginTop:"36px",background:"linear-gradient(135deg,#faf3e0,#fff8e8)",border:"1.5px solid #e8c97a",borderRadius:"14px",padding:"22px 28px",display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
        <span style={{fontSize:"24px"}}>💡</span>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",color:"#103d25",marginBottom:"4px"}}>PDF Notes</div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#6b7280"}}>To enable PDF downloads, add your actual PDF file paths to each course's <code style={{background:"#f3f4f6",padding:"1px 6px",borderRadius:"4px",fontSize:"12px"}}>pdf: "#"</code> property in Courses.jsx. You can upload files to <code style={{background:"#f3f4f6",padding:"1px 6px",borderRadius:"4px",fontSize:"12px"}}>src/assets/pdfs/</code></p>
        </div>
      </div>
    </PageLayout>
  );
}