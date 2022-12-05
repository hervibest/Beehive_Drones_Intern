import { Routes, Route } from "react-router-dom";
import Homepage from './page/homepage';


import Login from './page/login';
import Position_main from "./components/AfterUserLogin/Position/position_main";
import Employee from "./page/employee";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/position" element={<Position_main />} />
        <Route path="/employee" element={<Employee />} />

      </Routes>
    </>
  );
}

export default App;
