import React, { useState, useEffect } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpiner";
import { Link } from "react-router-dom";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
const Create_sallarys = () => {
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    loadProfile();
    console.log(new Date());
    let date = moment().format();
    setFormData({ ...formData, payday: date });
    console.log(date);
  }, []);
  const loadProfile = () => {
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/employees/paging/1/10`, {
        headers: {
          // masih bingung gunanya headers ?
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // setLoading(false);

        setEmployeeData(res.data.data.results);
        console.log(employeeData);
      })
      .catch((err) => {
        if (err.response.status === 401) {
        }
      });
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    basic_sallary: 0,
    allowance: 0,
    payday: "",
    notes: "",
    employee_id: "",
    textChange: "Submit",
  });
  const { basic_sallary, allowance, payday, notes, employee_id, textChange } =
    formData;
  const handleSubmit = (e) => {
    const token = getCookie("token");

    e.preventDefault();

    setFormData({ ...formData, textChange: "Submitting" });
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/sallarys/create`,
        {
          basic_sallary,
          allowance,
          payday,
          notes,
          employee_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    console.log(e.target.value);
  };
  return (
    <div className="flex items-center justify-center h-full w-full">
      <ToastContainer />
      <div className="p-0.5 flex   items-center justify-center rounded-xl bg-biru_tua sm:w-[80%] w-[90%]">
        <div className="bg-hitam  rounded-2xl w-full ">
          <div className="sm:px-12 px-6 py-6 flex rounded-2xl   flex-col items-center justify-between w-full">
            <>
              <form
                className="w-full justify-center flex-1 items-center bg-hitam text-white"
                onSubmit={handleSubmit}
              >
                <div className="text-center mb-4 font-bold text-2xl">
                  Masukkan Data Sallary
                </div>
                <div className="w-full lg:grid lg:grid-cols-2 relative ">
                <div className="w-[90%] ">
                  <p className="font-medium text-birumuda mb-2 ">
                    Basic Sallary
                  </p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="text"
                    placeholder="Basic Sallary"
                    onChange={handleChange("basic_sallary")}
                    value={basic_sallary}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan allowance
                  </p>

                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="name"
                    placeholder="Allowance"
                    onChange={handleChange("allowance")}
                    value={allowance}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan payday
                  </p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="Alamat"
                    placeholder="Payday"
                    onChange={handleChange("payday")}
                    value={payday}
                  />
                  </div>
                  <div className="w-[90%] ">
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan No Handphone
                  </p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="name"
                    placeholder="Notes"
                    onChange={handleChange("notes")}
                    value={notes}
                  />

                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan Posisi
                  </p>

                  <select
                    name="ID"
                    onChange={handleChange("employee_id")}
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                  >
                    <option value="" disabled selected hidden>
                      ID
                    </option>
                    {employeeData.map((employee) => {
                      return (
                        <option value={employee._id}>{employee.name}</option>
                      );
                    })}
                  </select>
                  </div>
                  <button
                    type="submit"
                    className="mx-auto bg-biru_muda text-gray-100 w-1/2 py-4 rounded-lg  transition-all duration-300 ease-in-out xl:flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">{textChange}</span>
                  </button>
                  <Link to="/sallary">
                  <button
                    type="button"
                    className=" bg-biru_gelap mx-auto text-gray-100 w-1/2 py-4 rounded-lg transition-all duration-300 ease-in-out xl:flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">Cancel</span>
                  </button>
                  </Link>
               
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_sallarys;
