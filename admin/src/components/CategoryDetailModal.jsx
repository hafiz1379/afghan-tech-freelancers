import React from 'react';

export default function CategoryDetailModal({ category, show, onClose }) {
  if (!category) return null;

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} style={{ backdropFilter: 'blur(5px)' }} tabIndex='-1' role='dialog'>
      <div className='modal-dialog' style={{ width: '90vw' }} role='document'>
        <div className='modal-content'>
          <div className='modal-header d-flex justify-content-between align-items-center'>
            <h5 className='modal-title'>Category Details</h5>
            <button
              type='button'
              className='close'
              onClick={onClose}
              aria-label='Close'
              style={{ backgroundColor: 'transparent', border: 'none', color: 'red' }}
            >
              &times;
            </button>
          </div>
          <div className='modal-body'>
            <p>
              <strong>Title:</strong> {category.title}
            </p>
            <p>
              <strong>Description:</strong> {category.desc}
            </p>
            {category.img && <img src={category.img} alt='Category Cover' style={{ width: '100%' }} />}
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
