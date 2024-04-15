// import React from "react";
import { FiLogOut } from "react-icons/fi";
import { RiFolderVideoFill } from "react-icons/ri";
// import { withCookies, Cookies } from "react-cookie";
// import PropTypes from "prop-types";
import { instanceOf } from "prop-types";
import axios from "axios";
const NavBar = () => {
  const Logout = async () => {
    // props.cookies.remove("jwt-token");
    const res = await axios.post("http://127.0.0.1:8000/api/auth/logout/", "", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    res.status == 200
      ? (window.location.href = "/")
      : (window.location.href = "/video");
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
// NavBar.propTypes = {
//   cookies: PropTypes.object,
// };
// NavBar.propTypes = {
//   cookies: instanceOf(Cookies).isRequired,
// };
export default NavBar;
