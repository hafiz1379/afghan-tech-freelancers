import React, { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';
import upload from '../utils/upload';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateGig() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    categoryId: '',
    title: '',
    desc: '',
    cover: null,
    price: '',
    shortTitle: '',
    shortDesc: '',
    deliveryTime: '',
    revisionNumber: '',
  });
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({
    userId: '',
    categoryId: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get gig ID from URL parameters

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const gigRes = await newRequest.get(`gigs/single/${id}`);
        const gigData = gigRes.data;
        const usersRes = await newRequest.get('users');
        const categoryRes = await newRequest.get('categories');

        setFormData({
          userId: gigData.userId,
          categoryId: gigData.categoryId,
          title: gigData.title,
          desc: gigData.desc,
          cover: gigData.cover,
          price: gigData.price,
          shortTitle: gigData.shortTitle,
          shortDesc: gigData.shortDesc,
          deliveryTime: gigData.deliveryTime,
          revisionNumber: gigData.revisionNumber,
        });
        setUsers(usersRes.data.users);
        setCategories(categoryRes.data.data.categories);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.userId) {
      formErrors.userId = 'Please select a user.';
    }
    if (!formData.categoryId) {
      formErrors.categoryId = 'Please select a category.';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      let updatedData = { ...formData };

      // If a new cover image is uploaded, upload it and get the URL
      if (formData.cover && typeof formData.cover !== 'string') {
        const url = await upload(formData.cover);
        updatedData.cover = url;
      }

      updatedData.images = [updatedData.cover]; // Assuming images array needs to be updated

      await newRequest.put(`gigs/${id}`, updatedData);
      setIsLoading(false);
      navigate('/services');
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
        <h5 className='card-title'>Update Gig</h5>

        <form className='row g-3' onSubmit={handleSubmit}>
          {/* Select a user */}
          <div className='col-12'>
            <label htmlFor='userId' className='form-label'>
              The Service Owner
            </label>
            <select id='userId' className={`form-select ${errors.userId ? 'is-invalid' : ''}`} name='userId' value={formData.userId} onChange={handleChange}>
              <option value=''>Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            {errors.userId && <div className='invalid-feedback'>{errors.userId}</div>}
          </div>

          {/* Select a category */}
          <div className='col-12'>
            <label htmlFor='categoryId' className='form-label'>
              Category
            </label>
            <select id='categoryId' className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`} name='categoryId' value={formData.categoryId} onChange={handleChange}>
              <option value=''>Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {errors.categoryId && <div className='invalid-feedback'>{errors.categoryId}</div>}
          </div>

          <div className='col-12'>
            <label htmlFor='title' className='form-label'>
              Service Title
            </label>
            <input required type='text' className='form-control' id='title' name='title' value={formData.title} onChange={handleChange} />
          </div>

          <div className='col-12'>
            <label htmlFor='desc' className='form-label'>
              Service Description
            </label>
            <textarea name='desc' id='desc' className='form-control' rows={8} value={formData.desc} onChange={handleChange}></textarea>
          </div>

          <div className='col-12'>
            <label htmlFor='cover' className='form-label'>
              Cover Image
            </label>
            <input type='file' name='cover' id='cover' className='form-control' onChange={handleChange} />
            {formData.cover && typeof formData.cover === 'string' && <img src={formData.cover} alt='Cover' style={{ maxWidth: '100%', marginTop: '10px' }} />}
          </div>

          <div className='col-12'>
            <label htmlFor='price' className='form-label'>
              Price
            </label>
            <input type='number' name='price' id='price' className='form-control' value={formData.price} onChange={handleChange} />
          </div>

          <div className='col-12'>
            <label htmlFor='shortTitle' className='form-label'>
              Short Title
            </label>
            <input type='text' name='shortTitle' id='shortTitle' className='form-control' value={formData.shortTitle} onChange={handleChange} />
          </div>

          <div className='col-12'>
            <label htmlFor='shortDesc' className='form-label'>
              Short Description
            </label>
            <textarea name='shortDesc' id='shortDesc' rows='3' className='form-control' value={formData.shortDesc} onChange={handleChange}></textarea>
          </div>

          <div className='col-12'>
            <label htmlFor='deliveryTime' className='form-label'>
              Delivery Time (Days)
            </label>
            <input type='number' name='deliveryTime' id='deliveryTime' className='form-control' value={formData.deliveryTime} onChange={handleChange} />
          </div>

          <div className='col-12'>
            <label htmlFor='revisionNumber' className='form-label'>
              Revision Number
            </label>
            <input type='number' name='revisionNumber' id='revisionNumber' className='form-control' value={formData.revisionNumber} onChange={handleChange} />
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary'>
              Update Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
