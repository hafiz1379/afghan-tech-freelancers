import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const gigRes = await newRequest.get('gigs/all');
        setGigs(gigRes.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to remove a gig from the state
  const handleDelete = async (gigId) => {
    try {
      await newRequest.delete(`gigs/admin/${gigId}`);
      setGigs((prevGigs) => prevGigs.filter((gig) => gig._id !== gigId));
    } catch (error) {
      console.error('Failed to delete gig:', error);
      alert('Error deleting the gig. Please try again later.');
    }
  };

  if (loading) {
    return <p>Please wait...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>List of all services:</h5>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Owner</th>
                <th scope='col'>Category</th>
                <th scope='col'>Title</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig, index) => (
                <Gig key={gig._id} index={index} gig={gig} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
          <Link className='btn btn-primary' to='/services/add-service'>
            Create new service
          </Link>
        </div>
      </div>
    </div>
  );
}

const Gig = ({ gig, index, onDelete }) => {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await newRequest.get(`users/${gig.userId}`);
        setUser(userRes.data);
        const categoryRes = await newRequest.get(`categories/${gig.categoryId}`);
        setCategory(categoryRes.data.data.category);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gig.userId, gig.categoryId]);

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      onDelete(gig._id);
    }
  };

  if (loading) {
    return (
      <tr>
        <td colSpan='5'>Loading...</td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan='5'>Error loading data: {error.message}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{user?.username || 'Unknown User'}</td>
      <td>{category?.title || 'Unknown Category'}</td>
      <td>{gig.title}</td>
      <td>
        <button type='button' className='btn btn-danger btn-sm me-2' onClick={handleDeleteClick}>
          Delete
        </button>
        <button type='button' className='btn btn-primary btn-sm me-2' onClick={() => navigate(`/services/update-service/${gig._id}`)}>
          Update
        </button>
        <button type='button' className='btn btn-info btn-sm'>
          Detail
        </button>
      </td>
    </tr>
  );
};
