import { useAuth } from "../../context/SessionContext";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ children, requiredRole, navigate }) {
  const { user, profile, loading } = useAuth();

  // Still loading auth/profile — wait
  if (loading) {
    return <LoadingSpinner label="Checking your session..." />;
  }

  // Not logged in
  if (!user) {
    return (
      <FallbackScreen
        navigate={navigate}
        title="Please Log In"
        message="You need to be logged in to view this page."
        buttonLabel="Go to Login"
        buttonPage="auth"
      />
    );
  }

  // Profile not loaded yet — wait instead of blocking
  if (!profile) {
    return <LoadingSpinner label="Loading your profile..." />;
  }

  // Role mismatch — only block if role is actually set to something different
  if (requiredRole && profile.role && profile.role !== requiredRole) {
    return (
      <FallbackScreen
        navigate={navigate}
        title="Access Denied"
        message={`This page is for ${requiredRole}s only. You are logged in as a ${profile.role}.`}
        buttonLabel="Go Home"
        buttonPage="home"
      />
    );
  }

  return children;
}

function FallbackScreen({ navigate, title, message, buttonLabel, buttonPage }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "16px",
      fontFamily: "'DM Sans', sans-serif", background: "#faf7f0",
      textAlign: "center", padding: "0 20px",
    }}>
      <h2 style={{ color: "#103d25", fontFamily: "'Playfair Display', serif", fontSize: "26px" }}>
        {title}
      </h2>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>{message}</p>
      <button
        onClick={() => navigate(buttonPage)}
        style={{
          background: "#103d25", color: "#fff", border: "none",
          padding: "10px 24px", borderRadius: "8px", cursor: "pointer",
          fontWeight: 600, fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}