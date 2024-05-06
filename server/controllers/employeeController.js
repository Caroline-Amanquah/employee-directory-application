// responsible for managing, handling and generating the requests and   processing data  

import Employee from "../model/employeeModel.js"

// Function to create a new employee entry in the database
export const create = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body); // Creating a new employee from request body
        const { employeeID } = newEmployee; // Destructuring to get employeeID from the new employee object

        // Checking if an employee with the same ID already exists in the database
        const employeeExist = await Employee.findOne({ employeeID });
        if (employeeExist) {
            return res.status(400).json({ message: "Employee already exists." });
        }

        // Saving the new employee data to the database
        const savedData = await newEmployee.save();
        res.status(200).json(savedData); // Sending the saved data back as response
    } catch (error) {
        res.status(500).json({ errorMessage: error.message }); // Handling errors
    }
};

