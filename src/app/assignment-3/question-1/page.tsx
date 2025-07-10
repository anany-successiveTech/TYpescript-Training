"use client";

import { useContext, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextType } from "@/context/AuthProvider"; // adjust path & type
import Input from "@/component/Input";
import "@/app/styles/auth.css";

const AuthConsumer: React.FC = () => {
  const { user, login, logout, error } = useContext<AuthContextType>(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      login(username, password);
      setUsername("");
      setPassword("");

      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        router.push(redirectPath);
      }
    }
  };

  return (
    <div>
      <p style={{ textAlign: "center", margin: "2rem" }}>
        1. Create two components: a parent component that acts as a provider and
        a child component that consumes the context. Create a context to manage
        a user's authentication status (logged in or out). Implement a login
        button in the child component that, when clicked, updates the
        authentication status in the context to "logged in." Display a message
        in the child component based on the user's authentication status. If the
        user is logged in, show "Welcome, [username]!" Otherwise, display
        "Please log in."
      </p>

      <div className="auth-container">
        <div className="auth-card">
          {user ? (
            <>
              <h2 className="auth-heading">
                Welcome, <span className="auth-username">{user.username}</span>!
              </h2>
              <button onClick={logout} className="auth-button">
                Log out
              </button>
            </>
          ) : (
            <>
              <h2 className="auth-heading">Please log in</h2>
              <div className="checking">
                <Input
                  type="text"
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
              )}
              <button onClick={handleLogin} className="auth-button">
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthConsumer;
