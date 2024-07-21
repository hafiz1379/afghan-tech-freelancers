import React from 'react';

export default function AddUser() {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Vertical Form</h5>

        <form className='row g-3'>
          <div className='col-12'>
            <label for='username' className='form-label'>
              Your Name
            </label>
            <input required type='text' className='form-control' id='username' name='username' />
          </div>
          <div className='col-12'>
            <label for='email' className='form-label'>
              Email
            </label>
            <input required type='email' className='form-control' id='email' name='email' />
          </div>
          <div className='col-12'>
            <label for='password' className='form-label'>
              Password
            </label>
            <input required type='password' className='form-control' id='password' />
          </div>
          <div className='col-12'>
            <label for='img' className='form-label'>
              Profile Picture
            </label>
            <input type='file' className='form-control' id='img' name='img' />
          </div>
          <div className='col-12'>
            <label for='phone' className='form-label'>
              Phone Number
            </label>
            <input required type='tel' className='form-control' id='phone' name='phone' />
          </div>
          <div className='form-check form-switch'>
            <input className='form-check-input' type='checkbox' id='isseller' checked name='isSeller' />
            <label className='form-check-label' for='isseller'>
              Is Seller?
            </label>
          </div>
          <div className='col-12'>
            <label for='desc' className='form-label'>
              Description
            </label>
            <textarea required type='text' className='form-control' id='desc' maxLength='10' rows='10'></textarea>
          </div>
          <div className='text-center'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            <button type='reset' className='btn btn-secondary'>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
