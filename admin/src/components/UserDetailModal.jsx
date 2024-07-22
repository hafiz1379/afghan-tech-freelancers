import React from 'react';

export default function UserDetailModal({ user, show, onClose }) {
  if (!user) return null;

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} style={{ backdropFilter: 'blur(5px)' }} tabIndex='-1' role='dialog'>
      <div className='modal-dialog' style={{ width: '90vh' }} role='document'>
        <div className='modal-content'>
          <div className='modal-header d-flex space-between items-center'>
            <h5 className='modal-title'>User Details</h5>
            <button type='button' className='close' onClick={onClose} aria-label='Close' style={{ backgroundColor: 'transparent', border: 'none' }}></button>
          </div>
          <div className='modal-body'>
            <p>
              <strong>Name:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Type:</strong> {user.isSeller ? 'Seller' : 'Client'}
            </p>
            <p>
              <strong>Description:</strong> {user.desc}
            </p>
            {user.img && <img src={user.img} alt='User Profile' style={{ width: '100%' }} />}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
