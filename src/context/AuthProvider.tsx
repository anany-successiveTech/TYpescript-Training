"use client";

import React, { useState, createContext, useEffect, ReactNode, useCallback } from "react";

export interface User {
  username: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  error: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("registeredUser");
    if (!storedUser) {
      const defaultUser = {
        username: "ananymore65@gmail.com",
        password: "1234",
      };
      localStorage.setItem("registeredUser", JSON.stringify(defaultUser));
    }
  }, []);

  const login = useCallback((username: string, password: string) => {
    try {
      const storedUserString = localStorage.getItem("registeredUser");
      if (!storedUserString) {
        setError("No registered user found");
        return;
      }

      const storedUser = JSON.parse(storedUserString) as { username: string; password: string };

      if (
        username === storedUser.username &&
        password === storedUser.password
      ) {
        setUser({ username });
        setError(null);
        console.log("Login successful:", username);
      } else {
        setError("Invalid username or password");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err.message);
      }
      setError("Something went wrong. Please try again.");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
