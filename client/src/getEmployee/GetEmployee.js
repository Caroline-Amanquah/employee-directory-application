import './GetEmployee.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';


const Employee = () => {
   const [employees, setEmployees] = useState([]);


   useEffect(() => {
     const fetchData = async () => {
         try {
             const response = await axios.get("http://localhost:5000/api/employees");
             const formattedEmployees = response.data.map(employee => {
                 return {
                     ...employee,
                     startDate: formatDate(employee.startDate)
                 };
             });
             setEmployees(formattedEmployees);
         } catch (error) {
             console.log("Error while fetching data", error);
         }
     };


     fetchData();
 }, []);


 // Function to format date from ISO to DD-MM-YYYY
 const formatDate = (isoDate) => {
     const date = new Date(isoDate);
     return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
 };


 const deleteEmployee = async (employeeId) => {
   try {
       const response = await axios.delete(`http://localhost:5000/api/delete/employee/${employeeId}`);
       setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeId));
       toast.success(response.data.message, { position: "top-right" });
   } catch (error) {
       console.error(error);
       toast.error("Failed to delete employee", { position: "top-right" });
   }
};
  return (
   <div className="employeeTable">
    <h1>Employee Directory</h1>
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
               <Link to={`/update/`+ employee._id} type="button" className="btn btn-info">
               <i className="fa-solid fa-pen-to-square"></i>
               </Link>
               <button type="button" onClick={()=> deleteEmployee(employee._id)} className="btn btn-danger"  >
                   <i className="fa-solid fa-trash"></i>
               </button>
               </td>
               </tr>
           )
       })}
     </table>
   </div>
 );
};


export default Employee;

