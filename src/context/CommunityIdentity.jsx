import { createContext, useContext, useState } from "react";

const CommunityIdentityContext = createContext(null);

// ⚠️ These codes are NOT real security. Anyone reading this source file (or
// the deployed JS bundle) can see them. This is a lightweight "who are you
// pretending to be" gate for a classroom/FYP simulation — it stops casual
// accidental misuse, not a determined person. If you need real access
// control later, replace this with Supabase Auth + a role column tied to
// actual accounts.
const ROLE_CODES = {
  principal: "1122",
  teacher:   "3344",
  student:   "5566",
};

// There is only one principal at the college, so their name is fixed rather
// than typed in each time — this avoids inconsistent spellings ("M. Shoaib"
// vs "Muhammad Shoaib") showing up as different "authors" across posts.
// Change this constant if the principal changes.
const PRINCIPAL_NAME = "Muhammad Shoaib";

const ROLE_META = {
  principal: { label: "🛡️ Principal", color: "#92722a" },
  teacher:   { label: "🧑‍🏫 Teacher",  color: "#166534" },
  student:   { label: "🎓 Student",   color: "#3730a3" },
};

const STORAGE_KEY = "community_identity";

function loadFromStorage() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function CommunityIdentityProvider({ children }) {
  const [identity, setIdentity] = useState(loadFromStorage); // { role, name } | null

  function verifyAndEnter(role, code, name) {
    if (!ROLE_CODES[role]) {
      return { error: "Invalid role." };
    }
    if (role === "principal") {
      // Name is fixed for the principal role — no input needed or trusted.
      if (code !== ROLE_CODES.principal) {
        return { error: "Incorrect access code for this role." };
      }
      const next = { role: "principal", name: PRINCIPAL_NAME };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setIdentity(next);
      return { success: true };
    }

    if (!name || !name.trim()) {
      return { error: "Please enter your name." };
    }
    if (code !== ROLE_CODES[role]) {
      return { error: "Incorrect access code for this role." };
    }
    const next = { role, name: name.trim() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIdentity(next);
    return { success: true };
  }

  function leaveCommunity() {
    sessionStorage.removeItem(STORAGE_KEY);
    setIdentity(null);
  }

  return (
    <CommunityIdentityContext.Provider value={{
      identity,                      // null until unlocked, else { role, name }
      isUnlocked: !!identity,
      verifyAndEnter,
      leaveCommunity,
      roleMeta: identity ? ROLE_META[identity.role] : null,
      ROLE_META,
    }}>
      {children}
    </CommunityIdentityContext.Provider>
  );
}

export function useCommunityIdentity() {
  const ctx = useContext(CommunityIdentityContext);
  if (!ctx) throw new Error("useCommunityIdentity must be used within CommunityIdentityProvider");
  return ctx;
}