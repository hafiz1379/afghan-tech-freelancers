import React from 'react';

export default function GigDetailModal({ gig, user, category, show, onClose }) {
  if (!gig || !user || !category) return null;

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} style={{ backdropFilter: 'blur(5px)' }} tabIndex='-1' role='dialog'>
      <div className='modal-dialog' style={{ width: '800px' }} role='document'>
        <div className='modal-content'>
          <div className='modal-header d-flex justify-content-between align-items-center'>
            <h5 className='modal-title'>Gig Details</h5>
            <button type='button' className='close' onClick={onClose} aria-label='Close' style={{ backgroundColor: 'transparent', border: 'none', color: 'red' }}>
              &times;
            </button>
          </div>
          <div className='modal-body'>
            <p>
              <strong>Title:</strong> {gig.title}
            </p>
            <p>
              <strong>Owner:</strong> {user.username}
            </p>
            <p>
              <strong>Category:</strong> {category.title}
            </p>
            <p>
              <strong>Description:</strong> {gig.desc}
            </p>
            {gig.cover && <img src={gig.cover} alt='Gig Cover' style={{ width: '100%' }} />}
            <p>
              <strong>Price:</strong> {gig.price} Af
            </p>
            <p>
              <strong>Short Title:</strong> {gig.shortTitle}
            </p>
            <p>
              <strong>Short Description:</strong> {gig.shortDesc}
            </p>
            <p>
              <strong>Delivery Time:</strong> {gig.deliveryTime} days
            </p>
            <p>
              <strong>Revisions:</strong> {gig.revisionNumber}
            </p>
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
