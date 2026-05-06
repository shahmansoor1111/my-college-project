import PageLayout from "../components/PageLayout";
import { useState } from "react";

const inputStyle = {
  width: "100%", padding: "12px 14px",
  border: "1.5px solid #e5e7eb", borderRadius: "8px",
  fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
  outline: "none", background: "#fafafa", color: "#1a1a1a",
};

export default function Contact({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <PageLayout icon="📬" title="Contact Us" breadcrumb="Contact Us" navigate={navigate}>
      <div style={{
        background: "#fff", borderRadius: "18px", padding: "44px",
        border: "1px solid #e9ecef", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        maxWidth: "680px",
      }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "24px", color: "#103d25", marginBottom: "10px" }}>
              Message Sent!
            </h3>
            <p style={{ color: "#6b7280", fontFamily: "'DM Sans',sans-serif" }}>
              Thank you for reaching out. We will get back to you soon.
            </p>
            <button onClick={() => setSent(false)} style={{
              marginTop: "20px", background: "#1a5c38", color: "#fff",
              border: "none", padding: "12px 28px", borderRadius: "8px",
              fontFamily: "'DM Sans',sans-serif", fontSize: "14px", cursor: "pointer",
            }}>Send Another</button>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "24px", color: "#103d25", marginBottom: "28px" }}>
              Send Us a Message
            </h3>
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Your full name" },
              { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
              { label: "Subject", name: "subject", type: "text", placeholder: "What is this about?" },
            ].map(f => (
              <div key={f.name} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#6b7280", marginBottom: "6px", fontFamily: "'DM Sans',sans-serif" }}>
                  {f.label}
                </label>
                <input
                  type={f.type} name={f.name} placeholder={f.placeholder}
                  value={form[f.name]} onChange={handle} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#1a5c38"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            ))}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#6b7280", marginBottom: "6px", fontFamily: "'DM Sans',sans-serif" }}>
                Message
              </label>
              <textarea
                name="message" placeholder="Write your message here..."
                value={form.message} onChange={handle}
                style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                onFocus={e => e.target.style.borderColor = "#1a5c38"}
                onBlur={e => e.target.style.borderColor = "#e5e7eb"}
              />
            </div>
            <button onClick={submit} style={{
              width: "100%", background: "#c9a84c", color: "#103d25",
              border: "none", padding: "14px", borderRadius: "8px",
              fontFamily: "'DM Sans',sans-serif", fontSize: "15px", fontWeight: 700,
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8c97a"}
            onMouseLeave={e => e.currentTarget.style.background = "#c9a84c"}
            >
              Send Message
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
        {[
          { icon: "📍", label: "Address", value: "FG Degree College, Peshawar, KPK, Pakistan" },
          { icon: "📞", label: "Phone", value: "+92-91-XXXXXXX" },
          { icon: "✉️", label: "Email", value: "info@fgdc.edu.pk" },
        ].map(i => (
          <div key={i.label} style={{
            background: "#fff", borderRadius: "12px", padding: "22px",
            border: "1px solid #e9ecef", fontFamily: "'DM Sans',sans-serif",
          }}>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{i.icon}</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{i.label}</div>
            <div style={{ fontSize: "14px", color: "#103d25", fontWeight: 500 }}>{i.value}</div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
