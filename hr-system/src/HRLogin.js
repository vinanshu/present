import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HRLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "BFPVILLANUEVA" && password === "BFPVILLANUEVA") {
      localStorage.setItem("hrLoggedIn", "true");
      navigate("/register");
    } else {
      alert("Invalid HR Credentials");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>HR Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <button onClick={() => navigate("/")}>Go to Employee Login</button>
    </div>
  );
};

export default HRLogin;
