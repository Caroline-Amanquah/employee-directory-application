//UpdateEmployee.js

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
    // State for managing form validation errors
    const [errors, setErrors] = useState({});
  
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
    
        setErrors(newErrors);
    
        const hasErrors = Object.values(newErrors).some((error) => error !== '');
    
        if (hasErrors) {
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/update/employee/${id}`, employee);
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
        {errors.employeeID && <span className='error'>{errors.employeeID}</span>}
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
        {errors.fullName && <span className='error'>{errors.fullName}</span>}
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
        {errors.age && <span className='error'>{errors.age}</span>}
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
        {errors.homeAddress && <span className='error'>{errors.homeAddress}</span>}
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
        {errors.mobileNumber && <span className='error'>{errors.mobileNumber}</span>}
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
        {errors.email && <span className='error'>{errors.email}</span>}
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
        {errors.jobTitle && <span className='error'>{errors.jobTitle}</span>}
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
        {errors.department && <span className='error'>{errors.department}</span>}
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
        {errors.annualSalary && <span className='error'>{errors.annualSalary}</span>}
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


export default UpdateEmployee;