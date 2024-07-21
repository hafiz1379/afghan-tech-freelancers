import React from 'react';
import { Link } from 'react-router-dom';

export default function LeftSiderbar() {
  return (
    <aside id='sidebar' className='sidebar'>
      <ul className='sidebar-nav' id='sidebar-nav'>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>
            <i className='bi bi-grid'></i>
            <span>Dashboard</span>
          </Link>
        </li>
        {/* <!-- End Dashboard Nav --> */}

        {/* Users */}
        <li className='nav-item'>
          <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse' href='/'>
            <i className='bi bi-menu-button-wide'></i>
            <span>Users</span>
            <i className='bi bi-chevron-down ms-auto'></i>
          </a>
          <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
            <li>
              <Link to='/users/add-user'>
                <i className='bi bi-circle'></i>
                <span>Add New User</span>
              </Link>
            </li>
            <li>
              <Link to='/users'>
                <i className='bi bi-circle'></i>
                <span>Users List</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Users Nav --> */}

        <li className='nav-item'>
          <a className='nav-link collapsed' data-bs-target='#forms-nav' data-bs-toggle='collapse' href='/'>
            <i className='bi bi-journal-text'></i>
            <span>Categories</span>
            <i className='bi bi-chevron-down ms-auto'></i>
          </a>
          <ul id='forms-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
            <li>
              <Link to='/categories'>
                <i className='bi bi-circle'></i>
                <span>All Categories</span>
              </Link>
            </li>
            <li>
              <Link to='/categories/add-category'>
                <i className='bi bi-circle'></i>
                <span>Create New Category</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Forms Nav --> */}

        <li className='nav-item'>
          <a className='nav-link collapsed' data-bs-target='#tables-nav' data-bs-toggle='collapse' href='/'>
            <i className='bi bi-layout-text-window-reverse'></i>
            <span>Services</span>
            <i className='bi bi-chevron-down ms-auto'></i>
          </a>
          <ul id='tables-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
            <li>
              <Link to='/services'>
                <i className='bi bi-circle'></i>
                <span>All services</span>
              </Link>
            </li>
            <li>
              <Link to='/services/add-service'>
                <i className='bi bi-circle'></i>
                <span>Create New Service</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Tables Nav --> */}
      </ul>
    </aside>
  );
}
