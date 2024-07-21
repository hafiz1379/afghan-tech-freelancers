import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddUser from './components/AddUser';
import Users from './components/Users';
import Categories from './components/Categories';
import AddCategory from './components/AddCategory';
import Gigs from './components/Gigs';
import AddGig from './components/AddGig';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <p>Home</p> },
      { path: '/users', element: <Users /> },
      { path: '/users/add-user', element: <AddUser /> },
      { path: '/categories', element: <Categories /> },
      { path: '/categories/add-category', element: <AddCategory /> },
      { path: '/services', element: <Gigs /> },
      { path: '/services/add-service', element: <AddGig /> },
    ],
  },
]);

root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);
