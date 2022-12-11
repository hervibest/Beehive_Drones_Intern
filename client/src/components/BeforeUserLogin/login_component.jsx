import React, { useState, useEffect } from "react";
// import authSvg from '../assets/login.svg';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth } from "../../helpers/auth";
import { Link, Redirect, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginIcon from "../../assets/beforeLogin/LOGIN.svg";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth() && isAuth().role === "admin") {
      navigate("/dashboard");
    } else if (isAuth()) {
      navigate("/beranda");
    }
  });

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: "Sign In",
  });
  const { email, password1, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
          email,
          password: password1,
        })
        .then((res) => {
          // Authenticate MEMBUAT SET COOKIE TOKEN (JWT SECRET)
          setIsLoading(false);
          authenticate(res, () => {
            console.log(isAuth());

            setFormData({
              ...formData,
              email: "",
              password1: "",
              textChange: "Submitted",
            });

            if (isAuth() && isAuth().role === "admin") {
              navigate("/dashboard");
            } else {
              navigate("/beranda");
            }
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password1: "",
            textChange: "Sign In",
          });
          console.log(err.response);
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Isikan keseluruhan informasi Anda");
    }
  };
  return (
    <header className="w-full gap-2 bg-cover relative py-8 px-2 sm:px-8 bg-gradient-to-r from-[#0199A7] to-[#B4DCDA] min-h-screen grid grid-cols-1 justify-items-center">
      <ToastContainer />
      <div className="bg-gradient-to-br from-[#0199A7] to-[#B4DCDA] flex-1 h-fit rounded-3xl w-11/12 sm:w-2/3 max-w-xl p-0.5">
        <form
          onSubmit={handleSubmit}
          className=" bg-[#000000] bg-opacity-60 py-12 rounded-3xl backdrop-blur-md  md:px-16  outline-[#] outline-2  p-6  "
        >
          <div className="flex mb-10 justify-center items-center">
            <img src={LoginIcon} className=""></img>
          </div>
          <div className="w-full   text-center">
            {/* <img src={Logintitle} className="h-8 mx-auto"></img> */}
          </div>
          <div className="text-base text-white h-4 my-2 flex gap-2">
            {/* <img src={emailicon} className="w-6"></img> */}
            <div className="content-center h-full grid">Email</div>
          </div>
          <input
            className=" text-gray-500  bg-opacity-50 bg-[#3B3C5A] p-3  text-base w-full under focus:outline-none placeholder:text-gray-400 "
            placeholder="Enter your email address"
            onChange={handleChange("email")}
            value={email}
          ></input>

          <div className="text-base text-white h-4 my-2 flex gap-2 mt-4">
            {/* <img src={passwordicon} className="w-6"></img> */}
            <div className="content-center h-full grid">Password</div>
          </div>

          <input
            type={"password"}
            className=" text-gray-500  bg-[#3B3C5A] bg-opacity-50 p-3  text-base w-full under focus:outline-none placeholder:text-gray-400 "
            placeholder="Enter your password"
            onChange={handleChange("password1")}
            value={password1}
          ></input>

          <div className=" h-7"></div>

          <div className=" mx-auto w-full text-center">
            <button
              type="submit"
              className=" my-4 bg-birumuda  w-full text-center mx-auto px-10 py-2  text-white transform transition duration-300 scale-100 hover:opacity-75 "
            >
              <h1 className="text-white  text-base font-futuramd ">Login</h1>
            </button>
            <div className="text-center font-futuramd text-gray-400 text-base ">
              <p className="inline"> Don't have an account ? </p>
              <Link
                className="inline font-bold hover:text-putih text-white transition duration-300"
                to="/register"
              >
                Sign Up
              </Link>
              <Link
                className="hover:text-putih transition text-white duration-300"
                to="/forgetpassword"
              >
                <p>Forget password?</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Login;
