import './Employee.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Employee = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/employees");
                setEmployees(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };

        fetchData();
    }, []);

  return (
    <div className="employeeTable">
        <Link to="/add" type="button" className="btn btn-primary">Add Employee
        <i className="fa-solid fa-user-plus"></i>
        </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Employee ID:</th>
            <th scope="col">Full Name:</th>
            <th scope="col">Age:</th>
            <th scope="col">Home Address:</th>
            <th scope="col">Mobile Number:</th>
            <th scope="col">Email:</th>
            <th scope="col">Job Title:</th>
            <th scope="col">Department:</th>
            <th scope="col">Annual Salary:</th>
            <th scope="col">Start Date:</th>
            <th scope="col">Actions:</th>
          </tr>
        </thead>
        {employees.map((employee, index )=>{
            return (
                <tr>
                <td>{employee.employeeID}</td>
                <td>{employee.fullName}</td>
                <td>{employee.age}</td>
                <td>{employee.homeAddress}</td>
                <td>{employee.mobileNumber}</td>
                <td>{employee.email}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.department}</td>
                <td>£{employee.annualSalary}</td>
                <td>{employee.startDate}</td>
                <td className="actionButtons">
                <button type="button" className="btn btn-info">
                <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" className="btn btn-danger"  >
                    <i className="fa-solid fa-trash"></i>
                </button>
                </td>
                </tr>
            )
        })}
        <tbody>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td className="actionButtons">
            <button type="button" className="btn btn-info">
            <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" className="btn btn-danger"  >
                <i className="fa-solid fa-trash"></i>
            </button>
            </td>
        </tbody>
      </table>
    </div>
  );
};
 

export default Employee

/*
rafce creates this function automatically:

import React from 'react'

const Employee = () => {
  return (
    <div>Employee</div>
  )
}

export default Employee

*/

