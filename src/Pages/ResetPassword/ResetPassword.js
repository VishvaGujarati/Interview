import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import View from "../../assets/images/View.png";
import Viewoff from "../../assets/images/ViewOff.png";
import toast from "react-hot-toast";
import { RESET_PASS } from "../../services/Api";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [isFocused, setIsFocused] = useState([]);
  const location = useLocation();
  const [passwordState, setPasswordState] = useState({
    newpass: {
      type: "password",
      icon: Viewoff,
    },
    confirm_pass: {
      type: "password",
      icon: Viewoff,
    },
  });

  let emails;
  try {
    const { Email } = location.state;
    emails = Email;
  } catch (error) {
    console.log("err", error);
  }

  const handleFocus = (e) => {
    const { name } = e.target;
    setIsFocused((prevState) => {
      const newFocusState = { ...prevState, [name]: true };
      return newFocusState;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsFocused((prevState) => {
      const newFocusState = { ...prevState, [name]: false };
      return newFocusState;
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleToggle = (field) => {
    setPasswordState((prevState) => {
      const newType =
        prevState[field].type === "password" ? "text" : "password";
      const newIcon = prevState[field].type === "password" ? View : Viewoff;
      return {
        ...prevState,
        [field]: {
          type: newType,
          icon: newIcon,
        },
      };
    });
  };

  const handleData = (e) => {
    e.preventDefault();

    if (formValues.newpass !== formValues.confirm_pass) {
      toast.error("Confirm Password Does'nt Match");
    } else {
      axios
        .post(
          RESET_PASS,
          {
            email: emails,
            password: formValues.confirm_pass,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          const status = res?.data?.status;
          let message = res.data.message;

          if (status === 1) {
            toast.success(message, {
              className: "sm:h-14 font-medium",
            });
            navigate("/");
          } else {
            toast.error(message, {
              className: "sm:h-14 font-medium",
            });
          }
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Can't Reset The Password";
          toast.error(errorMessage);
        });
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-50/[.6] shadow-lg rounded-lg sm:px-10 py-10 my-auto mx-5">
          <div className="p-6 flex justify-center">
            <div className="2xl:w-96 xl:w-96 lg:w-96 md:w-96 w-full">
              <h2 className="text-center text-2xl font-semibold">
                Reset Password
              </h2>
              <p className="text-base pt-5 text-center">
                Rediscover your account with a new Password
              </p>

              <form action="" onSubmit={handleData}>
                <div className="mt-6">
                  <div
                    className={`relative rounded-xl outline-none ring-none bg-white ${
                      isFocused.newpass ? "ring-1 ring-[#4B89C8]" : "ring-0"
                    }
                  ${
                    formValues.newpass ? "bg-indigo-100/[.6]" : "bg-[#F9FAFD]"
                  }`}
                  >
                    <div className="flex items-center justify-between rounded-xl px-3">
                      <input
                        type={passwordState.newpass.type}
                        autoComplete="off"
                        name="newpass"
                        className={`bg-white block w-full py-2 font-medium outline-none rounded-xl ring-none text-sm 
                      } ${
                        formValues.newpass
                          ? "pt-6 bg-indigo-100/[.6]"
                          : "pt-6 bg-[#F9FAFD]"
                      }`}
                        id="newpass"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleInput}
                        required
                      />
                      <span
                        className="flex items-center cursor-pointer"
                        onClick={() => handleToggle("newpass")}
                      >
                        <img
                          src={passwordState.newpass.icon}
                          className="w-6 h-6"
                          alt="toggle visibility"
                        />
                      </span>
                    </div>
                    <label
                      htmlFor="newpass"
                      className={`absolute top-0 left-0 px-3 py-2 transition-all duration-300 flex items-center cursor-text ${
                        formValues.newpass || isFocused.newpass
                          ? "text-xs border-[#FF7E00] top-1 text-[#8391A1] transform -translate-y-1"
                          : "text-sm text-[#8391A1] transform translate-y-1.5"
                      }`}
                    >
                      New Password
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <div
                    className={`relative rounded-xl outline-none ring-none bg-white ${
                      isFocused.confirm_pass
                        ? "ring-1 ring-[#4B89C8]"
                        : "ring-0"
                    }
                  ${
                    formValues.confirm_pass
                      ? "bg-indigo-100/[.6]"
                      : "bg-[#F9FAFD]"
                  }`}
                  >
                    <div className="flex items-center justify-between rounded-xl px-3">
                      <input
                        type={passwordState.confirm_pass.type}
                        autoComplete="off"
                        name="confirm_pass"
                        className={`bg-white block w-full py-2 font-medium outline-none rounded-xl ring-none text-sm 
                      } ${
                        formValues.confirm_pass
                          ? "pt-6 bg-indigo-100/[.6]"
                          : "pt-6 bg-[#F9FAFD]"
                      }`}
                        id="confirm_pass"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleInput}
                        required
                      />
                      <span
                        className="flex items-center cursor-pointer"
                        onClick={() => handleToggle("confirm_pass")}
                      >
                        <img
                          src={passwordState.confirm_pass.icon}
                          className="w-6 h-6"
                          alt="toggle visibility"
                        />
                      </span>
                    </div>
                    <label
                      htmlFor="confirm_pass"
                      className={`absolute top-0 left-0 px-3 py-2 transition-all duration-300 flex items-center cursor-text ${
                        formValues.confirm_pass || isFocused.confirm_pass
                          ? "text-xs border-[#FF7E00] top-1 text-[#8391A1] transform -translate-y-1"
                          : "text-sm text-[#8391A1] transform translate-y-1.5"
                      }`}
                    >
                      Confirm New Password
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#4B89C8] hover:bg-[#4B89C8]/[.8] text-white py-3 rounded-xl text-lg"
                  >
                    Reset
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
