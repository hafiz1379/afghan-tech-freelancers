import React, { useEffect, useState } from 'react';
import upload from '../utils/upload';
import newRequest from '../utils/newRequest';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    img: null,
    phone: '',
    isSeller: false,
    desc: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL parameters

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await newRequest.get(`users/${id}`);
        const userData = res.data;
        setFormData({
          username: userData.username,
          email: userData.email,
          password: '', // Don't populate password for security reasons
          img: userData.img,
          phone: userData.phone,
          isSeller: userData.isSeller,
          desc: userData.desc,
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let updatedData = { ...formData };

      // If a new image is uploaded, upload it and get the URL
      if (formData.img && typeof formData.img !== 'string') {
        const url = await upload(formData.img);
        updatedData.img = url;
      }

      await newRequest.put(`users/${id}`, updatedData);
      setIsLoading(false);
      navigate('/users');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Please wait...</p>;
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Update User</h5>

        <form className='row g-3' onSubmit={handleSubmit}>
          <div className='col-12'>
            <label htmlFor='username' className='form-label'>
              Your Name
            </label>
            <input required type='text' className='form-control' id='username' name='username' value={formData.username} onChange={handleChange} />
          </div>
          <div className='col-12'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input required type='email' className='form-control' id='email' name='email' value={formData.email} onChange={handleChange} />
          </div>
          <div className='col-12'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Leave blank to keep current password' />
          </div>
          <div className='col-12'>
            <label htmlFor='img' className='form-label'>
              Profile Picture
            </label>
            <input type='file' className='form-control' id='img' name='img' onChange={handleChange} />
          </div>
          <div className='col-12'>
            <label htmlFor='phone' className='form-label'>
              Phone Number
            </label>
            <input required type='tel' className='form-control' id='phone' name='phone' value={formData.phone} onChange={handleChange} />
          </div>
          <div className='form-check form-switch'>
            <input className='form-check-input' type='checkbox' id='isseller' name='isSeller' checked={formData.isSeller} onChange={handleChange} />
            <label className='form-check-label' htmlFor='isseller'>
              Is Seller?
            </label>
          </div>
          <div className='col-12'>
            <label htmlFor='desc' className='form-label'>
              Description
            </label>
            <textarea required type='text' className='form-control' id='desc' name='desc' rows='10' value={formData.desc} onChange={handleChange}></textarea>
          </div>
          <div className='text-center'>
            <button type='submit' className='btn btn-primary'>
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
