import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LeftSiderbar from './components/LeftSiderbar';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Predefined credentials for validation
  const credentials = {
    username: 'AdminUser',
    password: 'Admin@123',
  };

  useEffect(() => {
    // Retrieve the user from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if stored credentials match predefined ones
    const isValidUser = storedUser && storedUser.username === credentials.username && storedUser.password === credentials.password;

    // Update authentication status
    setIsAuthenticated(isValidUser);
  }, []); // Dependencies ensure this effect runs only on component mount and when navigate changes

  if (!isAuthenticated) {
    navigate('/login');
  }

  return (
    <div className='App'>
      <Header />
      <LeftSiderbar />
      <main id='main' className='main'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
