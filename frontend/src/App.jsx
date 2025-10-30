import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/ProtectedRoutes"
import Login from './pages/Auth/login'
import Register from './pages/Auth/register';
import NavBar from './components/navbar/NavBar';
import Homepage from './pages/Homepage';
import Profile from './pages/dashboard/profile';
import PrivacyPolicy from './pages/footer/privacyPolicy';
import TermsConditions from './pages/footer/termsConditions';
import RefundPolicy from './pages/footer/refundPolicy';
import PageNotFound from './components/pageNotFount';
import Contact from './pages/footer/contact';
import ExperiencesHome from './pages/experiences/ExperiencesHome';
import ExperienceDetails from './pages/experiences/ExperienceDetails';
import Checkout from './pages/experiences/Checkout';
import BookingSuccess from './pages/experiences/BookingSuccess';
import BookingFailed from './pages/experiences/BookingFailed';

export default function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* <NavBar /> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/experience/:id" element={<ExperienceDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/booking-failed" element={<BookingFailed />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute> <Outlet /> </ProtectedRoute>}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-condition" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}