import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

function Dashboard() {
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (!savedRole) {
      navigate("/login");
      return;
    }
    setRole(savedRole);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}api/jobs`);
      setJobs(res.data);
    } catch {
      setError("Failed to fetch jobs.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Dashboard ({role})</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Job Board</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {jobs.map(job => (
          <li key={job.id}>{job.title || "Untitled Job"}</li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Dashboard;
