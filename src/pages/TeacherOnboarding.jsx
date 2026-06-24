import { useState } from "react";
import { useSession } from "../context/SessionContext";
import { supabase } from "../library/supabase";

const DEPARTMENTS = [
  "FSc Computer Science", "Pre-Medical", "Arts (FA)",
  "BS Computer Science", "BS English", "BS Political Science", "BBA",
];
const SEMESTERS = ["1","2","3","4","5","6","7","8"];

export default function TeacherOnboarding({ navigate }) {
  const { loginTeacher } = useSession();
  const [name,       setName]       = useState("");
  const [department, setDepartment] = useState("");
  const [semester,   setSemester]   = useState("");
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim())  { setError("Please enter your name."); return; }
    if (!department)   { setError("Please select your department."); return; }
    if (!semester)     { setError("Please select your semester."); return; }

    setSaving(true);

    // ✅ FIX: Look for an existing teacher first instead of always inserting.
    // Previously, every login created a NEW row with a NEW id, so quizzes and
    // submissions linked to the old id became invisible after sign-out.
    const { data: existing, error: findErr } = await supabase
      .from("teachers")
      .select("*")
      .eq("name", name.trim())
      .eq("department", department)
      .eq("semester", semester)
      .maybeSingle();

    if (findErr) {
      setSaving(false);
      setError(findErr.message);
      return;
    }

    if (existing) {
      // Teacher already exists — restore their session with the original id.
      // All quizzes and submissions remain linked correctly.
      setSaving(false);
      loginTeacher(existing);
      navigate("teacher-dashboard");
      return;
    }

    // First time this teacher has logged in — create the record.
    const { data, error: insertErr } = await supabase
      .from("teachers")
      .insert({ name: name.trim(), department, semester })
      .select()
      .single();

    setSaving(false);
    if (insertErr) { setError(insertErr.message); return; }

    loginTeacher(data);
    navigate("teacher-dashboard");
  }

  return (
    <div style={pageWrap}>
      <div style={card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "42px", marginBottom: "10px" }}>👨‍🏫</div>
          <h1 style={heading}>Teacher Portal</h1>
          <p style={sub}>Enter your details to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={label}>Teacher Name</label>
            <input style={input} type="text" placeholder="e.g. Sir Ali Hassan"
              value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label style={label}>Department You Teach</label>
            <select style={input} value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={label}>Semester You Teach</label>
            <select style={input} value={semester} onChange={e => setSemester(e.target.value)}>
              <option value="">-- Select Semester --</option>
              {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>

          {error && <div style={errorBox}>{error}</div>}

          <button type="submit" disabled={saving} style={submitBtn}>
            {saving ? "Please wait..." : "Enter Teacher Dashboard →"}
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