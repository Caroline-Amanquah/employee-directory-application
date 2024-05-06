import React, { useState } from "react";
import "./AddEmployee.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddEmployee = () => {
  // Initial state for the user form
  const employees = {
    name: "",
    email: "",
    address: "",
  };

  // state to manage user form data
  const [employee, setEmployee] = useState(employees);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/employee", employee)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addEmployee">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Employee</h3>
      <form className="addEmployeeForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Employee ID:</label>
          <input
            type="number"
            onChange={inputHandler}
            id="employeeID"
            name="employeeID"
            autoComplete="off"
            maxLength={6}
            placeholder="Enter your Employee ID"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Age:</label>
          <input
            type="number"
            onChange={inputHandler}
            id="age"
            name="age"
            autoComplete="off"
            maxLength={3}
            placeholder="Enter your age"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Home Address:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="address"
            name="address"
            autoComplete="off"
            placeholder="Enter your address"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Mobile Number:</label>
          <input
            type="number"
            onChange={inputHandler}
            id="number"
            name="number"
            autoComplete="off"
            maxLength={11}
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="jobTitle"
            name="jobTitle"
            autoComplete="off"
            placeholder="Enter your job title"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="department"
            name="department"
            autoComplete="off"
            placeholder="Enter your department"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="annualSalary">Annual Salary:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="annualSalary"
            name="annualSalary"
            autoComplete="off"
            placeholder="Enter your annual salary"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            onChange={inputHandler}
            id="startDate"
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


export default AddEmployee