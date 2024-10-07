import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import animationData from "../../assets/images/Animation - 1728131748862.json";
import "react-loading-skeleton/dist/skeleton.css";
import noImage from "../../assets/images/placeholder.jpg";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BASE_URL } from "../../services/Api";
import toast from "react-hot-toast";
import { getDashboardApi } from "../../services/ApiServices";

export default function DoctorList() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [post, setPost] = useState("");
  const [name, setName] = useState("");
  const [pImg, setPImg] = useState("");
  const [about, setAbout] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const renderPaginationButtonss = () => {
    const buttons = [];

    if (totalPage <= 10) {
      const startPage = Math.max(1, pageNo - 1);
      const endPage = Math.min(totalPage, pageNo + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              i === pageNo
                ? "py-0.5 px-2 sm:px-4 sm:py-2 bg-[#4B89C8] rounded-md text-white"
                : "py-0.5 px-2 sm:px-4 sm:py-2"
            }
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= Math.min(3, totalPage); i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              i === pageNo
                ? "py-0.5 px-2.5 sm:px-4 sm:py-2 bg-[#4B89C8] rounded-md text-white"
                : "py-0.5 px-2.5 sm:px-4 sm:py-2 "
            }
          >
            {i}
          </button>
        );
      }

      if (totalPage > 10 && pageNo > 4) {
        buttons.push(
          <span key="start-ellipsis" className="px-1 sm:px-2">
            ...
          </span>
        );
      }

      if (pageNo > 3 && pageNo < totalPage - 2) {
        buttons.push(
          <button
            key={pageNo}
            onClick={() => handlePageChange(pageNo)}
            className="py-0.5 px-2.5 sm:px-4 sm:py-2 bg-[#4B89C8] rounded-md text-white"
          >
            {pageNo}
          </button>
        );
      }

      if (totalPage > 10 && pageNo < totalPage - 3) {
        buttons.push(
          <span key="end-ellipsis" className="px-1 sm:px-2">
            ...
          </span>
        );
      }

      for (let i = Math.max(totalPage - 2, 4); i <= totalPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              i === pageNo
                ? "py-0.5 px-2.5 sm:px-4 sm:py-2 bg-[#4B89C8] rounded-md text-white"
                : "py-0.5 px-2.5 sm:px-4 sm:py-2 "
            }
          >
            {i}
          </button>
        );
      }
    }

    return buttons;
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPage) {
      setPageNo(page);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen2(false);
    }
  };

  const getDoctor = () => {
    const params = { page: pageNo };
    getDashboardApi(params)
      .then((res) => {
        if (res.data.status === 1) {
          setData(res.data.data);
          setTotalPage(res.data.totalPages);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || err.message || "An error occurred";
        toast.error(errorMessage);
      });
  };

  const handleShowDetailS = (doctor) => {
    setPost(doctor.specialization);
    setName(doctor.name);
    setPImg(BASE_URL + "/" + doctor.profile_image);
    setAbout(doctor.about);
    setIsOpen1(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    getDoctor();
  }, [pageNo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!token) {
        navigate("/login");
      }
    }, 500);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="bg-gray-50">
      <div className="xl:px-20 lg:px-10 px-5 py-10">
        <h2 className="md:text-3xl text-2xl font-bold text-center py-5">
          Verified Doctors for General Eye Treatment
        </h2>
        <div className="py-10 grid grid-cols-12 md:gap-x-10 gap-y-10 gap-x-0">
          {data.map((item, index) => {
            return (
              <div
                className="bg-white rounded-xl shadow-md 2xl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12 cursor-pointer hover:scale-105 ease-in-out duration-300"
                key={index}
                onClick={() => handleShowDetailS(item)}
              >
                <div className="w-full">
                  <img
                    src={BASE_URL + "/" + item.profile_image}
                    alt=""
                    className="w-full h-full object-cover rounded-xl rounded-b-none"
                  />
                </div>

                <div className="p-2 text-center">
                  <p className="text-lg py-2">{item.name}</p>
                  <p className="text-lg font-semibold">{item.specialization}</p>
                </div>
                <div className="flex justify-center items-center mt-2 mb-5">
                  <button
                    type="submit"
                    className="bg-[#4B89C8] hover:bg-[#4B89C8]/[.8] text-white py-2 px-5 rounded-xl text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/book_appointment", {
                        state: { Id: item.id, Slot: item.Slots },
                      });
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end items-center cursor-pointer my-5">
          <p
            onClick={() => handlePageChange(pageNo - 1)}
            disabled={pageNo === 1}
          >
            <FiChevronLeft />
          </p>
          <div className="flex items-center mx-1 sm:mx-2">
            {renderPaginationButtonss()}
          </div>
          <p
            onClick={() => handlePageChange(pageNo + 1)}
            disabled={pageNo === totalPage}
          >
            <FiChevronRight />
          </p>
        </div>

        <Dialog
          open={isOpen1}
          onClose={() => {
            setIsOpen1(false);
          }}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-3/5 w-full 2xl:mx-12 lg:mx-0 md:mx-20 sm:mx-16 space-y-4 border bg-white rounded-xl shadow-lg pt-2 pb-10">
              <DialogTitle className="font-bold justify-end flex px-2">
                <button
                  className="text-gray-600"
                  onClick={() => setIsOpen1(false)}
                >
                  <IoIosClose size={30} />
                </button>
              </DialogTitle>
              <Description>
                <img
                  alt="user-profile"
                  src={pImg || noImage}
                  className="h-60 w-full flex justify-center items-center object-contain"
                />
                <div className="flex justify-between items-center px-5 py-5 bg-[#4B89C8] text-white">
                  <p className="font-semibold text-lg text-center">{name}</p>
                  <p className="font-semibold text-lg text-center">{post}</p>
                </div>
                <div className="pt-5 px-5">
                  <p className="text-justify">{about}</p>
                </div>
              </Description>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
