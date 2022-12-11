import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
import { Link } from "react-router-dom";
import DeleteModal from "./handleUpdate";

const Employee_main = () => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (text) => (e) => {
    loadProfile(e.target.value);
  };
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    loadProfile();
  }, []);
  
  const loadProfile = (ID) => {
    console.log(ID)
    let id = "30";
    if (ID !== null) {
      id = ID;
    }
    console.log(id)
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/employees/paging/1/${id}`, {
        headers: {
          // masih bingung gunanya headers ?
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // setLoading(false);

        setEmployeeData(res.data.data.results);
        console.log(res.data.data.results);
      })
      .catch((err) => {
        if (err.response.status === 401) {
        }
      });
  };
  return (
    <>
    <div className="w-full h-full justify-center flex items-center">
    <DeleteModal show={isDeleteOpen} closeModal={closeDeleteModal} />

        <div className="w-full h-full flex flex-col sm:p-4  p-2 bg-biru_muda_2 rounded-lg">
        <div className="w-full h-12 flex  my-2 justify-between bg-gray-20">
        <p className="sm:text-2xl text-xl ml-4 text-biru_gelap font-bold">Employee Data</p>
          <div className="w-1/3 min-w-fit flex items-center gap-2 justify-between">
            <select
              name="By Labels"
              onChange={handleChange("label")}
              className="py-1 h-[80%] w-1/3 border  border-black rounded-lg text-gray-700 focus:outline-none"
            >
              <option value="" disabled selected hidden>
                10
              </option>
              <option value="10"> 10 </option>
              <option value="20"> 20 </option>
              <option value="30"> 30 </option>
            </select>
            <Link
              className="rounded-md bg-green-600 text-white flex justify-center my-2 md:h-[80%] h-fit md:min-w-fit w-[60%]"
              to="/employee/create"
            >
              {" "}
              <button className="text-center break-all text-sm md:text-base">Buat Employee Baru</button>
            </Link>
            </div>
        </div>
        <div className="w-full h-12  text-white grid grid-cols-4   lg:grid-cols-5  justify-between bg-[#162F3D]">
          <div className="object-center p-2">Name</div>
          <div className="object-center  p-2">Email</div>
          <div className="object-center   p-2">Phone</div>
          <div className="object-center lg:block hidden  p-2">Address</div>
          <div className="object-center text-center p-2">Action</div>
        </div>
        <div className="h-full overflow-y-scroll">
          {employeeData.map((employee) => {
            return (
              <div className="w-full 2xl:h-14 h-fit  grid grid-cols-4   lg:grid-cols-5  justify-between bg-gray-200">
                <div className=" object-center border  overflow-x-clip hover:overflow-x-auto hover:overflow-y-hidden border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                  {employee.name}
                </div>
                <div className="object-center border break-all border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                  {employee.email}
                </div>
                <div className="object-center border break-all sm:break-normal border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                  {employee.phone}
                </div>
                <div className="object-center border lg:block hidden  overflow-x-clip hover:overflow-x-auto hover:overflow-y-hidden border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                  {employee.address}
                </div>
                <div className="flex md:flex-row flex-col  border justify-center border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0  items-center">
                  <button className="rounded-md bg-green-600 text-white my-2 h-10 w-[80%] md:w-[40%]">
                    Update
                  </button>
                  <button  onClick={openDeleteModal} className="rounded-md text-white md:ml-5 bg-red-600 my-2 h-10 w-[80%] md:w-[40%]">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default Employee_main;
