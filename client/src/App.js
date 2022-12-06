import { Routes, Route } from "react-router-dom";
import Homepage from './page/homepage';


import Login from './page/login';
import Position from './page/position'
import Create_position from "./components/AfterUserLogin/Position/create_position";


import Create_employee from './components/AfterUserLogin/Employee/write_employee_comp';


import Employee from "./page/employee";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/position" element={<Position />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/position/create" element={<Create_position />} />
        <Route path="/employee/create" element={<Create_employee />} />



      </Routes>
    </>
  );
}

export default App;
