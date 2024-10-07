import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FORGOT_PASS } from "../../services/Api";
import toast from "react-hot-toast";
import axios from "axios";

export default function Forgotpassword() {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handleForgotPass = (e) => {
    e.preventDefault();
    axios
      .post(
        FORGOT_PASS,
        {
          email: email,
          is_flag: "Forget Password",
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        const status = res.data.status;
        let message = res.data.message;
        if (status === 1) {
          toast.success(message, {
            className: "sm:h-14 font-medium",
          });
          navigate("/varification", {
            state: { Email: email, From: "ForgotPassword" },
          });
        } else {
          toast.error(message, {
            className: "sm:h-14 font-medium",
          });
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || err.message || "An error occurred";
        toast.error(errorMessage);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-50/[.6] shadow-lg rounded-lg sm:px-10 py-10 my-auto mx-5">
          <div className="p-6  flex justify-center">
            <div className="2xl:w-96 xl:w-96 lg:w-96 md:w-96 w-full">
              <h2 className="text-center text-2xl font-semibold ">
                Forgot Password?{" "}
              </h2>
              <p className="text-base pt-5 text-center">
                Please enter your registered email address to reset your
                password
              </p>
              <form onSubmit={handleForgotPass}>
                <div className="mt-6">
                  <div className="relative">
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      className={`bg-white block w-full px-3 py-2 rounded-xl font-medium outline-none ring-none text-sm ${
                        isFocused ? "ring-1 ring-[#4B89C8]" : "ring-0"
                      } ${email ? "pt-6" : "pt-6"}`}
                      id="email"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={(e) => handleEmail(e.currentTarget.value)}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute top-0 left-0 px-3 py-2 transition-all duration-300 flex items-center cursor-text ${
                        email || isFocused
                          ? "text-xs border-[#FF7E00] top-1 text-[#8391A1] transform -translate-y-1"
                          : "text-sm text-[#8391A1] transform translate-y-1.5"
                      }`}
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#4B89C8]	hover:bg-[#4B89C8]/[.8] text-white py-3 rounded-xl text-lg"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
