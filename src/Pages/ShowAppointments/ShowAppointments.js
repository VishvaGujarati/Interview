import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { CancleAppointment, ShowAppointment } from "../../services/ApiServices";
import animationData from "../../assets/images/Animation - 1728131339308.json";

export default function ShowAppointments() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getAppoinments = () => {
    ShowAppointment()
      .then((res) => {
        if (res.data.status === 1) {
          setData(res.data.data);
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

  const handleCancellation = (id) => {
    const params = {
      Appointment_id: id,
    };
    CancleAppointment(params)
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.message);
          getAppoinments();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            err.message ||
            "Failed to Cancle appointment"
        );
      });
  };

  useEffect(() => {
    getAppoinments();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!token) {
        navigate("/");
      }
    }, 500);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div
      className={` ${
        data ? "bg-white" : "bg-gray-50"
      }  flex justify-center items-center`}
    >
      <div className="xl:px-20 lg:px-10 px-5 py-10">
        {!data ? (
          <div>
            <Lottie options={defaultOptions} height={300} width={200} />
            <h2 className="text-center font-bold text-[#4B89C8] text-2xl">
              You haven't Booked Any Appointment
            </h2>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-[#4B89C8] hover:bg-[#4B89C8]/[.8] text-white py-2 px-5 rounded-xl text-lg align-middle"
                onClick={() => navigate("/book_appointment")}
              >
                Book Appointment First
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="md:text-3xl text-2xl font-bold text-center py-5">
              Your Booked Appointments
            </h2>

            <div className="py-10 grid grid-cols-12 md:gap-x-10 gap-y-10 gap-x-0">
              {data.map((item, index) => {
                return (
                  <div
                    className="bg-[#4B89C8]/[0.2] rounded-xl shadow-md 2xl:col-span-4 xl:col-span-4 md:col-span-6 col-span-12 px-5 py-5"
                    key={index}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold me-5">
                        <p>Date : </p>
                        <p>Name : </p>
                        <p>Doctor Name : </p>
                        <p>Time : </p>
                      </div>
                      <div>
                        <p>{item.date}</p>
                        <p>
                          {item.User.firstname} {item.User.lastname}
                        </p>
                        <p>{item.Doctor.name}</p>
                        <p>
                          {item.Slot.start_time} - {item.Slot.end_time}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-5">
                      <button
                        className="text-white bg-red-500 rounded-xl px-10 py-2"
                        id={item.id}
                        onClick={() => handleCancellation(item.id)}
                      >
                        Cancle Appointment
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
