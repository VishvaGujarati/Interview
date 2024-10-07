import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { bookAppointment } from "../../services/ApiServices";
import { PhoneInput } from "react-international-phone";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formValues, setFormValues] = useState({});
  const [isFocused, setIsFocused] = useState([]);
  const [isOpen, setIsOpen] = useState();
  const [slotId, setSlotId] = useState();
  const dropdownRef = useRef();
  const [phoneData, setPhoneData] = useState({
    number: "",
    countryCode: "us",
    dialCode: "1",
    inputValue: "",
  });

  let doctor;
  let slots;
  try {
    const { Id, Slot } = location.state;
    doctor = Id;
    slots = Slot;
  } catch (error) {
    console.log("err", error);
  }

  const handlePhoneChange = (phone, countryCode) => {
    const userInput = phone
      .replace(`+${countryCode.country.dialCode}`, " ")
      .trim();
    setPhoneData({
      number: phone,
      countryCode: countryCode.country.iso2,
      dialCode: countryCode.country.dialCode,
      inputValue: userInput,
    });
  };

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

  const handleSlot = (e) => {
    setSlotId(e.id);
    formValues.slot = e.getAttribute("value");
    toggleDropdown();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      doctor_id: doctor,
      date: formValues.date,
      slot_id: slotId,
      country_code: "+" + phoneData.dialCode,
      iso_code: phoneData.countryCode,
      phone_no: phoneData.inputValue,
      firstname: formValues.fname,
      lastname: formValues.lname,
    };

    bookAppointment(params)
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to book appointment"
        );
      });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!token) {
        navigate("/login");
      }
    }, 500);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="bg-gray-50 py-10">
      <h1 className="text-center text-[#4B89C8] font-bold pb-5 text-4xl">
        Book Appointment
      </h1>
      <p className="text-center pb-10 text-lg font-semibold">
        Book an appointment at Our Hospitals by filling the form below. <br />{" "}
        Our representative will get back to you at the earliest.
      </p>
      <div className="2xl:px-64 lg:px-20 px-5 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="col-span-12 md:col-span-6">
              <div className="relative">
                <input
                  type="text"
                  autoComplete="off"
                  name="fname"
                  required
                  className={`bg-white block w-full px-3 py-2 rounded-xl font-medium outline-none ring-none text-sm ${
                    isFocused.fname ? "ring-1 ring-[#4B89C8]" : "ring-0"
                  } ${
                    formValues.fname
                      ? "pt-6 bg-indigo-100/[.6]"
                      : "pt-6 bg-[#F9FAFD]"
                  }`}
                  id="fname"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => handleInput(e)}
                />
                <label
                  htmlFor="fname"
                  className={`absolute top-0 left-0 px-3 py-2 transition-all duration-300 flex items-center cursor-text ${
                    formValues.fname || isFocused.fname
                      ? "text-xs border-[#FF7E00] top-1 text-[#8391A1] transform -translate-y-1"
                      : "text-sm text-[#8391A1] transform translate-y-1.5"
                  }`}
                >
                  First Name
                </label>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="relative">
                <input
                  type="text"
                  autoComplete="off"
                  name="lname"
                  required
                  className={`bg-white block w-full px-3 py-2 rounded-xl font-medium outline-none ring-none text-sm ${
                    isFocused.lname ? "ring-1 ring-[#4B89C8]" : "ring-0"
                  } ${
                    formValues.lname
                      ? "pt-6 bg-indigo-100/[.6]"
                      : "pt-6 bg-[#F9FAFD]"
                  }`}
                  id="lname"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => handleInput(e)}
                />
                <label
                  htmlFor="lname"
                  className={`absolute top-0 left-0 px-3 py-2 transition-all duration-300 flex items-center cursor-text ${
                    formValues.lname || isFocused.lname
                      ? "text-xs border-[#FF7E00] top-1 text-[#8391A1] transform -translate-y-1"
                      : "text-sm text-[#8391A1] transform translate-y-1.5"
                  }`}
                >
                  Last Name
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="mt-6 col-span-12 md:col-span-6">
              <PhoneInput
                defaultCountry="us"
                value={phoneData.number}
                onChange={handlePhoneChange}
                className="block w-full rounded-xl bg-white shadow-sm focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mt-6 col-span-12 md:col-span-6">
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
                  Email
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="mt-6 col-span-12 md:col-span-6">
              <input
                type="date"
                autoComplete="off"
                name="date"
                required
                className={`uppercase datepicker bg-white block w-full px-3 py-3.5 rounded-xl font-medium outline-none ring-none text-sm ${
                  isFocused.date ? "ring-1 ring-[#4B89C8]" : "ring-0"
                } ${formValues.date ? "bg-indigo-100/[.6]" : "bg-[#F9FAFD]"}`}
                id="date"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div
              ref={dropdownRef}
              className={`multi-select-dropdown bg-white rounded-xl col-span-12 md:col-span-6 mt-5 ${
                isOpen ? "outline outline-1 outline-[#4B89C8] " : "outline-none"
              }`}
            >
              <div
                className="flex justify-between items-center cursor-pointer px-3 py-3.5"
                onClick={toggleDropdown}
              >
                <span
                  className={`text-sm truncate ${
                    formValues.slot ? "text-black" : "text-[#8391A1]"
                  }`}
                >
                  {formValues.slot || "Select TimeSlot"}
                </span>
                <button type="button">
                  {isOpen ? (
                    <FiChevronUp className="text-[#A1A1A1]" />
                  ) : (
                    <FiChevronDown className="text-[#A1A1A1]" />
                  )}
                </button>
              </div>

              {isOpen && (
                <div
                  className="dropdown-menu w-full rounded-lg text-sm"
                  id="slot"
                  name="slot"
                >
                  {slots.map((item, index) => (
                    <label
                      className={`hover:bg-[#4B89C8] hover:text-white ${
                        index === 0
                          ? "rounded-t-lg"
                          : index === slots.length - 1
                          ? "rounded-b-lg"
                          : "rounded-none"
                      }`}
                      value={item.start_time + "-" + item.end_time}
                      onClick={(e) => handleSlot(e.currentTarget)}
                      id={item.id}
                      key={index}
                    >
                      {item.start_time} - {item.end_time}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className=" bg-[#4B89C8] hover:bg-[#4B89C8]/[.8] text-white py-3 rounded-xl text-lg w-52 "
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
