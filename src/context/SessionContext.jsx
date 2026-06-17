import { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [teacher, setTeacher] = useState(() => {
    const s = localStorage.getItem("teacher_session");
    return s ? JSON.parse(s) : null;
  });

  const [student, setStudent] = useState(() => {
    const s = localStorage.getItem("student_session");
    return s ? JSON.parse(s) : null;
  });

  function loginTeacher(teacherData) {
    localStorage.setItem("teacher_session", JSON.stringify(teacherData));
    setTeacher(teacherData);
  }

  function loginStudent(studentData) {
    localStorage.setItem("student_session", JSON.stringify(studentData));
    setStudent(studentData);
  }

  function logoutTeacher() {
    localStorage.removeItem("teacher_session");
    setTeacher(null);
  }

  function logoutStudent() {
    localStorage.removeItem("student_session");
    setStudent(null);
  }

  return (
    <SessionContext.Provider value={{
      teacher, student,
      loginTeacher, loginStudent,
      logoutTeacher, logoutStudent,
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}