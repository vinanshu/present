import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = employees.find(emp => emp.lastName === lastName && emp.password === password);

    if (employee) {
      localStorage.setItem("loggedInEmployee", JSON.stringify(employee));
      navigate("/employee-home");
    } else {
      alert("Invalid Last Name or Password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Employee Login</h2>
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required /><br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <button onClick={() => navigate("/hr-login")}>HR Login</button>
    </div>
  );
};

export default EmployeeLogin;
