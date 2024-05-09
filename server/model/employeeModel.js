// responsible for managing the structure of data and interaction with the database 
// employeeModel.js
import mongoose from "mongoose"


const employeeSchema = new mongoose.Schema({
    employeeID: {
      type: String,
      unique: true,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    homeAddress: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    annualSalary: {
      type: Number,
      required: true
    },

    startDate: {
        type: Date,
        required: true
      }
    });
    

export default mongoose.model("Employees", employeeSchema)
