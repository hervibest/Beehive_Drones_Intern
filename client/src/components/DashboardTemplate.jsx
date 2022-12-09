import React, { useState, useEffect } from "react";


import { ToastContainer, toast } from "react-toastify";

import { isAuth, Terupdate } from "../helpers/auth";
import { Link, useNavigate } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";
// import {gapi } from 'gapi-script';

import { signout, isAdmin } from "../helpers/auth";


import { getCookie } from "../helpers/auth";
import {
  faArrowAltCircleLeft,
  faArrowLeft,
  faBars,
  faHome,
  faSignOutAlt,
  faTrophy,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardTemplate = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",

  });
  const navigate = useNavigate();
  useEffect(() => {
    loadProfile();

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProfile = () => {
    
        const { name, email } = isAuth();
        setFormData({ ...formData, name, email });

  };
  const { name, email, link_profil } = formData;

  return (
    <div className="text-gray-900 flex justify-center font-futuramd bg-gradient-to-b  from-biru to-ungu ">
      <ToastContainer />
      {/*Big Screen Display*/}
      <div className="w-full hidden xl:flex min-h-screen">
        {/*Sidebar*/}
        <div className=" h-full w-1/4 flex justify-center ">
          <div className=" flex flex-col justify-start p-12 pb-20 h-full  w-full bg-[#162F3D] items-center">
            <div className="w-36 h-36 rounded-full my-8 bg-slate-300">

            </div>
            <h1 className=" text-xl font-bold font-futuramd text-center text-birumuda">
              {name}
            </h1>
            <p className="text-white text-xs lg:text-base text-center text-clip">
              {email}{" "}
            </p>
            <button
              onClick={() => {
                signout(() => {
                  navigate("/");
                  toast.success("Berhasil keluar");
                });
              }}
              className=" hover:scale-110 transition-all my-8 py-2 px-6 shadow-lg font-futuramd rounded-lg text-birumuda border-2 border-birumuda shadow-nesco-orange/25 hover:bg-white"
             
            >
              <h1 className=" font-futuramd text-lg">Sign Out</h1>
            </button>
            <ul className=" w-full">
              <SidebarElement
                icon={faHome}
                link={!isAdmin() ? "/beranda" : "/admin"}
                title={!isAdmin() ? "Beranda" : "Lomba Admin"}
              />
              <SidebarElement
                icon={faUser}
                link={!isAdmin() ? "/profil" : "/profil"}
                title="Profil"
              />
              {!isAdmin() ? (
                <SidebarElement
                  icon={faUsers}
                  link="/datatim"
                  title="Profil Tim"
                />
              ) : null}
              
              {/* <SidebarElement icon={faUsers} link="/authwebinar" title="Webinar"/> */}
            </ul>
            <div className=" flex-grow"></div>
            <Link
              to="/"
              className="flex text-white hover:text-nesco-text-purple transition-all"
            >
              <FontAwesomeIcon className="" size="lg" icon={faArrowLeft} />
              <p className="mx-4 lg:text-base text-clip">
                back to homepage
              </p>
            </Link>
          </div>
        </div>

        <div className="w-3/4 px-16 bg-[#DDEFEE]  items-center pt-24  align-middle my-auto h-full">
          
          <div className=" bg-transparent shadow sm:rounded-lg flex justify-center lg:h-4/5 lg:max-h-[90vh] overflow-y-clip ">
            {/* Content*/}
            {props.content}
            {/*End of Content*/}
          </div>
        </div>
      </div>

      {/*Small Screen Display*/}
      <div className="w-full min-h-screen xl:hidden flex-row justify-center object-center">
        {/*Navbar for Small Screen*/}
        <div className="w-full h-16 bg-gradient-to-b  from-[#04102d] z-[100] to-[#122857] flex justify-between px-8 items-center align-middle">
          <div className="flex">

            <h1 className="text-2xl text-white px-3 align-middle h-full">
              Office App
            </h1>
          </div>
          <div className=" z-[100]">
            <Menu>
              <Menu.Button>
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-white hover:text-nesco-text-purple transition-colors text-2xl"
                />
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  as="ul"
                  className="text-nesco-text-purple z-[100] absolute bg-gradient-to-b from-nesco-cyan to-nesco-blue right-5 p-2 m-2 rounded-lg"
                >
                  <SidebarElement
                    icon={faHome}
                    link={!isAdmin() ? "/beranda" : "/admin"}
                    title="Beranda"
                  />
                  <SidebarElement
                    icon={faUser}
                    link={!isAdmin() ? "/profil" : "/profiladmin"}
                    title="Profil"
                  />
                  {!isAdmin() ? (
                    <SidebarElement
                      icon={faUsers}
                      link="/datatim"
                      title="Profil Tim"
                    />
                  ) : null}

                  <li className=" my-4 flex w-full justify-start text-center align-middle items-center">
                    <div className=" w-10 mx-3">
                      <FontAwesomeIcon
                        className="text-white"
                        size="lg"
                        icon={faSignOutAlt}
                      />
                    </div>
                    <button
                      onClick={() => {
                        signout(() => {
                          navigate("/");
                          toast.success("Berhasil keluar");
                        });
                      }}
                      className=" mx-2 text-white text-md hover:text-nesco-text-purple transition-colors "
                    >
                      Sign Out
                    </button>
                  </li>
                  <SidebarElement
                    icon={faArrowAltCircleLeft}
                    link="/"
                    title="Halaman Utama"
                  />
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

      

        <div className=" bg-transparent shadow mt-24 rounded-lg flex justify-center mx-8 mb-12 pb-8 sm:w-4/5 sm:mx-auto">
          {/* Content*/}
          {props.content}
          {/*End of Content*/}
        </div>
      </div>
    </div>
  );
};

const SidebarElement = (props) => {
  return (
    <li className="">
      <Link
        to={props.link}
        className="text-white text-md hover:text-nesco-text-purple transition-colors  my-4 flex w-full justify-start text-center align-middle items-center"
      >
        <div className=" w-10 mx-3">
          <FontAwesomeIcon className="" size="lg" icon={props.icon} />
        </div>
        <p className=" mx-2 ">{props.title}</p>
      </Link>
    </li>
  );
};

export default DashboardTemplate;
