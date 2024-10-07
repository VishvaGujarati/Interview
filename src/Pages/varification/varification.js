import React, { useState, useRef } from "react";
import OTPInput from "react-otp-input";
import "../../App.css";
import { RESEND_OTP, VERIFY_OTP } from "../../services/Api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  let emails;
  let path;
  try {
    const { Email, From } = location.state;
    emails = Email;
    path = From;
  } catch (error) {
    console.log("err", error);
  }

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleOtpVerification = (event) => {
    event.preventDefault();

    if (otp.length !== 4) {
      toast.error("Please enter the OTP.");
      return;
    }

    axios
      .post(
        VERIFY_OTP,
        {
          email: email,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
          if (path === "SignUp") {
            navigate("/login");
          } else if (path === "ForgotPassword") {
            navigate("/reset_pass", { state: { Email: email } });
          }
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || err.message || "An error occurred";
        toast.error(errorMessage);
      });
  };

  const handleResendOtp = () => {
    setOtp("");
    axios
      .post(
        RESEND_OTP,
        {
          email: email,
          is_flag: "Resend Otp",
        },
        {
          headers: {
            "Content-Type": "application/json",
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
        } else {
          toast.error(message);
        }

        document.querySelector('input[name="otp-input-undefined"]')?.focus();
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
          <div className="p-6">
            <div className="py-3 text-center">
              <h1 className="xl:text-[26px] text-[22px] font-semibold">
                Verification
              </h1>
              <p className="xl:text-[16px] text-[16px] mt-2">
                A 4-digit verification code has been sent to your email.
              </p>
            </div>
            <form onSubmit={handleOtpVerification}>
              <div className="flex justify-center">
                <OTPInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={4}
                  inputType="tel"
                  shouldAutoFocus="true"
                  renderInput={(props) => (
                    <input
                      {...props}
                      name={`otp-input-${props.index}`}
                      style={{
                        backgroundColor: props.value
                          ? "rgba(75,137, 200,0.1)"
                          : "rgb(255,255,255)",
                        border: props.value
                          ? "1px solid rgb(75 ,137, 200)"
                          : "",
                      }}
                      className="handleclosj custom-outline rounded-full"
                    />
                  )}
                />
              </div>

              <div className="ms-3 py-4 text-center">
                <p className="lg:text-[16px]">
                  <span className="text-[#8391A1]">
                    Didn’t receive the code?{" "}
                    <a
                      className={`font-semibold hover:text-indigo-500 cursor-pointer text-indigo-700`}
                      onClick={handleResendOtp}
                    >
                      Resend
                    </a>
                  </span>
                </p>
              </div>

              <div className="py-3 flex justify-center pb-5">
                <button
                  type="submit"
                  className="bg-[#4B89C8] hover:bg-[#4B89C8]/[.8] text-white 2xl:w-96 xl:w-96 lg:w-96 md:w-96 w-56 py-3 text-lg rounded-xl"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
