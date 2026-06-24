import { useState } from "react";
import { useCommunityIdentity } from "../../context/CommunityIdentity";

const ROLE_OPTIONS = [
  { key: "principal", label: "🛡️ Principal", desc: "Post official notices & instructions" },
  { key: "teacher",   label: "🧑‍🏫 Teacher",  desc: "Post announcements & answer questions" },
  { key: "student",   label: "🎓 Student",    desc: "Ask questions & join discussions" },
];

export default function CommunityGate({ onUnlocked }) {
  const { verifyAndEnter } = useCommunityIdentity();
  const [step, setStep]   = useState(1); // 1 = pick role, 2 = enter code + name
  const [role, setRole]   = useState(null);
  const [code, setCode]   = useState("");
  const [name, setName]   = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function pickRole(key) {
    setRole(key);
    setError("");
    setStep(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = verifyAndEnter(role, code.trim(), name);
    setSubmitting(false);
    if (result.error) { setError(result.error); return; }
    onUnlocked?.();
  }

  const selectedRoleMeta = ROLE_OPTIONS.find(r => r.key === role);
  const isPrincipal = role === "principal";

  return (
    <div style={{
      maxWidth: "440px", margin: "60px auto", padding: "0 24px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px",
        padding: "32px 28px", boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "22px",
          color: "#103d25", marginBottom: "6px", textAlign: "center",
        }}>
          Community Board Access
        </h1>
        <p style={{ fontSize: "13.5px", color: "#9ca3af", textAlign: "center", marginBottom: "26px" }}>
          {step === 1 ? "Select your role to continue" : `Enter the ${selectedRoleMeta?.label.replace(/^\S+\s/, "")} access code`}
        </p>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {ROLE_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => pickRole(opt.key)}
                style={{
                  textAlign: "left", padding: "14px 16px", borderRadius: "10px",
                  border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.background = "#fefbf3"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fff"; }}
              >
                <div style={{ fontWeight: 700, fontSize: "14.5px", color: "#111827", marginBottom: "3px" }}>{opt.label}</div>
                <div style={{ fontSize: "12.5px", color: "#9ca3af" }}>{opt.desc}</div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div style={{
              display: "inline-block", fontSize: "13px", fontWeight: 700,
              background: "#f0f7f3", color: "#103d25", padding: "5px 12px",
              borderRadius: "20px", marginBottom: "18px",
            }}>
              {selectedRoleMeta?.label}
            </div>

            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b",
                padding: "9px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px",
              }}>
                {error}
              </div>
            )}

            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
              Your Name
            </label>
            {isPrincipal ? (
              <div style={{
                width: "100%", padding: "11px 14px", borderRadius: "9px",
                border: "1px solid #e5e7eb", background: "#f9fafb",
                fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                color: "#6b7280", marginBottom: "16px",
              }}>
                Muhammad Shoaib <span style={{ color: "#9ca3af" }}>(fixed)</span>
              </div>
            ) : (
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Ali Khan"
                maxLength={60}
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: "9px", border: "1px solid #d1d5db",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "14px", marginBottom: "16px",
                }}
              />
            )}

            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
              Access Code
            </label>
            <input
              autoFocus={isPrincipal}
              type="password"
              inputMode="numeric"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="••••"
              maxLength={10}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: "9px", border: "1px solid #d1d5db",
                fontFamily: "'DM Sans', sans-serif", fontSize: "14px", marginBottom: "22px",
                letterSpacing: "3px",
              }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => { setStep(1); setCode(""); setError(""); }}
                style={{
                  padding: "11px 16px", borderRadius: "9px", border: "1px solid #e5e7eb",
                  background: "#fff", color: "#6b7280", fontWeight: 600, fontSize: "13.5px",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  flex: 1, padding: "11px 16px", borderRadius: "9px", border: "none",
                  background: "#103d25", color: "#fff", fontWeight: 700, fontSize: "13.5px",
                  cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Checking…" : "Enter Community"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}