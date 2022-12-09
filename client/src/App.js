import { Routes, Route } from "react-router-dom";
import Homepage from "./page/homepage";

import Login from "./page/login";
import Position from "./page/position";
import Create_position from "./components/AfterUserLogin/Position/create_position";

import Create_employee from "./components/AfterUserLogin/Employee/write_employee_comp";

import Create_sallarys from "./components/AfterUserLogin/Sallarys/write_employee_comp";

import Sallary from "./page/sallary";

import Employee from "./page/employee";

import AdminRoute from "./routes/AdminRoute";

import DashboardTemplate from "./components/DashboardTemplate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AdminRoute />}>
          <Route
            path="/position"
            element={
              <>
                <DashboardTemplate
                  title="DASHBOARD LOMBA ADMIN"
                  content={<Position />}
                />
              </>
            }
          />
            <Route
            path="/position/create"
            element={
              <>
                <DashboardTemplate
                  title="DASHBOARD LOMBA ADMIN"
                  content={<Create_position />}
                />
              </>
            }
          />
          <Route path="/employee" element={<Employee />} />
          <Route path="/sallary" element={<Sallary />} />
          <Route path="/employee/create" element={<Create_employee />} />
          <Route path="/sallary/create" element={<Create_sallarys />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
