import React, { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';
import upload from '../utils/upload';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    img: null,
    desc: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get category ID from URL parameters

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        const res = await newRequest.get(`categories/${id}`);
        const categoryData = res.data.data.category;
        setFormData({
          title: categoryData.title,
          img: categoryData.img, // Set existing image URL
          desc: categoryData.desc,
        });

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchCategoryData();
  }, [id]);

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
      let updatedData = { ...formData };

      // If a new image is uploaded, upload it and get the URL
      if (formData.img && typeof formData.img !== 'string') {
        const url = await upload(formData.img);
        updatedData.img = url;
      }

      await newRequest.put(`categories/${id}`, updatedData);
      setIsLoading(false);
      navigate('/categories');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Please wait...</p>;
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Update Category</h5>

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
            <button type='submit' className='btn btn-primary'>
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
