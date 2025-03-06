import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HRPage = () => {
  const navigate = useNavigate();
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [employee, setEmployee] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    positions: [""],
    password: generateRandomPassword(),
  });

  useEffect(() => {
    if (!localStorage.getItem("hrLoggedIn")) {
      navigate("/hr-login");
    }

    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const storedLeaves = JSON.parse(localStorage.getItem("leaveApplications")) || [];
    setEmployees(storedEmployees);

    const leaveDataWithEmployees = storedLeaves.map((leave) => {
      const emp = storedEmployees.find((e) => e.id === leave.employeeId);
      return { ...leave, employee: emp || {} };
    });
    setLeaveApplications(leaveDataWithEmployees);
  }, [navigate]);

  function generateRandomPassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "positions") {
      const newPositions = [...employee.positions];
      newPositions[index] = value;
      setEmployee({ ...employee, positions: newPositions });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const addPosition = () => {
    setEmployee({ ...employee, positions: [...employee.positions, ""] });
  };

  const registerEmployee = () => {
    if (!employee.firstName || !employee.lastName || !employee.positions[0]) {
      alert("Please complete all required fields.");
      return;
    }
    const newEmployee = { ...employee, id: Date.now() };
    const newEmployees = [...employees, newEmployee];
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
    setEmployee({ firstName: "", middleName: "", lastName: "", positions: [""], password: generateRandomPassword() });
    alert("Employee registered successfully!");
  };

  const updateLeaveStatus = (leaveId, status) => {
    const updatedLeaves = leaveApplications.map((leave) => 
      leave.id === leaveId ? { ...leave, status, approvalDate: status === "Approved" ? new Date().toLocaleDateString() : leave.approvalDate } : leave
    );
    setLeaveApplications(updatedLeaves);
    localStorage.setItem("leaveApplications", JSON.stringify(updatedLeaves));
  };

  const handleLogout = () => {
    localStorage.removeItem("hrLoggedIn");
    navigate("/hr-login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>HR Dashboard</h2>

      <h3>Register Employee</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="firstName" placeholder="First Name" value={employee.firstName} onChange={handleChange} required /><br /><br />
        <input type="text" name="middleName" placeholder="Middle Name" value={employee.middleName} onChange={handleChange} /><br /><br />
        <input type="text" name="lastName" placeholder="Last Name" value={employee.lastName} onChange={handleChange} required /><br /><br />
        {employee.positions.map((position, index) => (
          <div key={index}>
            <input type="text" name="positions" placeholder="Position" value={position} onChange={(e) => handleChange(e, index)} required />
            {index === employee.positions.length - 1 && (
              <button type="button" onClick={addPosition} style={{ marginLeft: "5px" }}>+ Add Position</button>
            )}
          </div>
        ))}
        <br />
        <input type="text" name="password" value={employee.password} readOnly /><br /><br />
        <button type="button" onClick={registerEmployee}>Register Employee</button>
      </form>

      <h3>Leave Applications</h3>
      <div>
        <button onClick={() => setFilter("Pending")}>Pending</button>
        <button onClick={() => setFilter("Approved")} style={{ margin: "0 5px" }}>Approved</button>
        <button onClick={() => setFilter("Declined")}>Declined</button>
      </div>

      {leaveApplications.filter(app => app.status === filter).length === 0 && <p>No {filter} applications.</p>}
      {leaveApplications.filter(app => app.status === filter).map((app) => (
        <div key={app.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Employee:</strong> {app.employee ? `${app.employee.firstName} ${app.employee.lastName}` : "Unknown"}</p>
          <p><strong>Date of Filing:</strong> {new Date(app.dateOfFiling).toLocaleDateString()}</p>
          {app.status === "Approved" && <p><strong>Approval Date:</strong> {app.approvalDate}</p>}
          <p><strong>Type:</strong> {app.type}</p>
          <p><strong>Details:</strong> {app.details}</p>
          <p><strong>Comment:</strong> {app.comment}</p>
          {filter === "Pending" && (
            <>
              <button onClick={() => updateLeaveStatus(app.id, "Approved")}>Approve</button>
              <button onClick={() => updateLeaveStatus(app.id, "Declined")}>Decline</button>
            </>
          )}
          {filter === "Approved" && <p style={{ color: "green", fontWeight: "bold" }}>✅ Approved</p>}
          {filter === "Declined" && <p style={{ color: "red", fontWeight: "bold" }}>❌ Declined</p>}
        </div>
      ))}

      <br />
      <button onClick={handleLogout}>Logout HR</button>
    </div>
  );
};

export default HRPage;