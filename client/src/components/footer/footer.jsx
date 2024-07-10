import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <div className="py-10 bg-gray-100 mt-auto">
      <div className="flex justify-center items-center gap-x-2 mb-4">
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <FaLinkedin size={24} />
        </a>
      </div>
      <p className="text-center leading-3 opacity-70">
        &copy; {currentYear} {t('footer.copyright')}
      </p>
    </div>
  );
}
