import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${API}api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div>
          <input
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
