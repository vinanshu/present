import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeHome = () => {
    const [employee, setEmployee] = useState(null);
    const [leave, setLeave] = useState({
        dateOfFiling: "",
        type: "",
        details: "",
        comment: "",
        status: "Pending",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInEmployee = JSON.parse(localStorage.getItem("loggedInEmployee"));
        if (!loggedInEmployee) {
            navigate("/");
        } else {
            setEmployee(loggedInEmployee);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("loggedInEmployee");
        navigate("/");
    };

    const handleLeaveChange = (e) => {
        setLeave({ ...leave, [e.target.name]: e.target.value });
    };

    const submitLeaveApplication = () => {
        if (!leave.dateOfFiling || !leave.type) {
            alert("Please complete all required fields.");
            return;
        }

        const leaveData = JSON.parse(localStorage.getItem("leaveApplications")) || [];
        const newLeave = { ...leave, id: Date.now(), employeeId: employee.id };
        leaveData.push(newLeave);
        localStorage.setItem("leaveApplications", JSON.stringify(leaveData));

        alert("Leave application submitted successfully!");
        setLeave({ dateOfFiling: "", type: "", details: "", comment: "", status: "Pending" });
    };

    const getMinLeaveDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 5); // 6 days from today
        return today.toISOString().split("T")[0];
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2>Employee Home</h2>
            {employee ? (
                <div>
                    <p><strong>First Name:</strong> {employee.firstName}</p>
                    <p><strong>Middle Name:</strong> {employee.middleName}</p>
                    <p><strong>Last Name:</strong> {employee.lastName}</p>
                    <p><strong>Positions:</strong> {employee.positions.join(", ")}</p>

                    <h3>Apply for Leave</h3>
                    <label><strong>Date of Filing:</strong></label>
                    <input
                        type="date"
                        name="dateOfFiling"
                        min={getMinLeaveDate()}
                        value={leave.dateOfFiling}
                        onChange={handleLeaveChange}
                        required
                    />
                    <br /><br />

                    <label><strong>Type of Leave:</strong></label>
                    <select name="type" value={leave.type} onChange={handleLeaveChange} required>
                        <option value="">Select Leave Type</option>
                        {[
                            "Vacation Leave", "Mandatory/Forced Leave", "Sick Leave",
                            "Maternity Leave", "Paternity Leave", "Special Privilege Leave",
                            "Solo Parent Leave", "Study Leave", "10-Day VAWC Leave",
                            "Rehabilitation Privilege", "Special Leave Benefits for Women",
                            "Special Emergency (Calamity Leave)", "Adoption Leave", "Others"
                        ].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <br /><br />

                    {leave.type === "Others" && (
                        <>
                            <label><strong>Specify:</strong></label>
                            <input 
                                type="text" 
                                name="details" 
                                value={leave.details} 
                                onChange={handleLeaveChange} 
                            />
                            <br /><br />
                        </>
                    )}

                    {leave.type === "Vacation Leave" && (
                        <>
                            <label><strong>Destination:</strong></label>
                            <select name="details" value={leave.details} onChange={handleLeaveChange}>
                                <option value="">Select</option>
                                <option value="Within the Philippines">Within the Philippines</option>
                                <option value="Abroad">Abroad (Specify)</option>
                            </select>
                            {leave.details === "Abroad" && (
                                <>
                                    <input 
                                        type="text" 
                                        name="comment" 
                                        placeholder="Specify Destination" 
                                        value={leave.comment}
                                        onChange={handleLeaveChange} 
                                    />
                                    <br /><br />
                                </>
                            )}
                        </>
                    )}

                    {leave.type === "Sick Leave" && (
                        <>
                            <label><strong>Treatment Type:</strong></label>
                            <select name="details" value={leave.details} onChange={handleLeaveChange}>
                                <option value="">Select</option>
                                <option value="In Hospital">In Hospital (Specify Illness)</option>
                                <option value="Out Patient">Out Patient (Specify Illness)</option>
                            </select>
                            <input 
                                type="text" 
                                name="comment" 
                                placeholder="Specify Illness" 
                                value={leave.comment}
                                onChange={handleLeaveChange} 
                            />
                            <br /><br />
                        </>
                    )}

                    {leave.type === "Study Leave" && (
                        <>
                            <label><strong>Purpose:</strong></label>
                            <select name="details" value={leave.details} onChange={handleLeaveChange}>
                                <option value="">Select</option>
                                <option value="Completion of Master’s Degree">Completion of Master’s Degree</option>
                                <option value="Bar/Board Examination Review">Bar/Board Examination Review</option>
                                <option value="Other">Other (Specify)</option>
                            </select>
                            {leave.details === "Other" && (
                                <>
                                    <input 
                                        type="text" 
                                        name="comment" 
                                        placeholder="Specify Purpose" 
                                        value={leave.comment}
                                        onChange={handleLeaveChange} 
                                    />
                                    <br /><br />
                                </>
                            )}
                        </>
                    )}

                    <button onClick={submitLeaveApplication}>Submit Leave Request</button>
                    <br /><br />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EmployeeHome;
