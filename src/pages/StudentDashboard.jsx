import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { supabase } from "../library/supabase";

export default function StudentDashboard({ navigate }) {
  const { student, logoutStudent } = useSession();
  const [available,     setAvailable]     = useState([]);
  const [completed,     setCompleted]     = useState([]);
  const [locked,        setLocked]        = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    if (!student) return;
    fetchData();
    fetchNotifications();

    const channel = supabase
      .channel("student-notifs")
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "notifications",
      }, () => { fetchNotifications(); fetchData(); })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [student]);

  async function fetchNotifications() {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("student_id", student.id)
      .order("created_at", { ascending: false })
      .limit(10);
    if (data) setNotifications(data);
  }

  async function markAllRead() {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("student_id", student.id)
      .eq("is_read", false);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  }

  async function fetchData() {
    setLoading(true);
    const { data: quizzes } = await supabase
      .from("quizzes")
      .select("*, questions(id), submissions(student_id, score, total_marks, submitted_at)")
      .eq("is_published", true);

    if (quizzes) {
      const myDept = student.department;
      const mySem  = student.semester;
      const done = [], avail = [], lock = [];

      quizzes.forEach(q => {
        const sub = q.submissions?.find(s => s.student_id === student.id);
        const matches =
          (!q.target_department || q.target_department === myDept) &&
          (!q.target_semester   || q.target_semester   === mySem);

        if (sub)          done.push({ ...q, mySubmission: sub });
        else if (matches) avail.push(q);
        else              lock.push(q);
      });

      setCompleted(done);
      setAvailable(avail);
      setLocked(lock);
    }
    setLoading(false);
  }

  function handleSignOut() {
    logoutStudent();
    navigate("home");
  }

  if (!student) { navigate("student-onboarding"); return null; }

  const unread = notifications.filter(n => !n.is_read).length;

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", color: "#103d25", marginBottom: "4px" }}>
              Student Dashboard
            </h1>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              Welcome, <strong>{student.full_name}</strong> · {student.department} · Semester {student.semester} · #{student.enrollment_number}
            </p>
          </div>
          <button onClick={handleSignOut} style={signOutBtn}>
            🚪 Sign Out
          </button>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h2 style={sectionHead}>
                🔔 Notifications {unread > 0 && <span style={badge}>{unread} new</span>}
              </h2>
              {unread > 0 && (
                <button onClick={markAllRead} style={smallBtn}>Mark all read</button>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {notifications.map(n => (
                <div key={n.id} style={{
                  background: n.is_read ? "#f9fafb" : "#f0f7f3",
                  border: `1px solid ${n.is_read ? "#f0f0f0" : "#86efac"}`,
                  borderRadius: "10px", padding: "12px 16px",
                  display: "flex", gap: "10px", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "18px" }}>📝</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "13.5px", color: "#1a1a1a" }}>{n.title}</div>
                    <div style={{ fontSize: "12.5px", color: "#6b7280", marginTop: "2px" }}>{n.message}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                      {new Date(n.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Quizzes */}
        <h2 style={{ ...sectionHead, marginBottom: "12px" }}>
          📝 Available Quizzes ({available.length})
        </h2>
        {loading ? (
          <div style={emptyBox}>Loading quizzes...</div>
        ) : available.length === 0 ? (
          <div style={emptyBox}>No quizzes assigned to you right now.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
            {available.map(quiz => (
              <div key={quiz.id} style={quizCard}>
                <div>
                  <div style={quizTitle}>{quiz.title}</div>
                  <div style={quizMeta}>
                    By: <strong>{quiz.teacher_name}</strong> ·{" "}
                    {quiz.questions?.length || 0} questions ·{" "}
                    For: <strong>{quiz.target_department}</strong> · Semester <strong>{quiz.target_semester}</strong>
                  </div>
                  {quiz.description && <div style={quizDesc}>{quiz.description}</div>}
                </div>
                <button onClick={() => navigate(`student-quiz-attempt/${quiz.id}`)} style={primaryBtn}>
                  Take Quiz →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Locked Quizzes */}
        {locked.length > 0 && (
          <>
            <h2 style={{ ...sectionHead, marginBottom: "12px" }}>
              🔒 Locked Quizzes (not for your class)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              {locked.map(quiz => (
                <div key={quiz.id} style={{ ...quizCard, opacity: 0.7, background: "#f3f4f6" }}>
                  <div>
                    <div style={{ ...quizTitle, color: "#6b7280" }}>🔒 {quiz.title}</div>
                    <div style={{ fontSize: "12.5px", color: "#dc2626", fontWeight: 600, marginTop: "4px" }}>
                      This quiz is not for you. It is for {quiz.target_department} Semester {quiz.target_semester}.
                    </div>
                    <div style={quizMeta}>
                      Your class: {student.department} · Semester {student.semester}
                    </div>
                  </div>
                  <button disabled style={{ ...primaryBtn, background: "#9ca3af", cursor: "not-allowed" }}>
                    Locked
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Completed */}
        <h2 style={{ ...sectionHead, marginBottom: "12px" }}>
          ✅ Completed Quizzes ({completed.length})
        </h2>
        {completed.length === 0 ? (
          <div style={emptyBox}>No completed quizzes yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {completed.map(quiz => (
              <div key={quiz.id} style={quizCard}>
                <div>
                  <div style={quizTitle}>{quiz.title}</div>
                  <div style={quizMeta}>
                    Score:{" "}
                    <strong style={{ color: "#103d25" }}>
                      {quiz.mySubmission.score} / {quiz.mySubmission.total_marks}
                    </strong>{" "}
                    · {quiz.mySubmission.total_marks
                      ? Math.round((quiz.mySubmission.score / quiz.mySubmission.total_marks) * 100)
                      : 0}%
                  </div>
                </div>
                <button
                  onClick={() => navigate(`student-quiz-results/${quiz.id}`)}
                  style={{ ...primaryBtn, background: "#c9a84c", color: "#103d25" }}
                >
                  View Results
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const pageWrap   = { minHeight: "100vh", background: "#faf7f0", paddingTop: "100px", paddingBottom: "60px", fontFamily: "'DM Sans', sans-serif" };
const sectionHead = { fontSize: "17px", color: "#103d25", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" };
const badge      = { background: "#103d25", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" };
const emptyBox   = { background: "#fff", borderRadius: "10px", padding: "20px", border: "1px solid #eee", color: "#9ca3af", fontSize: "14px", marginBottom: "16px" };
const quizCard   = { background: "#fff", borderRadius: "10px", padding: "16px 20px", border: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" };
const quizTitle  = { fontWeight: 700, color: "#1a1a1a", fontSize: "15px" };
const quizMeta   = { fontSize: "12.5px", color: "#9ca3af", marginTop: "4px" };
const quizDesc   = { fontSize: "13px", color: "#6b7280", marginTop: "4px" };
const primaryBtn = { background: "#103d25", color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" };
const signOutBtn = { background: "#fff", color: "#dc2626", border: "1px solid #dc2626", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };
const smallBtn   = { background: "none", border: "1px solid #103d25", color: "#103d25", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };