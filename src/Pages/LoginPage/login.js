import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import View from "../../assets/images/View.png";
import Viewoff from "../../assets/images/ViewOff.png";
import { LOGIN_API } from "../../services/Api";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [isFocused, setIsFocused] = useState([]);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(Viewoff);
  const [deviceId, setDeviceId] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const token = localStorage.getItem("token");

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

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        LOGIN_API,
        {
          email: formValues.email,
          password: formValues.pass,
          device_id: deviceId,
          device_type: "web",
          device_token: deviceToken,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        const token = res.data.usertoken;
        const userInfo = res.data.isUser;
        const status = res.data.status;

        if (status === 0) {
          let message = res.data.message;
          toast.error(message, {
            className: "sm:h-14 font-medium",
          });
        } else if (status === 2) {
          let message = res.data.message;
          toast.success(message, {
            className: "sm:h-14 font-medium",
          });
          localStorage.setItem("email", formValues.email);
          navigate("/varification");
        } else {
          let message = res.data.message;
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", userInfo.id);
          toast.success(message, {
            className: "sm:h-14 font-medium",
          });
          navigate("/doctor_list");
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || err.message || "Can't Login";
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    const generatedDeviceId = uuidv4();
    setDeviceId(generatedDeviceId);
    const generatedDeviceToken = uuidv4();
    setDeviceToken(generatedDeviceToken);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        navigate("/doctor_list");
      }
    }, 500);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-50/[.6] shadow-lg rounded-lg sm:px-10 py-10 my-auto mx-5">
          <div className="p-6  flex justify-center">
            <div className="2xl:w-96 xl:w-96 lg:w-96 md:w-96 w-full">
              <h2 className="text-center text-2xl font-semibold">
                Login to your account
              </h2>
              <p className="text-base pt-5 text-center">
                Please enter your email address and password to login your
                account.
              </p>
              <form onSubmit={(e) => handleLogin(e)}>
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
                    Login
                  </button>
                </div>
              </form>
              <p
                className="pt-6 font-semibold text-sm cursor-pointer text-[#4B89C8]"
                onClick={() => navigate("/forgot_password")}
              >
                Forgot Password?
              </p>
              <p
                className="pt-6 text-center text-sm cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                New User?{" "}
                <span className="text-[#4B89C8] font-semibold">
                  Create an account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
