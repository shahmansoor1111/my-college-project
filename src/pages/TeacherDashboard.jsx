import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { supabase } from "../library/supabase";

const DEPARTMENTS = [
  "FSc Computer Science", "Pre-Medical", "Arts (FA)",
  "BS Computer Science", "BS English", "BS Political Science", "BBA",
];
const SEMESTERS = ["1","2","3","4","5","6","7","8"];

export default function TeacherDashboard({ navigate }) {
  const { teacher, logoutTeacher } = useSession();
  const [quizzes,    setQuizzes]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [title,      setTitle]      = useState("");
  const [desc,       setDesc]       = useState("");
  const [targetDept, setTargetDept] = useState(teacher?.department || "");
  const [targetSem,  setTargetSem]  = useState(teacher?.semester  || "");
  const [creating,   setCreating]   = useState(false);
  const [formError,  setFormError]  = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!teacher) return;
    fetchQuizzes();
    fetchNotifications();

    const channel = supabase
      .channel("teacher-notifs")
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "notifications",
      }, fetchNotifications)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [teacher]);

  async function fetchQuizzes() {
    setLoading(true);
    const { data } = await supabase
      .from("quizzes")
      .select("*, questions(id), submissions(id, student_name, enrollment_number, score, total_marks, submitted_at)")
      .eq("teacher_id", teacher.id)
      .order("created_at", { ascending: false });
    if (data) setQuizzes(data);
    setLoading(false);
  }

  async function fetchNotifications() {
    // Teacher sees submission notifications for their quizzes
    const { data: quizIds } = await supabase
      .from("quizzes")
      .select("id")
      .eq("teacher_id", teacher.id);

    if (!quizIds || quizIds.length === 0) return;

    const ids = quizIds.map(q => q.id);
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .in("related_quiz_id", ids)
      .eq("type", "quiz_submitted")
      .order("created_at", { ascending: false })
      .limit(20);

    if (data) setNotifications(data);
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();
    setFormError(null);
    if (!title.trim()) { setFormError("Please enter a quiz title."); return; }
    if (!targetDept)   { setFormError("Please select target department."); return; }
    if (!targetSem)    { setFormError("Please select target semester."); return; }

    setCreating(true);
    const { data, error } = await supabase
      .from("quizzes")
      .insert({
        teacher_id:        teacher.id,
        teacher_name:      teacher.name,
        title:             title.trim(),
        description:       desc.trim(),
        target_department: targetDept,
        target_semester:   targetSem,
      })
      .select()
      .single();

    setCreating(false);
    if (error) { setFormError(error.message); return; }

    setTitle(""); setDesc("");
    navigate(`teacher-quiz-edit/${data.id}`);
  }

  async function togglePublish(quiz) {
    const nowPublished = !quiz.is_published;
    const { error } = await supabase
      .from("quizzes")
      .update({ is_published: nowPublished })
      .eq("id", quiz.id);

    if (error) { alert(error.message); return; }

    setQuizzes(prev =>
      prev.map(q => q.id === quiz.id ? { ...q, is_published: nowPublished } : q)
    );

    // When publishing, notify all matching students
    if (nowPublished) {
      const { data: students } = await supabase
        .from("students")
        .select("id, full_name")
        .eq("department", quiz.target_department)
        .eq("semester",   quiz.target_semester);

      if (students?.length > 0) {
        const notifs = students.map(s => ({
          student_id:      s.id,
          title:           "📝 New Quiz Assigned!",
          message:         `"${quiz.title}" has been assigned by ${teacher.name} for ${quiz.target_department} Semester ${quiz.target_semester}.`,
          type:            "quiz_assigned",
          related_quiz_id: quiz.id,
        }));
        await supabase.from("notifications").insert(notifs);
      }
    }
  }

  async function deleteQuiz(quizId) {
    if (!confirm("Delete this quiz and all its data?")) return;
    await supabase.from("quizzes").delete().eq("id", quizId);
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
  }

  function handleSignOut() {
    logoutTeacher();
    navigate("home");
  }

  if (!teacher) { navigate("teacher-onboarding"); return null; }

  const unreadNotifs = notifications.filter(n => !n.is_read).length;

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", color: "#103d25", marginBottom: "4px" }}>
              Teacher Dashboard
            </h1>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              Welcome, <strong>{teacher.name}</strong> · {teacher.department} · Semester {teacher.semester}
            </p>
          </div>
          <button onClick={handleSignOut} style={signOutBtn}>
            🚪 Sign Out
          </button>
        </div>

        {/* Submission Notifications */}
        {notifications.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={sectionHead}>
              🔔 Student Submissions {unreadNotifs > 0 && <span style={badge}>{unreadNotifs} new</span>}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              {notifications.map(n => (
                <div key={n.id} style={notifCard}>
                  <span style={{ fontSize: "18px" }}>📬</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "13.5px" }}>{n.title}</div>
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

        {/* Create Quiz Form */}
        <div style={formCard}>
          <h2 style={{ fontSize: "17px", color: "#103d25", marginBottom: "16px", fontWeight: 700 }}>
            ➕ Create New Quiz
          </h2>
          <form onSubmit={handleCreateQuiz} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Quiz Title</label>
              <input style={inputStyle} type="text" placeholder="e.g. Chapter 3 — Data Structures"
                value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Target Department</label>
                <select style={inputStyle} value={targetDept} onChange={e => setTargetDept(e.target.value)}>
                  <option value="">-- Select Department --</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Target Semester</label>
                <select style={inputStyle} value={targetSem} onChange={e => setTargetSem(e.target.value)}>
                  <option value="">-- Select Semester --</option>
                  {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description (optional)</label>
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={2}
                placeholder="Instructions for students..."
                value={desc} onChange={e => setDesc(e.target.value)} />
            </div>

            {formError && <div style={errorBox}>{formError}</div>}

            <button type="submit" disabled={creating} style={primaryBtn}>
              {creating ? "Creating..." : "Create Quiz & Add Questions →"}
            </button>
          </form>
        </div>

        {/* Quiz List */}
        <h2 style={{ ...sectionHead, marginBottom: "12px" }}>
          📋 Your Quizzes ({quizzes.length})
        </h2>

        {loading ? (
          <div style={emptyBox}>Loading quizzes...</div>
        ) : quizzes.length === 0 ? (
          <div style={emptyBox}>No quizzes yet. Create one above.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {quizzes.map(quiz => (
              <div key={quiz.id} style={quizCard}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#1a1a1a", fontSize: "15px" }}>
                    {quiz.title}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#9ca3af", marginTop: "4px" }}>
                    🎯 {quiz.target_department} · Semester {quiz.target_semester} ·{" "}
                    {quiz.questions?.length || 0} questions · {quiz.submissions?.length || 0} submissions ·{" "}
                    <span style={{ color: quiz.is_published ? "#16a34a" : "#d97706", fontWeight: 600 }}>
                      {quiz.is_published ? "✅ Published" : "📝 Draft"}
                    </span>
                  </div>
                  {quiz.description && (
                    <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>{quiz.description}</div>
                  )}

                
                {/* Submissions table */}
{quiz.submissions?.length > 0 && (
  <div style={{ marginTop: "14px" }}>
    <div style={{ fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>
      📊 Submissions ({quiz.submissions.length})
    </div>
    <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #eee" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ background: "#103d25" }}>
            <th style={thStyle}>Student Name</th>
            <th style={thStyle}>Enrollment no</th>
            <th style={thStyle}>Department</th>
            <th style={thStyle}>Semester</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {quiz.submissions.map((sub, i) => {
            const pct = sub.total_marks ? Math.round((sub.score / sub.total_marks) * 100) : 0;
            return (
              <tr key={sub.id || i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 600, color: "#1a1a1a" }}>👤 {sub.student_name}</span>
                </td>
                <td style={tdStyle}>{sub.enrollment_number}</td>
                <td style={tdStyle}>{quiz.target_department}</td>
                <td style={tdStyle}>Semester {quiz.target_semester}</td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <span style={{
                    background: pct >= 50 ? "#dcfce7" : "#fef2f2",
                    color:      pct >= 50 ? "#16a34a" : "#dc2626",
                    fontWeight: 700, padding: "3px 10px", borderRadius: "20px", fontSize: "12px",
                  }}>
                    {sub.score}/{sub.total_marks} · {pct}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)}
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "flex-start" }}>
                  <button onClick={() => navigate(`teacher-quiz-edit/${quiz.id}`)} style={btn("#103d25", "#fff")}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => togglePublish(quiz)}
                    style={btn(quiz.is_published ? "#9ca3af" : "#16a34a", "#fff")}>
                    {quiz.is_published ? "Unpublish" : "🚀 Publish"}
                  </button>
                  <button onClick={() => deleteQuiz(quiz.id)} style={btn("#fff", "#dc2626", "1px solid #dc2626")}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function btn(bg, color, border = "none") {
  return { background: bg, color, border, padding: "8px 14px", borderRadius: "7px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" };
}

const pageWrap   = { minHeight: "100vh", background: "#faf7f0", paddingTop: "100px", paddingBottom: "60px", fontFamily: "'DM Sans', sans-serif" };
const sectionHead = { fontSize: "17px", color: "#103d25", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" };
const badge      = { background: "#dc2626", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" };
const formCard   = { background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #eee", marginBottom: "32px" };
const quizCard   = { background: "#fff", borderRadius: "10px", padding: "16px 20px", border: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" };
const emptyBox   = { background: "#fff", borderRadius: "10px", padding: "20px", border: "1px solid #eee", color: "#9ca3af", fontSize: "14px", marginBottom: "16px" };
const notifCard  = { background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "10px", padding: "12px 16px", display: "flex", gap: "10px" };
const labelStyle = { display: "block", fontSize: "12.5px", fontWeight: 600, color: "#374151", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" };
const errorBox   = { background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", fontSize: "13px" };
const primaryBtn = { background: "#103d25", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer", alignSelf: "flex-start" };
const thStyle = { padding: "10px 14px", textAlign: "left", color: "#fff", fontWeight: 600, fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.03em" };
const tdStyle = { padding: "10px 14px", borderBottom: "1px solid #f0f0f0", color: "#374151" };
const signOutBtn = { background: "#fff", color: "#dc2626", border: "1px solid #dc2626", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };