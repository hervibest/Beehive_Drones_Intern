import { Routes, Route } from "react-router-dom";
import Homepage from "./page/homepage";

import Login from "./page/login";
import Position from "./page/position";
import Create_position from "./components/AfterUserLogin/Position/create_position";

import Create_employee from "./components/AfterUserLogin/Employee/write_employee_comp";

import Create_sallarys from "./components/AfterUserLogin/Sallarys/write_sallary_comp";

import Sallary from "./page/sallary";

import Employee from "./page/employee";

import AdminRoute from "./routes/AdminRoute";

import DashboardTemplate from "./components/DashboardTemplate";
import Dashboard from "./components/AfterUserLogin/Dashboard/Dashboard";

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
                  clickedPosition = {true}
                  content={<Position />}
                />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <DashboardTemplate
                  title="DASHBOARD LOMBA ADMIN"
                  clickedHome = {true}
                  content={<Dashboard />}
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
                  clickedPosition = {true}
                  content={<Create_position />}
                />
              </>
            }
          />
          <Route
            path="/employee"
            element={
              <>
                <DashboardTemplate
                clickedEmployee= {true}
                  title="Dashboard Employee"
                  content={<Employee />}
                />
              </>
            }
          />
          <Route
            path="/sallary"
            element={
              <>
                <DashboardTemplate
                  title="Dashboard Sallary"
                  clickedSallary= {true}

                  content={<Sallary />}
                />
              </>
            }
          />

          <Route
            path="/employee/create"
            element={
              <>
                <DashboardTemplate
                  title="Dashboard Sallary"
                  clickedEmployee= {true}
                  content={<Create_employee />}
                />
              </>
            }
          />
          <Route
            path="/sallary/create"
            element={
              <>
                <DashboardTemplate
                  title="Dashboard Sallary"
                  clickedSallary= {true}
                  content={<Create_sallarys />}
                />
              </>
            }
          />

        </Route>
      </Routes>
    </>
  );
}

export default App;
