import { useAuth } from "../context/AuthContext";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import { useEffect } from "react"; // 1. useEffect import karein

export default function Dashboard({ navigate }) {
  const { profile, loading } = useAuth();

  // 2. Agar load ho chuka hai aur user login nahi hai, to Auth page par bhej dein
  useEffect(() => {
    if (!loading && !profile) {
      navigate("auth"); 
    }
  }, [profile, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  // 3. Agar profile nahi hai, to filhal hum message dikha rahe hain (redirect upar ho jayega)
  if (!profile) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Redirecting to login...
      </div>
    );
  }

  if (profile.role === "teacher") return <TeacherDashboard navigate={navigate} />;
  if (profile.role === "student") return <StudentDashboard navigate={navigate} />;

  return <div>Access Denied</div>;
}