// src/components/NavBar.js
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "flowbite";
import { initFlowbite } from "flowbite";
import Sidebar from "./sideBar";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";
import { FaUserAlt } from 'react-icons/fa';


const NavBar = ({ onSearch, showSearch = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(GlobalContext);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    initFlowbite();
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const hiddenRoutes = ["/login", "/upload-preview", "/register"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
        <div className="flex items-center justify-between p-2 sm:p-3 px-3 sm:px-6">
          {/* Left Side: Hamburger Menu & Logo */}
          <div className="flex items-center gap-2 sm:gap-5">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Logo */}
            <Link to="/" className="flex cursor-pointer items-center gap-1 sm:gap-2">
              <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black">
                <span className="text-xs sm:text-sm font-bold leading-none text-yellow-400">hd</span>
              </div>
              <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">highway delite</span>
            </Link>
          </div>

          {/* Right Side: Search Form or Login Button */}
          <div className="flex gap-1 md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
            {showSearch && isLoggedIn ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 sm:gap-3">
                <input
                  type="text"
                  placeholder="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 sm:w-48 md:w-64 lg:w-80 rounded-md border-0 bg-gray-100 text-black px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="rounded-md bg-yellow-400 px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm text-black transition-colors hover:bg-yellow-500"
                >
                  Search
                </button>
              </form>
            ) : !isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 sm:px-6 py-2 rounded-md transition-all duration-300 text-xs sm:text-sm"
              >
                <span>Login</span>
              </button>
            ) : (
              <Link to='/profile'>
                <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <FaUserAlt className="text-yellow-400 text-lg sm:text-xl" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
