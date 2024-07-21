import React, { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';
import upload from '../utils/upload';
import { useNavigate } from 'react-router-dom';

export default function AddGig() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await newRequest.get('users');
        setUsers(usersRes.data.users);

        const categoryRes = await newRequest.get('categories');
        setCategories(categoryRes.data.data.categories);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('Starting upload...');
      const url = await upload(formData.cover);
      console.log('Upload successful:', url);

      const gigData = {
        ...formData,
        cover: url,
        images: [url],
      };
      console.log('Submitting gig data:', gigData);

      await newRequest.post('gigs/create', gigData);

      setLoading(false);
      navigate('/services');
      console.log('here');
    } catch (err) {
      console.error('Error during submission:', err);
      setLoading(false);
      setError(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error loading data.</p>;
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Add new service</h5>

        <form className='row g-3' onSubmit={handleSubmit}>
          {/* Select a user */}
          <div className='col-12'>
            <label htmlFor='userId' className='form-label'>
              The Service Owner
            </label>
            <select id='userId' className='form-select' name='userId' value={formData.userId} onChange={handleChange}>
              <option value=''>Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className='col-12'>
            <label htmlFor='categoryId' className='form-label'>
              Category
            </label>
            <select id='categoryId' className='form-select' name='categoryId' value={formData.categoryId} onChange={handleChange}>
              <option value=''>Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className='col-12'>
            <label htmlFor='title'>Service Title</label>
            <input required type='text' className='form-control' id='title' name='title' value={formData.title} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor='desc'>Service Description</label>
            <textarea name='desc' id='desc' className='form-control' rows={8} value={formData.desc} onChange={handleChange}></textarea>
          </div>

          <div>
            <label htmlFor='cover'>Cover Image</label>
            <input type='file' name='cover' id='cover' required className='form-control' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input type='number' name='price' id='price' className='form-control' value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='shortTitle'>Short Title</label>
            <input type='text' name='shortTitle' id='shortTitle' className='form-control' value={formData.shortTitle} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='shortDesc'>Short Description</label>
            <textarea name='shortDesc' id='shortDesc' rows='3' className='form-control' value={formData.shortDesc} onChange={handleChange}></textarea>
          </div>
          <div>
            <label htmlFor='deliveryTime'>Delivery Time (Days)</label>
            <input type='number' name='deliveryTime' id='deliveryTime' className='form-control' value={formData.deliveryTime} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='revisionNumber'>Revision Number</label>
            <input type='number' name='revisionNumber' id='revisionNumber' className='form-control' value={formData.revisionNumber} onChange={handleChange} />
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary text-start'>
              Add Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
