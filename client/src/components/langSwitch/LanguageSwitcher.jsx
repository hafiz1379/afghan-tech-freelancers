import React, { useState } from 'react';
import i18n from 'i18next';

function LanguageSwitcher() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    const direction = lng === 'fa' ? 'rtl' : 'ltr'; // Determine text direction
    document.documentElement.dir = direction; // Set text direction
    setIsMenuOpen(false); // Close the dropdown menu after changing language
    localStorage.setItem('appLanguage', lng); // Save language preference to localStorage
    localStorage.setItem('appDirection', direction); // Save text direction preference to localStorage
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 cursor-pointer">
        <div className="dropdown">
          <button
            className="dropdown-toggle bg-transparent text-white border-none outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {i18n.language === 'en' ? 'English' : 'فارسی'}
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu absolute bg-white shadow-lg rounded-lg mt-1 w-26">
              <button
                onClick={() => changeLanguage('en')}
                className="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-200 focus:outline-none"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('fa')}
                className="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-200 focus:outline-none"
              >
                فارسی
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
