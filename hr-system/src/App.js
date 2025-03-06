import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HRLogin from "./HRLogin";
import HRPage from "./HRPage";
import EmployeeLogin from "./EmployeeLogin";
import EmployeeHome from "./EmployeeHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/register" element={<HRPage />} />
        <Route path="/employee-home" element={<EmployeeHome />} />
      </Routes>
    </Router>
  );
}

export default App;
