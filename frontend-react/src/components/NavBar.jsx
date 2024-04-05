// import React from "react";
import { FiLogOut } from "react-icons/fi";
import { RiFolderVideoFill } from "react-icons/ri";
import { withCookies, Cookies } from "react-cookie";
// import PropTypes from "prop-types";
import { instanceOf } from "prop-types";

const NavBar = (props) => {
  const Logout = () => {
    props.cookies.remove("jwt-token");
    window.location.href = "/";
  };

  return (
    <nav className="w-full border-b bg-primeColor border-gray-500 py-2 px-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <button className="flex items-center">
          <RiFolderVideoFill className="text-2xl mr-1" />
          <span className="text-2xl font-bold font-comic">Video-UP</span>
        </button>
        <button onClick={() => Logout()}>
          <FiLogOut className="text-2xl" />
        </button>
      </div>
    </nav>
  );
};
// NavBar.propTypes = {
//   cookies: PropTypes.object,
// };
NavBar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};
export default withCookies(NavBar);
