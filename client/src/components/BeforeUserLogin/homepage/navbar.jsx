import React from "react";
import { authenticate, isAuth } from "../../../helpers/auth";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Burger from "../../../assets/beforeLogin/Icon.svg";
const navbar = () => {
  return (
    <div className="bg-[#6fb4b1] h-16 w-screen items-center px-12 justify-between text-black flex">
      <div>Logo</div>
      <ul className="w-[45%] hidden lg:flex justify-between ">
        <li className="">Beranda</li>
        <li className="">Cara Kerja</li>

        <li className="">Tentang Kami</li>

        {!isAuth() ? (
          <>
            <li>
              <Link to="/login" className="hover:text-[#263238]">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-[#263238]">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard" className="hover:text-[#263238]">
                Dashboard
              </Link>
            </li>
          </>
        )}
      </ul>
       <div className="z-[100] lg:hidden mr-6 text-right">
      <Menu as="div" className="z-[100]  relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <img src={Burger} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link className="hover:text-[#263238]" to="">
                    <button
                      className={`${
                        active ? "bg-biru_gelap text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Home
                    </button>
                  </Link>
                )}
              </Menu.Item>
          
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#section-2"
                        className="hover:text-[#263238]"
                        to="features"
                      >
                        <button
                          className={`${
                            active
                              ? "bg-biru_gelap text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Features
                        </button>
                      </a>
                    )}
                  </Menu.Item>
                </>
              
            </div>
            <div className="px-1 py-1">
             
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#section-3"
                        className="hover:text-[#263238]"
                        to="features"
                      >
                        <button
                          className={`${
                            active
                              ? "bg-biru_gelap text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          About Us
                        </button>
                      </a>
                    )}
                  </Menu.Item>{" "}
                </>
             
              {!isAuth() ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/login">
                        <button
                          className={`${
                            active
                              ? "bg-biru_gelap text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Login
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <>
                  {" "}
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/dashboard">
                        <button
                          className={`${
                            active
                              ? "bg-biru_gelap text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Dashboard
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  

    </div>
  );
};

export default navbar;
