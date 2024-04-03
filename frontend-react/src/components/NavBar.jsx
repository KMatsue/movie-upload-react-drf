// import React from "react";
import { FiLogOut } from "react-icons/fi";
import { RiFolderVideoFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="w-full border-b bg-primeColor border-gray-500 py-2 px-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <button className="flex items-center">
          <RiFolderVideoFill className="text-2xl mr-1" />
          <span className="text-2xl font-bold font-comic">Video-UP</span>
        </button>
        <button>
          <FiLogOut className="text-2xl" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
