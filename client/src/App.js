import './App.css';
import Employee from './getEmployee/Employee';
import AddEmployee from './addEmployee/AddEmployee';
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
]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
