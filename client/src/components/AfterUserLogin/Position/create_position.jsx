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
    textChange: "Submit",
  });
  const { name, code, textChange } = formData;
  const handleSubmit = (e) => {
    const token = getCookie("token");

    e.preventDefault();
    if (code !== "") {
      if (name !== "") {
        setFormData({ ...formData, textChange: "Submitting" });
        setLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/positions/create`,
            {
              name,
              code,
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
          .catch((err) => {
            setFormData({
              ...formData,

              name: "",
              code: "",
            });
            toast.error(err.response.data.error);
            console.log(err.response);
          });
      } else {
        toast.error("Name tidak boleh kosong");
      }
    } else {
      toast.error("Code tidak boleh kosong");
    }
  };
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  return (
    <div>
      <div className="p-0.5 flex rounded-2xl bg-gradient-to-br from-[#4B85E4] to-[#FEF001]  w-full">
        <div className="bg-hitam rounded-2xl ">
          <div className="px-12 py-12 flex rounded-2xl   flex-col items-start xl:grid xl:grid-cols-2 w-full">
            <>
              <form
                className="w-full justify-start flex-1 bg-hitam text-black"
                onSubmit={handleSubmit}
              >
                <div className="max-w-xs relative ">
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan data
                  </p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="text"
                    placeholder="Code"
                    onChange={handleChange("code")}
                    value={code}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan data
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
