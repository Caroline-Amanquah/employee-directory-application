import './App.css';
import Employee from './getEmployee/GetEmployee';
import AddEmployee from './addEmployee/AddEmployee';
import UpdateEmployee from './updateEmployee/UpdateEmployee';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
  {
   path: "/",
   element: <Employee />,
  },
  {
   path: "/add",
   element: <AddEmployee />

  },
  {
    path: "/update/:id",
    element: <UpdateEmployee />
 
   },
  
]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
