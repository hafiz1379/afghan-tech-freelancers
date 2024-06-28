import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-nav bg-opacity-80 sticky top-0 z-20">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-10 lg:px-24 xl:px-14 h-16">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <Link to="/">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-white">
              ATF
            </span>
          </Link>
          <span className="text-main text-2xl sm:text-3xl lg:text-4xl text-green-500">
            .
          </span>
        </div>
        {/* Menu Items */}
        <div className="hidden sm:flex gap-4 text-white items-center md:text-xl font-medium">
          <Link to="/" className="cursor-pointer">
            Home
          </Link>
          <span className="cursor-pointer">Become a Seller</span>
          {!currentUser?.isSeller && (
            <span className="cursor-pointer">Sign in</span>
          )}
          {!currentUser && (
            <Link
              to="/login"
              className="bg-main hover:bg-accent text-white px-4 py-2 rounded-lg"
            >
              Join
            </Link>
          )}
          {currentUser && (
            <div
              className="flex gap-2 items-center cursor-pointer relative"
              onClick={() => setOpen(!open)}
            >
              <img
                className="h-8 w-8 rounded-2xl"
                src={currentUser.img || "/images/no avatar.jpg"}
                alt="Profile picture"
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="absolute top-12 right-0 p-5 bg-white border-gray-500 border-2 rounded-lg flex flex-col gap-2 text-gray-600 w-48 font-light">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs">Gigs</Link>
                      <Link to="/addGig">Add New Gigs</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <Link onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <CgClose size={25} /> : <RxHamburgerMenu size={25} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col gap-4 p-4 text-white">
          <span className="cursor-pointer">Home</span>
          <span className="cursor-pointer">Become a Seller</span>
          {!currentUser?.isSeller && (
            <span className="cursor-pointer">Sign in</span>
          )}
          {!currentUser && (
            <Link
              to="/login"
              className="bg-main hover:bg-accent px-4 py-2 rounded-lg"
            >
              Join
            </Link>
          )}
          {currentUser && (
            <div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={toggleUserMenu}
              >
                <img
                  className="h-8 w-8 rounded-2xl"
                  src="https://avatars.githubusercontent.com/u/117447018?v=4"
                  alt="Profile picture"
                />
                <span>{currentUser?.username}</span>
              </div>
              {isUserMenuOpen && (
                <div className="mt-2 p-4 bg-white border-gray-500 border-2 rounded-lg flex flex-col gap-2 text-gray-600 w-full font-light">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs">Gigs</Link>
                      <Link to="/addGig">Add New Gigs</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
