import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { SessionProvider, useSession } from "./context/SessionContext";
import { CommunityProvider } from "./context/CommunityContext";
import { CommunityIdentityProvider } from "./context/CommunityIdentity";
import { CommunityCountProvider } from "./context/CommunityCount";
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
import Community            from "./pages/Community";
import CommunityPostDetail  from "./pages/CommunityPostDetail";
import CreatePost           from "./pages/CreatePost";
// LMS pages
import TeacherDashboard  from "./pages/TeacherDashboard";
import StudentDashboard  from "./pages/StudentDashboard";
import TeacherOnboarding from "./pages/TeacherOnboarding";
import StudentOnboarding from "./pages/StudentOnboarding";
import QuestionEditor    from "./components/teacher/QuestionEditor";
import SubmissionsTable  from "./components/teacher/SubmissionsTable";
import QuizAttempt       from "./components/student/QuizAttempt";
import ResultsView       from "./components/student/ResultsView";

// ---------------------------------------------------------------------------
// Compatibility layer: maps your OLD page-key strings (the ones every page/
// Navbar call already uses, e.g. navigate("teacher-quiz-edit/123")) to REAL
// URL paths, and back again. This is what lets refresh persist the page
// without having to rewrite every component that calls navigate().
// ---------------------------------------------------------------------------
const ROUTE_PATHS = {
  home: "/",
  vision: "/vision",
  mission: "/mission",
  history: "/history",
  "fsc-cs": "/fsc-cs",
  "pre-medical": "/pre-medical",
  arts: "/arts",
  "bs-cs": "/bs-cs",
  bba: "/bba",
  "bs-polsci": "/bs-polsci",
  "bs-english": "/bs-english",
  courses: "/courses",
  assessments: "/assessments",
  "ai-helper": "/ai-helper",
  "ai-assessment": "/ai-assessment",
  gallery: "/gallery",
  contact: "/contact",
  auth: "/auth",
  community: "/community",
  "create-post": "/create-post",
  "teacher-onboarding": "/teacher-onboarding",
  "student-onboarding": "/student-onboarding",
  "teacher-dashboard": "/teacher-dashboard",
  "student-dashboard": "/student-dashboard",
  "teacher-quiz-edit": "/teacher/quiz/:id/edit",
  "teacher-quiz-submissions": "/teacher/quiz/:id/submissions",
  "student-quiz-attempt": "/student/quiz/:id/attempt",
  "student-quiz-results": "/student/quiz/:id/results",
  "community-post": "/community-post/:id",
};

function pageKeyToPath(page) {
  const [route, param] = page.split("/");
  let path = ROUTE_PATHS[route] || "/";
  if (param) path = path.replace(":id", param);
  return path;
}

function pathToPageKey(pathname) {
  for (const [key, path] of Object.entries(ROUTE_PATHS)) {
    if (path.includes(":id")) {
      const re = new RegExp("^" + path.replace(":id", "([^/]+)") + "$");
      const match = pathname.match(re);
      if (match) return `${key}/${match[1]}`;
    } else if (path === pathname) {
      return key;
    }
  }
  return "home";
}

// ---------------------------------------------------------------------------
// Auth guards — replace the old ternary checks. If `sessionLoading` isn't
// exposed by your SessionContext yet, add it (default true, false once your
// session/token check resolves) or these will redirect before the session
// has a chance to load on refresh.
// ---------------------------------------------------------------------------
function RequireTeacher({ children }) {
  const { teacher, sessionLoading } = useSession();
  if (sessionLoading) return <LoadingSpinner />;
  return teacher ? children : <Navigate to="/teacher-onboarding" replace />;
}

function RequireStudent({ children }) {
  const { student, sessionLoading } = useSession();
  if (sessionLoading) return <LoadingSpinner />;
  return student ? children : <Navigate to="/student-onboarding" replace />;
}

