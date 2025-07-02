import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Welcome to Vivaly AU!</h1>
      <p>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Home;
