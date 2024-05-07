import React, { useState, useEffect } from "react";
import "./UpdateEmployee.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateEmployee = () => {
    const [employee, setEmployee] = useState({
      employeeID: "",
      fullName: "",
      age: "",
      homeAddress: "",
      mobileNumber: "",
      email: "",
      jobTitle: "",
      department: "",
      annualSalary: "",
      startDate: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/employee/${id}`)
          .then((response) => {
            const employeeData = response.data;
            // Assuming `startDate` is the field you need to format
            if (employeeData.startDate) {
              // Convert ISO date string to "YYYY-MM-DD" format for the date input
              employeeData.startDate = employeeData.startDate.split('T')[0];
            }
            setEmployee(employeeData);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);
      
  
    const inputHandler = (e) => {
      const { name, value } = e.target;
      setEmployee(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
      axios.put(`http://localhost:5000/api/update/employee/${id}`, employee)
        .then(response => {
          toast.success("Updated successfully!");
          navigate("/");
        })
        .catch(error => {
          toast.error("Failed to update!");
          console.error("Update error", error);
        });
    };

  return (
    <div className="addEmployee">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3> Update Employee Form</h3>
      <form className="addEmployeeForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Employee ID:</label>
          <input
            type="number"
            id="employeeID"
            value={employee.employeeID}
            onChange={inputHandler}
            name="employeeID"
            autoComplete="off"
            maxLength={6}
            placeholder="Enter your Employee ID"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={employee.fullName}
            onChange={inputHandler}
            name="fullName"
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={employee.age}
            onChange={inputHandler}
            name="age"
            autoComplete="off"
            maxLength={3}
            placeholder="Enter your age"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="homeAddress">Home Address:</label>
          <input
            type="text"
            id="homeAddress"
            value={employee.homeAddress}
            onChange={inputHandler}
            name="homeAddress"
            autoComplete="off"
            placeholder="Enter your address"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="number"
            id="mobileNumber"
            value={employee.mobileNumber}
            onChange={inputHandler}
            name="mobileNumber"
            autoComplete="off"
            maxLength={11}
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            id="email"
            value={employee.email}
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={employee.jobTitle}
            onChange={inputHandler}
            name="jobTitle"
            autoComplete="off"
            placeholder="Enter your job title"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={employee.department}
            onChange={inputHandler}
            name="department"
            autoComplete="off"
            placeholder="Enter your department"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="annualSalary">Annual Salary:</label>
          <input
            type="text"
            id="annualSalary"
            value={employee.annualSalary}
            onChange={inputHandler}
            name="annualSalary"
            autoComplete="off"
            placeholder="Enter your annual salary"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={employee.startDate || ''}
            onChange={inputHandler}
            name="startDate"
            autoComplete="off"
            placeholder="Enter your start date"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary mt-4 p-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


export default UpdateEmployee;