import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpiner";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
const Create_position = () => {
  const navigate = useNavigate();
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
    if (code !=="") {
      
      if (name !=="") {
                                        

        setFormData({ ...formData, textChange: "Submitting" });
        setLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/positions/create`,
            {
              code,
              name,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setFormData({
              ...formData,
              code: "",
              name: "",
              textChange: "Submitted",
            });
            toast.success("Selamat anda telah menambahkan Posisi Baru");
            setTimeout(() => {
              navigate("/position");
            }, 1000);
          })
          .catch((err) => {console.log("test")});
      }
      else {
        console.log("test")
        toast.error("Name tidak boleh kosong");
      }
    }
    else {
      console.log("test1")
      toast.error("Code tidak boleh kosong");
    }
  };
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    console.log(e.target.value);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <ToastContainer />
      <div className="p-0.5 flex   items-center justify-center rounded-xl bg-biru_tua md:w-1/2 w-[87%]">
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
                    className=" mb-3 tracking-wide font-semibold bg-birumuda text-gray-100 w-full py-4 rounded-lg bg-biru_muda  transition-all duration-300 ease-in-out xl:flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                    <span className="ml-3">{textChange}</span>
                  </button>
                  <Link to="/position">
                    <button
                      type="button"
                      className=" mb-3 tracking-wide font-semibold bg-birumuda text-gray-100 w-full py-4 rounded-lg bg-biru_gelap  transition-all duration-300 ease-in-out xl:flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                      <span className="ml-3">Kembali</span>
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

export default Create_position;
