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
            console.log(res);
          })
          .catch((err) => {

          });
     
  };
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    console.log(e.target.value);
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
