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
import UpdateUser from './components/UpdateUser';
import UpdateCategory from './components/UpdateCategory';
import UpdateGig from './components/UpdateGig.jsx';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/users', element: <Users /> },
      { path: '/users/add-user', element: <AddUser /> },
      { path: '/users/update-user/:id', element: <UpdateUser /> },
      { path: '/categories', element: <Categories /> },
      { path: '/categories/update-category/:id', element: <UpdateCategory /> },
      { path: '/categories/add-category', element: <AddCategory /> },
      { path: '/services', element: <Gigs /> },
      { path: '/services/add-service', element: <AddGig /> },
      { path: '/services/update-service/:id', element: <UpdateGig /> },
    ],
  },
]);

root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);
