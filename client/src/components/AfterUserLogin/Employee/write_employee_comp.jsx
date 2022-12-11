import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpiner";
import { useNavigate } from "react-router-dom";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
const Create_position = ({title}) => {
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
   const navigate= useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nik : "",
    name : "",
    address : "",
    phone : "",
    email : "",
    position_id : "",
    textChange: "Submit",
  });
  const { name, nik, address, phone, email, position_id, textChange } =
    formData;
  const handleSubmit = (e) => {
    const token = getCookie("token");

    e.preventDefault();

        setFormData({ ...formData, textChange: "Submitting" });
        setLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/employees/create`,
            {
              nik,
              name,
              address,
              phone,
              email,
              position_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setFormData({
              ...formData,
              nik : "",
              name : "",
              address : "",
              phone : "",
              email : "",
              position_id : "",
              textChange: "Submitted",
            });
            toast.success("Selamat anda berhasil menambahkan Employee Baru");
            setTimeout(() => {
              navigate("/employee");
            }, 1000);
          })
          .catch((err) => {

          });
     
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
                <div className="text-center mb-4 font-bold text-2xl">Masukkan Data Pegawai</div>
                <div className="w-full lg:grid lg:grid-cols-2 relative ">
                  <div className="w-[90%]">
                  <p className="font-medium text-birumuda mb-2 ">NIK</p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="text"
                    placeholder="NIK"
                    onChange={handleChange("nik")}
                    value={nik}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan Nama
                  </p>

                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="name"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={name}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan Alamat
                  </p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="Alamat"
                    placeholder="Alamat"
                    onChange={handleChange("address")}
                    value={address}
                  />
                  </div>
                  <div className="w-[90%]">
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan No Handphone
                  </p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="name"
                    placeholder="No Handphone"
                    onChange={handleChange("phone")}
                    value={phone}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan Email
                  </p>
                  <input
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                    type="name"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                  <p className="font-medium text-birumuda mb-2 ">
                    Masukkan Posisi
                  </p>
                  
                  <select
                    name="Posisi"
                    onChange={handleChange("position_id")}
                    className="text-white w-full px-4 py-3 rounded-lg font-medium bg-gray-500 mb-5"
                  >
                    <option value="" disabled selected hidden>
                      Posisi
                    </option>
                    {positionData.map((position) => {
                      return <option value={position._id}>{position.code}-{position.name}</option>;
                    })}
                  </select>
                  </div>
                  <button
                    type="submit"
                    className="mx-auto bg-biru_muda text-gray-100 w-1/2 py-4 rounded-lg  transition-all duration-300 ease-in-out xl:flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">{textChange}</span>
                  </button>
                  <Link to="/employee">
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

export default Create_position;
