import React, { useState } from 'react';
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import { useNavigate } from 'react-router-dom';
import { Label, Loading } from '../../components/UtilComponents/Utils';
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation();

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
  });
  const confirmed = user.username && user.email && user.password;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const url = await upload(file);
      await newRequest.post('auth/register', {
        ...user,
        img: url,
      });
      const res = await newRequest.post('auth/login', { username: user.username, password: user.password });
      console.log(res);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container mx-auto p-4 lg:px-14">
      <form onSubmit={handleSubmit} className="space-y-8 space-x-6">
        <div className="lg:flex lg:gap-x-16">
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold">{t('createAccount')}</h1>
            <div className="space-y-2">
              <Label htmlFor="username" required>
                {t('username')}
              </Label>
              <input
                id="username"
                required
                type="text"
                name="username"
                placeholder={t('typeUsername')}
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" required>
                {t('email')}
              </Label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder={t('typeEmail')}
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" required>
                {t('password')}
              </Label>
              <input
                required
                id="password"
                type="password"
                name="password"
                placeholder={t('enterPassword')}
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="img" className="block">
                {t('profilePicture')}
              </label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full border rounded p-2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="block">
                {t('phoneNumber')}
              </Label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder={t('typePhoneNumber')}
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="lg:w-1/2 space-y-4 mt-12 lg:mt-0">
            <h1 className="text-2xl font-bold">{t('becomeSeller')}</h1>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label htmlFor="isSeller" className="block">
                  {t('activateSeller')}
                </label>
                <input type="checkbox" name="isSeller" onChange={handleSeller} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="desc" className="block">
                {t('description')}
              </label>
              <textarea
                name="desc"
                placeholder={t('typeDescription')}
                cols="30"
                rows="10"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              ></textarea>
              <button
                type="submit"
                disabled={!confirmed}
                className={`block w-full py-2 rounded text-white ${confirmed ? 'bg-green-500 cursor-pointer' : 'bg-gray-300 cursor-default'}`}
              >
                {t('register')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
