import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import View from "../../assets/images/View.png";
import Viewoff from "../../assets/images/ViewOff.png";
import toast from "react-hot-toast";
import { SIGN_UP_API } from "../../services/Api";
import axios from "axios";
export default function SignUp() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(Viewoff);
  const [isFocused, setIsFocused] = useState([]);

  const handleFocus = (e) => {
    const { name } = e.target;
    setIsFocused((prevState) => {
      const newFocusState = [...prevState];
      newFocusState[name] = true;
      return newFocusState;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsFocused((prevState) => {
      const newFocusState = [...prevState];
      newFocusState[name] = false;
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

  const handleToggle = () => {
    if (type === "password") {
      setIcon(View);
      setType("text");
    } else {
      setIcon(Viewoff);
      setType("password");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post(
        SIGN_UP_API,
        {
          email: formValues.email,
          password: formValues.pass,
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

        if (status === 0) {
          toast.error(message, {
            className: "sm:h-14 font-medium",
          });
        } else {
          localStorage.setItem("email", formValues.email);
          toast.success(message, {
            className: "sm:h-14 font-medium",
          });
          navigate("/varification", {
            state: { Email: formValues.email, From: "SignUp" },
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
          <div className="p-6 flex justify-center">
            <div className="2xl:w-96 xl:w-96 lg:w-96 md:w-96 w-full">
              <h2 className="text-center text-2xl font-semibold ">
                Explore the app
              </h2>
              <p className="text-base pt-5 text-center">
                Please enter your email address and password to create your
                account.
              </p>
              <form onSubmit={handleSignUp}>
                <div className="mt-6">
                  <div className="relative">
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      required
                      className={`bg-white block w-full px-3 py-2 rounded-xl font-medium outline-none ring-none text-sm ${
                        isFocused.email ? "ring-1 ring-[#4B89C8]" : "ring-0"
                      } ${
                        formValues.email
                          ? "pt-6 bg-indigo-100/[.6]"
                          : "pt-6 bg-[#F9FAFD]"
                      }`}
                      id="email"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={(e) => handleInput(e)}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute top-0 left-0 px-3 py-2 transition-all duration-300 flex items-center cursor-text ${
                        formValues.email || isFocused.email
                          ? "text-xs border-[#FF7E00] top-1 text-[#8391A1] transform -translate-y-1"
                          : "text-sm text-[#8391A1] transform translate-y-1.5"
                      }`}
                    >
                      Email Address
                    </label>
                  </div>
                </div>
                <div className="mt-6">
                  <div
                    className={`relative rounded-xl outline-none ring-none bg-white ${
                      isFocused.pass ? "ring-1 ring-[#4B89C8]" : "ring-0"
                    } ${
                      formValues.pass ? "bg-indigo-100/[.6]" : "bg-[#F9FAFD]"
                    }`}
                  >
                    <div className="flex items-center justify-between rounded-xl px-3">
                      <input
                        type={type}
                        autoComplete="off"
                        name="pass"
                        required
                        className={`bg-white block w-full py-2 font-medium outline-none rounded-xl ring-none text-sm ${
                          formValues.pass
                            ? "pt-6 bg-indigo-100/[.6]"
                            : "pt-6 bg-[#F9FAFD]"
                        }`}
                        id="pass"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => handleInput(e)}
                      />
                      <span
                        className="flex items-center"
                        onClick={handleToggle}
                      >
                        <img src={icon} className="w-6 h-6" alt="" />
                      </span>
                    </div>
                    <label
                      htmlFor="pass"
                      className={`absolute top-0 left-0 px-3 py-2 transition-all duration-300 flex items-center cursor-text ${
                        formValues.pass || isFocused.pass
                          ? "text-xs border-[#FF7E00] top-1 text-[#8391A1] transform -translate-y-1"
                          : "text-sm text-[#8391A1] transform translate-y-1.5"
                      }`}
                    >
                      Password
                    </label>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#4B89C8] hover:bg-[#4B89C8]/[.8] text-white py-3 rounded-xl text-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <p
                className="pt-6 text-center text-sm cursor-pointer"
                onClick={() => navigate("/")}
              >
                Already have an account?{" "}
                <span className="text-[#4B89C8] font-semibold">Log In</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
