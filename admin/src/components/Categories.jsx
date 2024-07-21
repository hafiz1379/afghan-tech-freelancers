import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import newRequest from '../utils/newRequest';

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await newRequest.get('categories');
        setCategories(res.data.data.categories);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);
  console.log(categories);

  if (loading) {
    return <p>Please Wait...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>List of all users:</h5>

          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Description</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <Category category={category} index={index} />
              ))}
            </tbody>
          </table>
          <Link className='btn btn-primary' to='/categories/add-category'>
            Create new category
          </Link>
        </div>
      </div>
    </div>
  );
}

const Category = ({ category, index }) => {
  return (
    <tr>
      <th scope='row'>{index + 1}</th>
      <td>{category.title}</td>
      <td>{`${category.desc.substring(0, Math.min(30, category.desc.length))}...`}</td>
      <td>
        <button type='button' className='btn btn-danger btn-sm me-2'>
          Delete
        </button>
        <button type='button' className='btn btn-primary btn-sm me-2'>
          Update
        </button>
        <button type='button' className='btn btn-info btn-sm'>
          Detail
        </button>
      </td>
    </tr>
  );
};
