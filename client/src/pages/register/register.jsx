import React from 'react';
import { useState } from 'react';
import newRequest from '../../utils/newRequest';
import uploead from '../../utils/upload';
import { useNavigate } from 'react-router-dom';
import { Label, Loading } from '../../components/UtilComponents/Utils';

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
  const confirmed = user.username && user.email && user.password;

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
    e.preventDefault();
    try {
      setIsLoading(true);
      const url = await uploead(file);
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
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="lg:flex lg:space-x-16">
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold">Create a new account</h1>
            <div className="space-y-2">
              <Label htmlFor="username" required>
                Username
              </Label>
              <input
                id="username"
                required
                type="text"
                name="username"
                placeholder="Type your username"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" required>
                Email
              </Label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Type your email address."
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" required>
                Password
              </Label>
              <input
                required
                id="password"
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
              <Label htmlFor="phone" className="block">
                Phone Number
              </Label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Type your phone Number"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
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
              <button
                type="submit"
                disabled={!confirmed}
                className={`block w-full py-2 rounded  text-white ${
                  confirmed ? 'bg-green-500 cursor-pointer' : 'bg-gray-300 cursor-default'
                }`}
              >
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