// Tiny wrappers so params come through as the same `quizId` prop your
// existing components already expect — no changes needed in those files.
function QuestionEditorRoute({ navigate }) {
  const { id } = useParams();
  return <QuestionEditor quizId={id} navigate={navigate} />;
}
function SubmissionsTableRoute({ navigate }) {
  const { id } = useParams();
  return <SubmissionsTable quizId={id} navigate={navigate} />;
}
function QuizAttemptRoute({ navigate }) {
  const { id } = useParams();
  return <QuizAttempt quizId={id} navigate={navigate} />;
}
function ResultsViewRoute({ navigate }) {
  const { id } = useParams();
  return <ResultsView quizId={id} navigate={navigate} />;
}
function CommunityPostDetailRoute({ navigate }) {
  const { id } = useParams();
  return <CommunityPostDetail quizId={id} navigate={navigate} />;
}

function AppContent() {
  const rrNavigate = useNavigate();
  const location = useLocation();
  const { teacher, student } = useSession();

  // Same external API as before: navigate("some-key") or navigate("some-key/123")
  const navigate = (page) => {
    rrNavigate(pageKeyToPath(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Same string Navbar was already using to highlight the active link
  const currentPage = pathToPageKey(location.pathname);

  function goToDashboard(role) {
    if (role === "teacher") {
      navigate(teacher ? "teacher-dashboard" : "teacher-onboarding");
    } else {
      navigate(student ? "student-dashboard" : "student-onboarding");
    }
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar currentPage={currentPage} navigate={navigate} goToDashboard={goToDashboard} />
      <main>
        <Routes>
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="/vision" element={<Vision navigate={navigate} />} />
          <Route path="/mission" element={<Mission navigate={navigate} />} />
          <Route path="/history" element={<History navigate={navigate} />} />
          <Route path="/fsc-cs" element={<FscCS navigate={navigate} />} />
          <Route path="/pre-medical" element={<PreMedical navigate={navigate} />} />
          <Route path="/arts" element={<Arts navigate={navigate} />} />
          <Route path="/bs-cs" element={<BsCS navigate={navigate} />} />
          <Route path="/bba" element={<BBA navigate={navigate} />} />
          <Route path="/bs-polsci" element={<BsPolSci navigate={navigate} />} />
          <Route path="/bs-english" element={<BsEnglish navigate={navigate} />} />
          <Route path="/courses" element={<Courses navigate={navigate} />} />
          <Route path="/assessments" element={<Assessments navigate={navigate} />} />
          <Route path="/ai-helper" element={<AIHelper navigate={navigate} />} />
          <Route path="/ai-assessment" element={<AIAssessment navigate={navigate} />} />
          <Route path="/gallery" element={<Gallery navigate={navigate} />} />
          <Route path="/contact" element={<Contact navigate={navigate} />} />
          <Route path="/auth" element={<Auth navigate={navigate} />} />
          <Route path="/community" element={<Community navigate={navigate} />} />
          <Route path="/create-post" element={<CreatePost navigate={navigate} />} />
          <Route
            path="/community-post/:id"
            element={<CommunityPostDetailRoute navigate={navigate} />}
          />

          <Route path="/teacher-onboarding" element={<TeacherOnboarding navigate={navigate} />} />
          <Route path="/student-onboarding" element={<StudentOnboarding navigate={navigate} />} />

          <Route
            path="/teacher-dashboard"
            element={
              <RequireTeacher>
                <TeacherDashboard navigate={navigate} />
              </RequireTeacher>
            }
          />
          <Route
            path="/teacher/quiz/:id/edit"
            element={
              <RequireTeacher>
                <QuestionEditorRoute navigate={navigate} />
              </RequireTeacher>
            }
          />
          <Route
            path="/teacher/quiz/:id/submissions"
            element={
              <RequireTeacher>
                <SubmissionsTableRoute navigate={navigate} />
              </RequireTeacher>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <RequireStudent>
                <StudentDashboard navigate={navigate} />
              </RequireStudent>
            }
          />
          <Route
            path="/student/quiz/:id/attempt"
            element={
              <RequireStudent>
                <QuizAttemptRoute navigate={navigate} />
              </RequireStudent>
            }
          />
          <Route
            path="/student/quiz/:id/results"
            element={
              <RequireStudent>
                <ResultsViewRoute navigate={navigate} />
              </RequireStudent>
            }
          />

          {/* Unknown URL -> home, instead of crashing */}
          <Route path="*" element={<Home navigate={navigate} />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <CommunityCountProvider>
          <CommunityIdentityProvider>
            <CommunityProvider>
              <AppContent />
            </CommunityProvider>
          </CommunityIdentityProvider>
        </CommunityCountProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}