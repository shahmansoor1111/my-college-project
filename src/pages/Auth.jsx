import { useState } from "react";
import { useSession } from "../context/SessionContext";

const USERS_KEY = "fg_users";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export default function Auth({ navigate }) {
  const { teacher, student, loginTeacher, loginStudent } = useSession();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // If already logged in, redirect to dashboard
  if (teacher) { navigate("teacher-dashboard"); return null; }
  if (student) { navigate("student-dashboard"); return null; }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const users = getUsers();

    if (mode === "login") {
      const match = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!match) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      const profile = { fullName: match.fullName, email: match.email, role: match.role };
      if (match.role === "teacher") loginTeacher(profile);
      else loginStudent(profile);
      // SessionProvider updates teacher/student, redirect triggers above
    } else {
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError("An account with this email already exists.");
        setLoading(false);
        return;
      }
      users.push({ fullName, email, password, role });
      saveUsers(users);
      setSuccess("Account created! Please log in.");
      setMode("login");
      setPassword("");
    }

    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#faf7f0",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", padding: "24px",
    }}>
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "40px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)", border: "1px solid #eee",
        width: "100%", maxWidth: "420px",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "14px",
            background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px",
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#103d25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px", color: "#103d25", marginBottom: "4px",
          }}>
            FG Degree College
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        {/* Toggle */}
        <div style={{
          display: "flex", background: "#f3f4f6", borderRadius: "10px",
          padding: "4px", marginBottom: "24px",
        }}>
          {["login", "signup"].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null); setSuccess(null); }}
              style={{
                flex: 1, padding: "8px", border: "none", borderRadius: "8px",
                fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
                background: mode === m ? "#fff" : "none",
                color: mode === m ? "#103d25" : "#9ca3af",
                boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {m === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

          {mode === "signup" && (
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ahmed Khan"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder={mode === "signup" ? "Min 6 characters" : "Enter your password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          {mode === "signup" && (
            <div>
              <label style={labelStyle}>I am a...</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["student", "teacher"].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      flex: 1, padding: "10px", border: "none", borderRadius: "8px",
                      fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s",
                      background: role === r ? "#103d25" : "#f3f4f6",
                      color: role === r ? "#fff" : "#6b7280",
                    }}
                  >
                    {r === "student" ? "🎓 Student" : "🧑‍🏫 Teacher"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              color: "#dc2626", padding: "10px 14px", borderRadius: "8px", fontSize: "13px",
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              color: "#16a34a", padding: "10px 14px", borderRadius: "8px", fontSize: "13px",
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#103d25", color: "#fff", border: "none",
              padding: "12px", borderRadius: "8px", fontSize: "15px",
              fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              opacity: loading ? 0.7 : 1, marginTop: "4px",
            }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "20px" }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
            style={{
              background: "none", border: "none", color: "#103d25",
              fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
            }}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#d1d5db", marginTop: "8px" }}>
          <button
            onClick={() => navigate("home")}
            style={{
              background: "none", border: "none", color: "#d1d5db",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
            }}
          >
            ← Back to Home
          </button>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: "12.5px", fontWeight: 600,
  color: "#374151", marginBottom: "6px",
};

const inputStyle = {
  width: "100%", padding: "11px 14px", borderRadius: "8px",
  border: "1px solid #e5e7eb", fontSize: "14px",
  fontFamily: "'DM Sans', sans-serif", outline: "none",
  boxSizing: "border-box",
};