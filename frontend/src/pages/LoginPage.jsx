// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";
import "../login.css";

export const LoginPage = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      let data = {};
  
      // Try to parse only if there's a body
      if (res.headers.get("content-length") !== "0") {
        data = await res.json();
      }
  
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      localStorage.setItem("token", data.token);
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      setUser(decoded);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2 className="login-title">Welcome Back</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};
