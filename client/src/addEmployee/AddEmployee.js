//AddEmployee.js

import React, { useState } from "react";
import "./AddEmployee.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddEmployee = () => {
  // Initial state for the user form
  const employees = {
    employeeID: "",
    fullName: "",
    age: "",
    homeAddress: "",
    mobileNumber: "",
    email: "",
    jobTitle: "",
    department: "",
    annualSalary: "",
    startDate: ""
  };


  // state to manage user form data
  const [employee, setEmployee] = useState(employees);
  const navigate = useNavigate();


  // State for managing form validation errors
  const [errors, setErrors] = useState({});

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
};


// const validateField = (name, value) => {
//   switch (name) {
//       case 'employeeID':
//           return value.trim().length === 6 && !isNaN(value.trim())
//               ? ''
//               : 'Employee ID must be 6 numbers.';
//       case 'fullName':
//           return value.trim() ? '' : 'Enter your full name.';
//       case 'age':
//           return value.trim() ? '' : 'Enter your age.';
//       case 'homeAddress':
//           return value.trim() ? '' : 'Enter your home address.';
//       case 'mobileNumber':
//           return /^\d{11}$/.test(value.trim())
//               ? ''
//               : 'Mobile number must be 11 digits long.';
//       case 'email':
//           return /^\S+@\S+\.\S+$/.test(value.trim())
//               ? ''
//               : 'Enter a valid email address.';
//       case 'jobTitle':
//           return value.trim() ? '' : 'Enter your job title.';
//       case 'department':
//           return value.trim() ? '' : 'Enter your department.';
//       case 'annualSalary':
//           return /^\d+(\.\d{1,2})?$/.test(value.trim())
//               ? ''
//               : 'Enter a valid annual salary.';
//       case 'startDate':
//           return value.trim() ? '' : 'Enter your start date.';
//       default:
//           return '';
//   }
// };

const validateField = (name, value) => {
  // Ensure the value is treated as a string
  const stringValue = value ? value.toString().trim() : '';

  switch (name) {
      case 'employeeID':
          return stringValue.length === 6 && !isNaN(stringValue)
              ? ''
              : 'Employee ID must be 6 numbers.';
      case 'fullName':
          return stringValue ? '' : 'Enter your full name.';
      case 'age':
          return stringValue ? '' : 'Enter your age.';
      case 'homeAddress':
          return stringValue ? '' : 'Enter your home address.';
      case 'mobileNumber':
          return /^\d{11}$/.test(stringValue)
              ? ''
              : 'Mobile number must be 11 digits long.';
      case 'email':
          return /^\S+@\S+\.\S+$/.test(stringValue)
              ? ''
              : 'Enter a valid email address.';
      case 'jobTitle':
          return stringValue ? '' : 'Enter your job title.';
      case 'department':
          return stringValue ? '' : 'Enter your department.';
      case 'annualSalary':
          return /^\d+(\.\d{1,2})?$/.test(stringValue)
              ? ''
              : 'Enter a valid annual salary.';
      case 'startDate':
          return stringValue ? '' : 'Enter your start date.';
      default:
          return '';
  }
};



  const submitForm = async (e) => {
    e.preventDefault();

    // Validate each field
    const newErrors = {};
    for (const key in employee) {
        if (Object.prototype.hasOwnProperty.call(employee, key)) {
            newErrors[key] = validateField(key, employee[key]);
        }
    }

    // Set errors state
    setErrors(newErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some((error) => error !== '');

    if (hasErrors) {
        // If there are validation errors, do something (e.g., show error messages)
        return;
    }

    // If no validation errors, proceed with form submission
    try {
        const response = await axios.post("http://localhost:5000/api/employee", employee);
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
    } catch (error) {
        console.error(error);
        toast.error("Failed to submit form", { position: "top-right" });
    }
};

  

  return (
    <div className="addEmployee">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Employee Form</h3>
      <form className="addEmployeeForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Employee ID:</label>
          <input
            type="number"
            id="employeeID"
            onChange={inputHandler}
            name="employeeID"
            autoComplete="off"
            maxLength={6}
            placeholder="Enter your Employee ID"
          />
        </div>
        {errors.employeeID && <span className='error'>{errors.employeeID}</span>}
        <div className="inputGroup">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            onChange={inputHandler}
            name="fullName"
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        {errors.fullName && <span className='error'>{errors.fullName}</span>}
        <div className="inputGroup">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            onChange={inputHandler}
            name="age"
            autoComplete="off"
            maxLength={3}
            placeholder="Enter your age"
          />
        </div>
        {errors.age && <span className='error'>{errors.age}</span>}
        <div className="inputGroup">
          <label htmlFor="homeAddress">Home Address:</label>
          <input
            type="text"
            id="homeAddress"
            onChange={inputHandler}
            name="homeAddress"
            autoComplete="off"
            placeholder="Enter your address"
          />
        </div>
        {errors.homeAddress && <span className='error'>{errors.homeAddress}</span>}
        <div className="inputGroup">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="number"
            id="mobileNumber"
            onChange={inputHandler}
            name="mobileNumber"
            autoComplete="off"
            maxLength={11}
            placeholder="Enter your mobile number"
          />
        </div>
        {errors.mobileNumber && <span className='error'>{errors.mobileNumber}</span>}
        <div className="inputGroup">
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <span className='error'>{errors.email}</span>}
        <div className="inputGroup">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            onChange={inputHandler}
            name="jobTitle"
            autoComplete="off"
            placeholder="Enter your job title"
          />
        </div>
        {errors.jobTitle && <span className='error'>{errors.jobTitle}</span>}
        <div className="inputGroup">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            onChange={inputHandler}
            name="department"
            autoComplete="off"
            placeholder="Enter your department"
          />
        </div>
        {errors.department && <span className='error'>{errors.department}</span>}
        <div className="inputGroup">
          <label htmlFor="annualSalary">Annual Salary:</label>
          <input
            type="number"
            id="annualSalary"
            onChange={inputHandler}
            name="annualSalary"
            autoComplete="off"
            placeholder="Enter your annual salary"
          />
        </div>
        {errors.annualSalary && <span className='error'>{errors.annualSalary}</span>}
        <div className="inputGroup">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            onChange={inputHandler}
            name="startDate"
            autoComplete="off"
            placeholder="Enter your start date"
          />
        </div>
        {errors.startDate && <span className='error'>{errors.startDate}</span>}
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary mt-4 p-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddEmployee;