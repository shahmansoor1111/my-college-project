import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Vision from "./pages/about/Vision";
import Mission from "./pages/about/Mission";
import History from "./pages/about/History";
import FscCS from "./pages/academics/FscCS";
import PreMedical from "./pages/academics/PreMedical";
import Arts from "./pages/academics/Arts";
import BsCS from "./pages/academics/BsCS";
import BBA from "./pages/academics/BBA";
import BsPolSci from "./pages/academics/BsPolSci";
import BsEnglish from "./pages/academics/BsEnglish";
import Courses from "./pages/Courses";
import Assessments from "./pages/Assessments";
import AIHelper from "./pages/AIHelper";
import AIAssessment from "./pages/AIAssessment";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

const PAGES = {
  home: Home,
  vision: Vision,
  mission: Mission,
  history: History,
  "fsc-cs": FscCS,
  "pre-medical": PreMedical,
  arts: Arts,
  "bs-cs": BsCS,
  bba: BBA,
  "bs-polsci": BsPolSci,
  "bs-english": BsEnglish,
  courses: Courses,
  assessments: Assessments,
  "ai-helper": AIHelper,
  "ai-assessment": AIAssessment,
  gallery: Gallery,
  contact: Contact,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const PageComponent = PAGES[currentPage] || Home;

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main style={{ paddingTop: "72px" }}>
        <PageComponent navigate={navigate} />
      </main>
    </div>
  );
}