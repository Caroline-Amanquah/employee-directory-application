// responsible for managing, handling and generating the requests and processing data.  

import Employee from "../model/employeeModel.js"

//
export const getAllEmployees = async (req, res) => {
    try {
      const employeeData = await Employee.find();
      if (!employeeData || employeeData.length === 0) {
        return res.status(404).json({ message: "Employee data not found." });
      }
      res.status(200).json(employeeData);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};


// Create endpoint
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
        // res.status(200).json(savedData); // Sending the saved data back as response
        res.status(200).json ({ message: "User created successfully." })
    } catch (error) {
        res.status(500).json({ errorMessage: error.message }); // Handling errors
    }
};

// Read endpoint 

export const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;  // Retrieving the user ID from request parameters
        const employeeExist = await Employee.findById(id);  // Using Mongoose to find the user by ID

        if (!employeeExist) {
            // If no user is found, send a 404 response with an error message
            return res.status(404).json({ message: "Employee not found." });
        }

        // If the user is found, send a 200 response with the user data
        res.status(200).json(employeeExist);
    } catch (error) {
        // If an error occurs during the operation, send a 500 response with the error message
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update endpoint

export const update = async (req, res) => {
    try {
        const id = req.params.id; // Extracting the user ID from the request parameters
        const employeeExist = await Employee.findById(id); // Checking if the user exists in the database

        if (!employeeExist) {
            // If the user does not exist, return a 404 error with a message
            return res.status(404).json({ message: "Employee not found." });
        }

        // If the user exists, update the user data with the new data from req.body
        const updatedData = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        // Respond with the updated data
        res.status(200).json({message: "User Updated Successfully."});
    } catch (error) {
        // If an error occurs, return a 500 error with the error message
        res.status(500).json({ errorMessage: error.message });
    }
};

//Delete Endpoint

export const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;  // Retrieve the ID from the request parameters
        const employeeExist = await Employee.findById(id);  // Check if the user exists in the database

        if (!employeeExist) {
            // If the user does not exist, return a 404 Not Found response
            return res.status(404).json({ message: "Employee not found." });
        }

        // If the user exists, delete the user
        await Employee.findByIdAndDelete(id);
        // Return a success message
        res.status(200).json({ message: "Employee deleted successfully." });
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ errorMessage : error.message });
    }
    };

