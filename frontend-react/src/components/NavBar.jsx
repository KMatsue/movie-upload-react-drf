// import React from "react";
import { FiLogOut } from "react-icons/fi";
import { RiFolderVideoFill } from "react-icons/ri";

import axios from "../plugins/axios";

const NavBar = () => {
  const Logout = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/auth/logout/", "", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    res.status == 200
      ? (window.location.href = "/login")
      : (window.location.href = "/");
  };

  return (
    <nav className="w-full border-b bg-primeColor border-gray-500 py-2 px-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <button className="flex items-center">
          <RiFolderVideoFill className="text-2xl mr-1" />
          <span className="text-2xl font-bold font-comic">Video-UP</span>
        </button>
        <button onClick={() => Logout()} className="flex items-center">
          <FiLogOut className="text-xl" />
          <span className="">ログアウト</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
