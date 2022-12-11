import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";
export default function DeleteModal(props) {
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }
  const [formData, setFormData] = useState({
    code: props.data.code,
    name: props.data.name,
    textChange: "Submit",
  });
  const { name, code, textChange } = formData;
  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    const token = getCookie("token");
    e.preventDefault();   
    if (code !=="") {
      
      if (name !=="") {
                                        

        setFormData({ ...formData, textChange: "Submitting" });

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



  return (
    <>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" transform overflow-hidden rounded-2xl bg-white p-7 w-[450px] text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-3xl mb-9 font-blod leading-6 text-black text-center"
                  >
                    Detail Appoinment
                  </Dialog.Title> */}
                  <div className="flex items-center justify-center w-full">
                    <ToastContainer />
                    <div className="p-0.5 flex   items-center justify-center rounded-xl bg-biru_tua w-full">
                      <div className="bg-hitam  rounded-2xl w-full ">
                        <div className="px-12 py-12 flex rounded-2xl   flex-col items-center justify-between w-full">
                          <p className="  text-xl mb-12 text-white">
                            Update Posisi Baru
                          </p>
                          <>
                            <form
                              className="w-full justify-center flex-1 bg-hitam text-white"
                              onSubmit={handleSubmit}
                            >
                              <div className="w-full relative ">
                                <p className="font-medium text-birumuda mb-2 ">
                                  Code Posisi
                                </p>
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
                                  onClick={closeModal}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
