import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpiner";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
const Create_position = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    textChange:"submit"
  });
  const { name, code,textChange } = formData;
  const handleSubmit = (e) => {
    const token = getCookie("token");

    e.preventDefault();

    setFormData({ ...formData, textChange: "Submitting" });
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/positions/create`,
        {
          code,
          name
          
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
    <div className="flex items-center justify-center w-full">
      <div className="p-0.5 flex   items-center justify-center bg-biru_tua w-1/2">
        <div className="bg-hitam  rounded-2xl w-full ">
          <div className="px-12 py-12 flex rounded-2xl   flex-col items-center justify-between w-full">
          <p className="  text-xl mb-12 text-white">Buat Posisi Baru</p>
            <>
              <form
                className="w-full justify-center flex-1 bg-hitam text-white"
                onSubmit={handleSubmit}
              >
                <div className="w-full relative ">
                  <p className="font-medium text-birumuda mb-2 ">Code Posisi</p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="text"
                    placeholder="Kode"
                    onChange={handleChange("code")}
                    value={code}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan Nama Posisi
                  </p>

                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="name"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={name}
                  />
                 
                  

                 

                  <button
                    type="submit"
                    className=" mb-3 tracking-wide font-semibold bg-birumuda text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out xl:flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                    <span className="ml-3">{textChange}</span>
                  </button>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_position;
