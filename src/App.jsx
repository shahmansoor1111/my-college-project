import { useState } from "react";
import { SessionProvider, useSession } from "./context/SessionContext";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/shared/LoadingSpinner";

// Static pages
import Home         from "./pages/Home";
import Vision       from "./pages/about/Vision";
import Mission      from "./pages/about/Mission";
import History      from "./pages/about/History";
import FscCS        from "./pages/academics/FscCS";
import PreMedical   from "./pages/academics/PreMedical";
import Arts         from "./pages/academics/Arts";
import BsCS         from "./pages/academics/BsCS";
import BBA          from "./pages/academics/BBA";
import BsPolSci     from "./pages/academics/BsPolSci";
import BsEnglish    from "./pages/academics/BsEnglish";
import Courses      from "./pages/Courses";
import Assessments  from "./pages/Assessments";
import AIHelper     from "./pages/AIHelper";
import AIAssessment from "./pages/AIAssessment";
import Gallery      from "./pages/Gallery";
import Contact      from "./pages/Contact";
import Auth         from "./pages/Auth";

// LMS pages
import TeacherDashboard  from "./pages/TeacherDashboard";
import StudentDashboard  from "./pages/StudentDashboard";
import TeacherOnboarding from "./pages/TeacherOnboarding";
import StudentOnboarding from "./pages/StudentOnboarding";
import QuestionEditor    from "./components/teacher/QuestionEditor";
import SubmissionsTable  from "./components/teacher/SubmissionsTable";
import QuizAttempt       from "./components/student/QuizAttempt";
import ResultsView       from "./components/student/ResultsView";

const STATIC_PAGES = {
  home: Home, vision: Vision, mission: Mission, history: History,
  "fsc-cs": FscCS, "pre-medical": PreMedical, arts: Arts,
  "bs-cs": BsCS, bba: BBA, "bs-polsci": BsPolSci, "bs-english": BsEnglish,
  courses: Courses, assessments: Assessments,
  "ai-helper": AIHelper, "ai-assessment": AIAssessment,
  gallery: Gallery, contact: Contact, auth: Auth,
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const { teacher, student } = useSession();

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [route, param] = currentPage.split("/");

  // Navbar calls this
  function goToDashboard(role) {
    if (role === "teacher") {
      navigate(teacher ? "teacher-dashboard" : "teacher-onboarding");
    } else {
      navigate(student ? "student-dashboard" : "student-onboarding");
    }
  }

  function renderPage() {
    switch (route) {

      case "teacher-onboarding":
        return <TeacherOnboarding navigate={navigate} />;

      case "student-onboarding":
        return <StudentOnboarding navigate={navigate} />;

      case "teacher-dashboard":
        return teacher
          ? <TeacherDashboard navigate={navigate} />
          : <TeacherOnboarding navigate={navigate} />;

      case "teacher-quiz-edit":
        return teacher
          ? <QuestionEditor quizId={param} navigate={navigate} />
          : <TeacherOnboarding navigate={navigate} />;

      case "teacher-quiz-submissions":
        return teacher
          ? <SubmissionsTable quizId={param} navigate={navigate} />
          : <TeacherOnboarding navigate={navigate} />;

      case "student-dashboard":
        return student
          ? <StudentDashboard navigate={navigate} />
          : <StudentOnboarding navigate={navigate} />;

      case "student-quiz-attempt":
        return student
          ? <QuizAttempt quizId={param} navigate={navigate} />
          : <StudentOnboarding navigate={navigate} />;

      case "student-quiz-results":
        return student
          ? <ResultsView quizId={param} navigate={navigate} />
          : <StudentOnboarding navigate={navigate} />;

      default: {
        const PageComponent = STATIC_PAGES[route] || Home;
        return <PageComponent navigate={navigate} />;
      }
    }
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar currentPage={currentPage} navigate={navigate} goToDashboard={goToDashboard} />
      <main style={{ paddingTop: "72px" }}>
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}