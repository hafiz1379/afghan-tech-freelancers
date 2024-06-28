import React from "react";
import { useState } from "react";

function Register() {
  // State to hold the selected file
  const [file, setFile] = useState(null);

  // State to hold user information
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  // Function to handle input changes for text fields
  const handleChange = (e) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      console.log(updatedUser); // Log the updated user state
      return updatedUser;
    });
  };

  // Function to handle checkbox change for seller status
  const handleSeller = (e) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        [e.target.name]: e.target.checked,
      };
      console.log(updatedUser); // Log the updated user state
      return updatedUser;
    });
  };

  return (
    <div className="container mx-auto p-4 lg:px-14">
      <form action="" className="space-y-8">
        <div className="lg:flex lg:space-x-16">
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold">Create a new account</h1>
            <div className="space-y-2">
              <label htmlFor="username" className="block">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="img" className="block">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
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
            </div>
            <button
              type="submit"
              className="block w-full bg-green-500 text-white py-2 rounded"
            >
              Register
            </button>
          </div>
          <div className="lg:w-1/2 space-y-4 mt-12 lg:mt-0">
            <h1 className="text-2xl font-bold">I want to become a seller</h1>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label htmlFor="isSeller" className="block">
                  Activate the seller account
                </label>
                <input
                  type="checkbox"
                  name="isSeller"
                  onChange={handleSeller}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="block w-full border rounded p-2"
              />
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
