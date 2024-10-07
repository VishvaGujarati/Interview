import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/LoginPage/login";
import Varification from "../Pages/varification/varification";
import Forgotpassword from "../Pages/forgotPassword/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import DoctorList from "../Pages/DoctorList/DoctorList";
import SignUp from "../Pages/signUp/signUp";
import BookAppointment from "../Pages/BookAppointment/BookAppointment";
import MainLayout from "../Components/MainLayout/MainLayout";
import ShowAppointments from "../Pages/ShowAppointments/ShowAppointments";

const RoutData = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/varification" element={<Varification />}></Route>
          <Route path="/forgot_password" element={<Forgotpassword />}></Route>
          <Route path="/reset_pass" element={<ResetPassword />}></Route>
          <Route
            path="/doctor_list"
            element={
              <MainLayout>
                <DoctorList />
              </MainLayout>
            }
          />
          <Route
            path="/book_appointment"
            element={
              <MainLayout>
                <BookAppointment />
              </MainLayout>
            }
          />
          <Route
            path="/show_appointment"
            element={
              <MainLayout>
                <ShowAppointments />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RoutData;
