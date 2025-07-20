"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Make sure this matches your backend response structure
type User = {
  name: string;
  email: string;
  progression: number;
  experienceLevel?: string;
  completedPrograms?: string[];
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Fetch user from backend on load
  useEffect(() => {
    const email = sessionStorage.getItem("email"); // Save login email here after login
    if (email) {
      fetch(
        `http://localhost:8080/api/users/get?email=${encodeURIComponent(email)}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data: User) => setUserState(data))
        .catch(() => setUserState(null));
    }
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      sessionStorage.setItem("email", user.email); // Store email for later API load
    } else {
      sessionStorage.removeItem("email");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
