import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurentUser';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import LanguageSwitcher from '../langSwitch/LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUsername, setIsUsername] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      localStorage.setItem('currentUser', null);
      navigate('/');
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
            <span className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-white">ATF</span>
          </Link>
          <span className="text-main text-2xl sm:text-3xl lg:text-4xl text-green-500">.</span>
        </div>
        {/* Menu Items */}
        <div className="hidden sm:flex gap-4 text-white items-center md:text-xl font-medium flex-row-reverse">
        <LanguageSwitcher />
          {/* {!currentUser?.isSeller && <span className="cursor-pointer">{t('becomeSeller')}</span>} */}
          {!currentUser && (
            <Link to="/login" className="cursor-pointer">
              {t('signIn')}
            </Link>
          )}
          {!currentUser && (
            <Link to="/register" className="bg-main hover:bg-accent text-white px-4 py-2 rounded-lg">
              {t('join')}
            </Link>
          )}
          {currentUser && (
            <>
              <Link className="text-red-500 border border-red-500 px-2 py-1 hover:text-white hover:bg-red-500 rounded" onClick={handleLogout}>
                {t('logout')}
              </Link>
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-2xl cursor-pointer"
                  src={currentUser.img || '/images/no avatar.jpg'}
                  alt="Profile picture"
                  onMouseEnter={() => setIsUsername(true)}
                  onMouseLeave={() => setIsUsername(false)}
                />

                {isUsername && (
                  <p className="absolute right-0 bottom-[-50px] border border-black rounded text-white bg-main px-3 py-2">
                    {currentUser?.username}
                  </p>
                )}
              </div>
              {open && (
                <>
                  {currentUser?.isSeller && (
                    <>
                      <Link className="hover:bg-gray-300 p-2" to="/myGigs">
                        {t('myGigs')}
                      </Link>
                      <Link className="hover:bg-gray-300 p-2" to="/addGig">
                        {t('addGig')}
                      </Link>
                    </>
                  )}
                  <Link className="hover:bg-gray-300 p-2" to="/orders">
                    {t('orders')}
                  </Link>
                  <Link className="hover:bg-gray-300 p-2" to="/messages">
                    {t('messages')}
                  </Link>
                </>
              )}
            </>
          )}
        </div>
           {/* Mobile Menu Button */}
           <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <CgClose size={25} /> : <RxHamburgerMenu size={25} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
 
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col gap-4 p-4 text-white">
          <LanguageSwitcher />
          {!currentUser && (
            <Link to="/login" className="cursor-pointer">
              {t('signIn')}
            </Link>
          )}
          {!currentUser && (
            <Link to="/register" className="bg-main hover:bg-accent px-4 py-2 rounded-lg">
              {t('join')}
            </Link>
          )}
          {currentUser && (
            <div>
              <div className="flex gap-2 items-center cursor-pointer" onClick={toggleUserMenu}>
                <img
                  className="h-8 w-8 rounded-2xl"
                  src={currentUser.img || '/images/no avatar.jpg'}
                  alt="Profile picture"
                />
                <span>{currentUser?.username}</span>
              </div>
              {isUserMenuOpen && (
                <div className="mt-2 p-4 bg-white border-gray-500 border-2 rounded-lg flex flex-col gap-2 text-gray-600 w-full font-light">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs">{t('myGigs')}</Link>
                      <Link to="/addGig">{t('addGig')}</Link>
                    </>
                  )}
                  <Link to="/orders">{t('orders')}</Link>
                  <Link to="/messages">{t('messages')}</Link>
                  <Link to="/" onClick={handleLogout}>
                    {t('logout')}
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
