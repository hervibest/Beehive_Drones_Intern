import React, { useState, useEffect } from "react";
import DeleteModal from "./handleDelete";
import axios from "axios";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
import { Link } from "react-router-dom";
const Sallarys_main = () => {
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
  const [sallarysData, setSallarysData] = useState([]);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = () => {
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/sallarys/paging/1/30`, {
        headers: {
          // masih bingung gunanya headers ?
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // setLoading(false);

        setSallarysData(res.data.data.results);
        console.log(res.data.data.results);
      })
      .catch((err) => {
        if (err.response.status === 401) {
        }
      });
  };
  return (
    <>
      <div className="w-full h-full  justify-center  flex items-center">
      <DeleteModal show={isDeleteOpen} closeModal={closeDeleteModal} />

        <div className="w-full h-full flex flex-col sm:p-4  p-2 bg-biru_muda_2 rounded-lg">
          <div className="w-full h-12 flex items-center my-2 justify-between bg-gray-20">             
          <p className="sm:text-2xl text-xl ml-4 text-biru_gelap font-bold">Sallary Data</p>
          <Link
             className="rounded-md  bg-green-600 flex justify-center  text-white my-2 h-fit sm:h-[80%] w-1/4"
              to="/sallary/create"
            >
              {" "}
              <button className="text-center">Tambah Sallary</button>
            </Link>
          </div>
          <div className="w-full md:h-12 h-fit  text-white grid md:grid-cols-5 grid-cols-4  lg:grid-cols-6  justify-between bg-[#162F3D]">
            <div className="object-center p-2">Basic Sallary</div>
            <div className="object-center break-all p-2">Allowance</div>
            <div className="object-center lg:block hidden  p-2">Payday</div>
            <div className="object-center  md:block hidden  p-2">Notes</div>
            
            <div className="object-center  p-2">Name</div>
            <div className="object-center text-center p-2">Action</div>
          </div>
          <div className="h-full overflow-y-scroll">
            {sallarysData.map((sallarys) => {
              return (
                <div className="w-full 2xl:h-14 h-fit  grid md:grid-cols-5 grid-cols-4 lg:grid-cols-6  justify-between bg-gray-200">
                  <div className="object-center border pl-2 break-all sm:break-normal border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                  Rp.{sallarys.basic_sallary}
                  </div>
                  <div className="object-center border break-all sm:break-normal border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                  Rp.{sallarys.allowance}
                  </div>
                  <div className="object-center lg:block hidden  border border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                    {sallarys.payday}
                  </div>
                  <div className="object-center  md:block hidden   border border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                    {sallarys.notes}
                  </div>
                  <div className="object-center  border border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                    {sallarys.employee_id.name}
                  </div>

                  <div className="flex md:flex-row flex-col  border justify-center border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0  items-center">
                  <button className="rounded-md bg-green-600 text-white my-2 h-10 w-[80%] md:w-[40%]">
                    Update
                  </button>
                  <button onClick={openDeleteModal}  className="rounded-md text-white md:ml-5 bg-red-600 my-2 h-10 w-[80%] md:w-[40%]">
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

export default Sallarys_main;
