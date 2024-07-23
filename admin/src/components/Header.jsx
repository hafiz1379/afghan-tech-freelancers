import React from 'react';

export default function Header() {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
      <div className='d-flex align-items-center justify-content-between'>
        <a href='index.html' className='logo d-flex align-items-center'>
          <span className='d-none d-lg-block'>ATF</span>
        </a>
        {/* <i className="bi bi-list toggle-sidebar-btn"></i> */}
      </div>
      {/* <!-- End Logo --> */}

      <nav className='header-nav'>
        <ul className='d-flex justify-content-between'>
          <li>
            <h4>Afghan Tech Freelancers' Administration Panel</h4>
          </li>

          {/* <li className='nav-item dropdown pe-3 ms-auto'>
            <a className='nav-link nav-profile d-flex align-items-center pe-0' href='/' data-bs-toggle='dropdown'>
              <img src='assets/img/profile-img.jpg' alt='Profile' className='rounded-circle' />
              <span className='d-none d-md-block dropdown-toggle ps-2'>K. Anderson</span>{' '}
            </a>

            <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
              <li className='dropdown-header'>
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <a className='dropdown-item d-flex align-items-center' href='/'>
                  <i className='bi bi-box-arrow-right'></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li> */}

          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
    </header>
  );
}
