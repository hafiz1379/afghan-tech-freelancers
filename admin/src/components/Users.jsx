import React, { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';
import { Link } from 'react-router-dom';

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await newRequest.get('users');
        setUsers(res.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  /* 
  
  
  

  */

  if (loading) {
    return <p>Please Wait...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  console.log(users);
  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>List of all users:</h5>

          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Type</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <User user={user} index={index} key={user._id} />
              ))}
            </tbody>
          </table>
          <Link className='btn btn-primary' to='/users/add-user'>
            Create new user
          </Link>
        </div>
      </div>
    </div>
  );
}

const User = ({ user, index }) => {
  return (
    <tr>
      <th scope='row'>{index + 1}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.isSeller ? 'Seller' : 'Client'}</td>
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
