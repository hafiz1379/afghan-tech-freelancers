import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet }  from 'react-router-dom';
import './index.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import Home from './pages/home/Home';
import Gig from './pages/gig/Gig';
import Gigs from './pages/gigs/Gigs';
import Orders from './pages/orders/Orders';
import MyGigs from './pages/myGigs/MyGigs';
import AddGig from './pages/addgig/AddGig';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';


function App() {

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/gig/:id', element: <Gig /> },
        { path: '/gigs', element: <Gigs /> },
        { path: '/orders', element: <Orders /> },
        { path: '/mygigs', element: <MyGigs /> },
        { path: '/addgig', element: <AddGig /> },
        { path: '/messages', element: <Messages /> },
        { path: '/message/:id', element: <Message /> },
      ]
    }
  ]
  );
  return (
      <div>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
} 

export default App;