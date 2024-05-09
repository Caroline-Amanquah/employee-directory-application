<h1 align="center">Employee CRUD Operations Final Case Study</h1>

<h2 align="center">Getting Started</h2>

To set up and run the frontend application:

```bash
cd frontend
npm install
npm start 
```

To set up and run the backend in a separate terminal:

```bash
cd backend
npm install
nodemon index.js  
```

After setting up mongoDB on your desktop or laptop to run MongoDB (the database) on the application:


```bash
cd backend
[your MongoDB startup command: <path_to_mongodb>/bin/mongod --dbpath <path_to_data_directory>
]
```
<path_to_mongodb> should be replaced with the path to the directory where MongoDB is installed on your system.
<path_to_data_directory> should be replaced with the path to the directory where you want MongoDB to store its data files.


Access the employee directory at http://localhost:3000.
Access the JSON data of employees at http://localhost:5000/api/employees.