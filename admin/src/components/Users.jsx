import React, { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';
import { Link, useNavigate } from 'react-router-dom';
import UserDetailModal from './UserDetailModal';

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleDelete = async (id) => {
    try {
      const response = await newRequest.delete(`users/admin/${id}`);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        console.error('Failed to delete the user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDetail = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

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
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Type</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <User user={user} index={index} key={user._id} onDelete={handleDelete} onDetail={handleDetail} />
              ))}
            </tbody>
          </table>
          <Link className='btn btn-primary' to='/users/add-user'>
            Create new user
          </Link>
        </div>
      </div>
      <UserDetailModal user={selectedUser} show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

const User = ({ user, index, onDelete, onDetail }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <th scope='row'>{index + 1}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.isSeller ? 'Seller' : 'Client'}</td>
      <td>
        <button
          type='button'
          className='btn btn-danger btn-sm me-2'
          onClick={() => {
            const confirmed = window.confirm('Are you sure you want to delete this user?');
            if (confirmed) {
              onDelete(user._id);
            }
          }}>
          Delete
        </button>
        <button type='button' className='btn btn-primary btn-sm me-2' onClick={() => navigate(`/users/update-user/${user._id}`)}>
          Update
        </button>
        <button type='button' className='btn btn-info btn-sm' onClick={() => onDetail(user)}>
          Detail
        </button>
      </td>
    </tr>
  );
};
