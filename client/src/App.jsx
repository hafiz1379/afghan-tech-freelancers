import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
