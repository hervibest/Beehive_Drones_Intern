import React from "react";

const navbar = () => {
  return (
    <div className="bg-[#DDEFEE] h-16 w-screen items-center px-12 justify-between text-black flex">
      <div>LOGO BOS</div>
      <div className="w-[30%] justify-between flex">
        <div className="">Beranda</div>
        <div className="">Cara Kerja</div>

        <div className="">Tentang Kami</div>

        <div className="">Sign In</div>

      </div>
    </div>
  );
};

export default navbar;
