import React from 'react';
import { useState } from 'react';
import newRequest from '../../utils/newRequest';
import Loading from '../../components/Loading/Loading';
import uploead from '../../utils/upload';
import { useNavigate } from 'react-router-dom';

function Register() {
  // State to hold the selected file
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State to hold user information
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
  });

  const navigate = useNavigate();

  // Function to handle input changes for text fields
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Function to handle checkbox change for seller status
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const url = await uploead(file);
      await newRequest.post('auth/register', {
        ...user,
        img: url,
      });
      const res = await newRequest.post('auth/login', { username: user.username, password: user.password });
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
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="lg:flex lg:space-x-16">
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold">Create a new account</h1>
            <div className="space-y-2">
              <label htmlFor="username" className="block">
                Username
              </label>
              <input
                required
                type="text"
                name="username"
                placeholder="Type your username"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="Type your email address."
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                placeholder="Enter a password"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="img" className="block">
                Profile Picture
              </label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full border rounded p-2" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Type your phone Number"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            {/* <div className="space-y-2">
              <label htmlFor="country" className="block">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="country"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div> */}
          </div>

          {/* ************ */}
          {/* RIGHT COLUMN */}
          {/* ************ */}
          <div className="lg:w-1/2 space-y-4 mt-12 lg:mt-0">
            <h1 className="text-2xl font-bold">I want to become a seller</h1>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label htmlFor="isSeller" className="block">
                  Activate the seller account
                </label>
                <input type="checkbox" name="isSeller" onChange={handleSeller} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="desc" className="block">
                Description
              </label>
              <textarea
                name="desc"
                placeholder="A short description of yourself"
                cols="30"
                rows="10"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              ></textarea>
              <button type="submit" className="block w-full bg-green-500 text-white py-2 rounded">
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
