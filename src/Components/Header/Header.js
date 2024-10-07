import React, { useEffect, useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../services/ApiServices";
import toast from "react-hot-toast";

export default function Header() {
  const [isOpen2, setIsOpen2] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleDropdown = () => {
    setIsOpen2(!isOpen2);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen2(false);
    }
  };
  const handleLogout = () => {
    LogOut()
      .then((res) => {
        localStorage.removeItem("token");
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || err.message || "An error occurred";
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (isOpen2) {
          navigate("/");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen2]);

  return (
    <div className="flex gap-5 justify-between md:justify-end items-center py-5 xl:px-20 lg:px-10 px-5 bg-[#4B89C820]">
      <button
        type="submit"
        className="bg-[#4B89C8] hover:bg-[#4B89C8]/[.8] text-white py-2 px-5 rounded-xl text-lg align-middle"
        onClick={() => navigate("/show_appointment")}
      >
        My Appointments
      </button>
      <div className="cursor-pointer" ref={dropdownRef}>
        <img
          src={logo}
          className="rounded-full h-12 w-12 object-cover"
          alt=""
          onClick={handleDropdown}
        />
        {isOpen2 && (
          <div className="absolute right-0 mt-2 xl:mx-20 lg:mx-10 mx-5 w-48 bg-white border border-[#4B89C8] rounded-lg shadow-lg z-50">
            <ul className=" text-left">
              <li
                className="px-4 py-2 cursor-pointer flex items-center gap-x-2"
                onClick={handleLogout}
              >
                <span>
                  <CiLogout />
                </span>
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
