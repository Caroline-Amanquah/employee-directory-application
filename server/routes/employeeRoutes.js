// defines the endpoints of the application and also maps them to specific controller methods 

//employeeRoutes


import express from "express";
import { getAllEmployees, create, deleteEmployee, getEmployeeById, update } from "../controllers/employeeController.js";

const route = express.Router();

route.post("/employee", create); //e.g  http://localhost:5000/api/employee/
route.get("/employees", getAllEmployees);
route.get("/employee/:id", getEmployeeById); //e.g  http://localhost:5000/api/employee/66390a86b15cd0ffb3bc4a7d
route.put("/update/employee/:id", update); // e.g http://localhost:5000/api/update/employee/66390a86b15cd0ffb3bc4a7d
route.delete("/delete/employee/:id", deleteEmployee); // e.g http://localhost:5000/api/delete/employee/66390a86b15cd0ffb3bc4a7d



export default route;

