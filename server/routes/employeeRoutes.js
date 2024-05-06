// defines the endpoints of the application and also maps them to specific controller methods 

//create endpoint:

import express from "express";
import { create } from "../controllers/employeeController.js";

const route = express.Router();

route.post("/employees", create);

export default route;
