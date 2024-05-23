import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
  };

  return (
    <nav className="w-full bg-nav bg-opacity-80 sticky top-0">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56 h-16">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <Link to="/">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-white">ATF</span>
          </Link>
          <span className="text-main text-2xl sm:text-3xl lg:text-4xl text-green-500">.</span>
        </div>
        {/* Menu Items */}
        <div className="hidden sm:flex gap-4 text-white items-center md:text-xl font-medium" onClick={() => setOpen(!open)}>
          <span className="cursor-pointer">Home</span>
          <span className="cursor-pointer">Become a Seller</span>
          {!currentUser?.isSeller && <span className="cursor-pointer">Sign in</span>}
          {!currentUser && <button className="bg-main hover:bg-accent text-white px-4 py-2 rounded-lg">Join</button>}
          {currentUser && (
            <div className="flex gap-2 items-center cursor-pointer relative">
              <img className="h-8 w-8 rounded-2xl" src="" alt="" />
              <span>{currentUser?.username}</span>
              {open && <div className="absolute top-12 right-0 p-5 bg-white border-gray-500 border-2 rounded-lg flex flex-col gap-2 text-gray-600 w-48 font-light">
                {
                  currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs">Gigs</Link>
                      <Link to="/addGig">Add New Gigs</Link>
                    </>
                  )
                }
                <Link to="/orders">Orders</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/">Logout</Link>
              </div>}
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
          {!currentUser?.isSeller && <span className="cursor-pointer">Sign in</span>}
          {!currentUser && <button className="bg-main hover:bg-accent px-4 py-2 rounded-lg">Join</button>}
          {currentUser && (
            <div>
              <div className="flex gap-2 items-center cursor-pointer" onClick={toggleUserMenu}>
                <img className="h-8 w-8 rounded-2xl" src="" alt="" />
                <span>{currentUser?.username}</span>
              </div>
              {isUserMenuOpen && (
                <div className="mt-2 p-4 bg-white border-gray-500 border-2 rounded-lg flex flex-col gap-2 text-gray-600 w-full font-light">
                  {
                  currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs">Gigs</Link>
                      <Link to="/addGig">Add New Gigs</Link>
                    </>
                  )
                }
                <Link to="/orders">Orders</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/">Logout</Link>
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
