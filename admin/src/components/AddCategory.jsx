import React, { useState } from 'react';
import newRequest from '../utils/newRequest';
import upload from '../utils/upload';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    img: null,
    desc: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const url = await upload(formData.img);
      await newRequest.post('categories', {
        ...formData,
        img: url,
      });

      setIsLoading(false);
      navigate('/categories');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Please wait</p>;
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Add new category</h5>

        <form className='row g-3' onSubmit={handleSubmit}>
          <div className='col-12'>
            <label htmlFor='title' className='form-label'>
              Category Title
            </label>
            <input required type='text' className='form-control' id='title' name='title' value={formData.title} onChange={handleChange} />
          </div>
          <div className='col-12'>
            <label htmlFor='img' className='form-label'>
              Category Cover Image
            </label>
            <input type='file' className='form-control' id='img' name='img' onChange={handleChange} />
          </div>
          <div className='col-12'>
            <label htmlFor='desc' className='form-label'>
              Description
            </label>
            <textarea name='desc' id='desc' required className='form-control' rows='10' value={formData.desc} onChange={handleChange}></textarea>
          </div>
          <div className='text-center'>
            <button type='submit' className='btn btn-primary text-start'>
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
