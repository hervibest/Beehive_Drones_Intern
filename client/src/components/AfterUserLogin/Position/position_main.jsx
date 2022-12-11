import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
import DeleteModal from "./handleDelete";
import UpdateModal from './handleUpdate'
import { Link } from "react-router-dom";

const Position_main = () => {
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
  let [isUpdateOpen, setIsUpdateOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function closeUpdateModal() {
    setIsUpdateOpen(false);
  }


  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  function openUpdateModal() {
    setIsUpdateOpen(true);
  }
  const [positionData, setPositionData] = useState([]);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = (ID) => {

    let id = "10";
    if (ID !== null) {
      id = ID;
    }
    console.log(ID)
    console.log(id)
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/positions/paging/1/${id}`, {
        headers: {
          // masih bingung gunanya headers ?
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // setLoading(false);

        setPositionData(res.data.data.results);
        console.log(positionData);
      })
      .catch((err) => {
        if (err.response.status === 401) {
        }
      });
  };
  return (
    <>
      <DeleteModal show={isDeleteOpen} closeModal={closeDeleteModal} />
      

      <div className="w-full h-full  justify-center  flex items-center">
        <div className="md:w-2/3  w-full h-full flex flex-col rounded-lg p-4 bg-biru_muda_2">
          <div className="w-full h-12 flex  my-2 justify-between bg-gray-20">
            <p className="sm:text-2xl text-xl ml-4 text-biru_gelap font-bold">Position Data</p>
            <div className="md:w-1/3  w-1/2 flex items-center justify-between">
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
              className="rounded-md bg-green-600 h-fit text-white flex justify-center my-2 sm:h-[80%] w-[60%]"
              to="/position/create"
            >
              {" "}
              <button className="text-center">Buat Posisi Baru</button>
            </Link>
            </div>
          </div>
          <div className="w-full h-12  text-white grid grid-cols-3  justify-between bg-[#162F3D]">
            <div className="object-center p-2">Position</div>
            <div className="object-center  p-2">Code</div>
            <div className="object-center text-center p-2">Action</div>
          </div>
          <div className="h-full overflow-y-scroll">
            {positionData.map((position) => {
              return (
                <>
                <UpdateModal show={isUpdateOpen} data={position} closeModal={closeUpdateModal} />
                <div className="w-full h-fit grid grid-cols-3  justify-between bg-gray-200">
                  <div className="object-center border border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                    {position.name}
                  </div>
                  <div className="object-center border border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                    {position.code}
                  </div>
                  <div className="flex border md:flex-row flex-col justify-center border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0  items-center">
                  <button onClick={openUpdateModal} className="rounded-md px-1 bg-green-600 text-base text-white my-2 h-8 w-[80%] md:w-[50%]">
                    Update
                  </button>
                  <button onClick={openDeleteModal} className="rounded-md px-1 text-white md:ml-5 bg-red-600 my-2 h-8 w-[80%] md:w-[40%]">
                    Delete
                  </button>
                  </div>
                </div>
                </>
              );
              
            })}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Position_main;
