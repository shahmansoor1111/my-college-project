import { useState } from "react";
import { useSession } from "../context/SessionContext";
import { supabase } from "../library/supabase";

const DEPARTMENTS = [
  "FSc Computer Science", "Pre-Medical", "Arts (FA)",
  "BS Computer Science", "BS English", "BS Political Science", "BBA",
];
const SEMESTERS = ["1","2","3","4","5","6","7","8"];

export default function StudentOnboarding({ navigate }) {
  const { loginStudent } = useSession();
  const [fullName,    setFullName]    = useState("");
  const [enrollment,  setEnrollment]  = useState("");
  const [department,  setDepartment]  = useState("");
  const [semester,    setSemester]    = useState("");
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!fullName.trim())   { setError("Please enter your full name."); return; }
    if (!enrollment.trim()) { setError("Please enter your enrollment number."); return; }
    if (!department)        { setError("Please select your department."); return; }
    if (!semester)          { setError("Please select your semester."); return; }

    setSaving(true);

    // ✅ FIX: Look for an existing student by enrollment number first.
    // Previously, every login created a NEW row with a NEW id, so quiz
    // submissions linked to the old id were invisible after sign-out,
    // making completed quizzes appear available again.
    const { data: existing, error: findErr } = await supabase
      .from("students")
      .select("*")
      .eq("enrollment_number", enrollment.trim())
      .maybeSingle();

    if (findErr) {
      setSaving(false);
      setError(findErr.message);
      return;
    }

    if (existing) {
      // Student already exists — restore their session with the original id.
      // All their submissions remain linked, so completed quizzes stay completed.
      setSaving(false);
      loginStudent(existing);
      navigate("student-dashboard");
      return;
    }

    // First time this student has logged in — create the record.
    const { data, error: insertErr } = await supabase
      .from("students")
      .insert({
        full_name:         fullName.trim(),
        enrollment_number: enrollment.trim(),
        department,
        semester,
      })
      .select()
      .single();

    setSaving(false);
    if (insertErr) { setError(insertErr.message); return; }

    loginStudent(data);
    navigate("student-dashboard");
  }

  return (
    <div style={pageWrap}>
      <div style={card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "42px", marginBottom: "10px" }}>🎓</div>
          <h1 style={heading}>Student Portal</h1>
          <p style={sub}>Enter your details to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={label}>Full Name</label>
            <input style={input} type="text" placeholder="e.g. Ahmed Khan"
              value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div>
            <label style={label}>Enrollment Number</label>
            <input style={input} type="text" placeholder="e.g. 221216"
              value={enrollment} onChange={e => setEnrollment(e.target.value)} />
          </div>
          <div>
            <label style={label}>Department / Class</label>
            <select style={input} value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={label}>Semester</label>
            <select style={input} value={semester} onChange={e => setSemester(e.target.value)}>
              <option value="">-- Select Semester --</option>
              {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>

          {error && <div style={errorBox}>{error}</div>}

          <button type="submit" disabled={saving} style={submitBtn}>
            {saving ? "Please wait..." : "Go to My Dashboard →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const pageWrap  = { minHeight: "100vh", background: "#faf7f0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "24px", paddingTop: "100px" };
const card      = { background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 8px 40px rgba(0,0,0,0.10)", border: "1px solid #eee", width: "100%", maxWidth: "440px" };
const heading   = { fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#103d25", marginBottom: "6px" };
const sub       = { color: "#9ca3af", fontSize: "13px" };
const label     = { display: "block", fontSize: "12.5px", fontWeight: 600, color: "#374151", marginBottom: "6px" };
const input     = { width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" };
const errorBox  = { background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", fontSize: "13px" };
const submitBtn = { background: "#103d25", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };