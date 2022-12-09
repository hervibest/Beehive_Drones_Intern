import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
import DeleteModal from "./handleUpdate";
import { Link } from "react-router-dom";

const Position_main = () => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  const [positionData, setPositionData] = useState([]);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = () => {
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/positions/paging/1/10`, {
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

      <div className="w-full h-full bg-gray-300 justify-center flex items-center">
        <div className="w-2/3 h-4/5 flex flex-col p-4   bg-blue-300">
          <div className="w-full h-12 flex  my-2 justify-between bg-gray-20">
            <p>Data Posisi beserta codenya </p>
            <Link className="rounded-md bg-green-600 text-white flex justify-center my-2 h-[80%] w-1/4" to="/position/create">
              {" "}
              <button className="text-center">
                Buat Posisi Baru
              </button>
            </Link>
          </div>
          <div className="w-full h-12  text-white grid grid-cols-3  justify-between bg-[#162F3D]">
            <div className="object-center p-2">Position</div>
            <div className="object-center  p-2">Code</div>
            <div className="object-center text-center p-2">Action</div>
          </div>
          <div className="h-full overflow-y-scroll">
            {positionData.map((position) => {
              return (
                <div className="w-full h-12 grid grid-cols-3  justify-between bg-gray-200">
                  <div className="object-center border border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                    {position.name}
                  </div>
                  <div className="object-center border border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0 p-2">
                    {position.code}
                  </div>
                  <div className="flex border justify-center border-blue-900 border-t-1 border-l-0 border-r-0 border-b-0  items-center">
                    <button className="rounded-md bg-green-600 text-    white my-2 h-[80%] w-1/3">
                      Update
                    </button>
                    <button
                      onClick={openDeleteModal}
                      className="rounded-md text-white ml-5 bg-red-600 my-2 h-[80%] w-1/3"
                    >
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

export default Position_main;
