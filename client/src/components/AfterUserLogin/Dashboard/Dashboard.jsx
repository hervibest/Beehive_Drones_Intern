import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowAltCircleLeft,
  faArrowLeft,
  faBars,
  faHome,
  faSignOutAlt,
  faTrophy,
  faUser,
  faUsers,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="px-16 xl:flex xl:align-middle rounded-xl bg-biru_muda_2">
        <div className="w-full mt-12 flex flex-col items-center xl:grid xl:grid-cols-3 gap-12">
          <Link
          //check kondisi localstorage disini ithink
          to="/position">
            <div className="p-0.5 bg-biru_gelap  rounded-2xl w-56 xl:w-56 h-72 2xl:w-72 2xl:h-[24rem]">
              <div className="bg-hitam rounded-2xl items-center align-middle pt-16 w-full h-full">
              <div className="h-32 mx-auto relative w-32">
                  <FontAwesomeIcon
                    className="h-32 mx-auto relative w-32"
                    size="lg"
                    color="white"
                    icon={faUser}
                  />{" "}
                </div>
                <p className="font   font-bold text-xl 2xl:text-2xl font-futuramd mt-5 text-center text-white">
                  Position
                </p>
              </div>
            </div>
          </Link>

          <Link to="/employee">
            <div className="p-0.5 bg-biru_gelap  rounded-2xl w-56 xl:w-56 h-72 2xl:w-72 2xl:h-[24rem]">
              <div className="bg-hitam rounded-2xl items-center align-middle pt-16 w-full h-full">
              <div className="h-32 mx-auto relative w-32">
                  <FontAwesomeIcon
                    className="h-32 mx-auto relative w-32"
                    size="lg"
                    color="white"
                    icon={faUsers}
                  />{" "}
                </div>
                <p className="font  font-bold text-xl 2xl:text-2xl  mt-5 text-center text-white">
                  Employee
                </p>
              </div>
            </div>
          </Link>

          <Link to="/sallary">
            <div className="p-0.5  bg-biru_gelap   rounded-2xl w-56 xl:w-56 h-72 2xl:w-72 2xl:h-[24rem]">
              <div className="bg-hitam rounded-2xl items-center align-middle pt-16 w-full h-full">
                <div className="h-32 mx-auto relative w-32">
                  <FontAwesomeIcon
                    className="h-32 mx-auto relative w-32"
                    size="lg"
                    color="white"

                    icon={faMoneyBill}
                  />{" "}
                </div>
                <p className="  font-bold text-xl 2xl:text-2xl font-futuramd mt-5 text-center text-white">
                  Sallary
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
