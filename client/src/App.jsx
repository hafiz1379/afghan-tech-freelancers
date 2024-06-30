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
import Login from "./pages/login/Login";
import Register from './pages/register/register';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query"

function App() {

  const queryCleint = new QueryClient();

  const Layout = () => {
    return (
      <div>
        <QueryClientProvider client={queryCleint}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
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
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> }
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
