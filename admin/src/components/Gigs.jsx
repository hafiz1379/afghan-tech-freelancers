import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                <Gig index={index} gig={gig} key={gig._id} />
              ))}
            </tbody>
          </table>
          <Link className='btn btn-primary' to='/services/add-service'>
            Create new category
          </Link>
        </div>
      </div>
    </div>
  );
}

const Gig = ({ gig, index }) => {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await newRequest.get(`users/${gig.userId}`);
        setUser(userRes.data);
        const categoryRes = await newRequest.get(`categories/${gig.categoryId}`);
        setCategory(categoryRes.data.data.category);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Cleanup function to cancel the async request if the component unmounts
    return () => {
      // Some logic to cancel async request
    };
  }, [gig.userId, gig.categoryId]);

  if (loading) {
    return;
  }

  if (error) {
    return;
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{user?.username}</td>
      <td>{category.title}</td>
      <td>{gig.title}</td>
      <td>Actions</td>
    </tr>
  );
};
