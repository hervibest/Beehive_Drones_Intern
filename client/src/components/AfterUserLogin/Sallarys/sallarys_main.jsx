import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";

const Sallarys_main = () => {
  const [sallarysData, setSallarysData] = useState([]);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = () => {
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/sallarys/paging/1/10`, {
        headers: {
          // masih bingung gunanya headers ?
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // setLoading(false);

        setSallarysData(res.data.data.results);
        console.log(sallarysData);
      })
      .catch((err) => {
        if (err.response.status === 401) {
        }
      });
  };
  return (
    <div className="w-screen h-screen bg-gray-300 justify-center flex items-center">
      <div className="w-2/3 h-2/3 p-4 gap-2 bg-blue-300">
        <div className="w-full h-12 flex  my-2 justify-between bg-gray-20"> 
        <p>Data Posisi beserta codenya </p>
        <button className="rounded-md bg-green-600 text-white my-2 h-[80%] w-1/4">Buat Posisi Baru</button>
        </div>
        {sallarysData.map((sallarys) => {
         return <div className="w-full h-12 grid grid-cols-7 my-2 justify-between bg-gray-200">
            <div className="object-center">{sallarys.basic_sallary}</div>
            <div className="object-center">{sallarys.allowance}</div>
            <div className="object-center">{sallarys.payday}</div>
            <div className="object-center">{sallarys.notes}</div>
            <div className="object-center">{sallarys.employee_id.name}</div>



            <div className="flex items-center">
                <button className="rounded-md bg-green-600 text-    white my-2 h-[80%] w-1/3">Update</button>
                <button className="rounded-md text-white ml-5 bg-red-600 my-2 h-[80%] w-1/3">Delete</button>

            </div>
        
         </div>;
        })}
      </div>
    </div>
  );
};

export default Sallarys_main;
