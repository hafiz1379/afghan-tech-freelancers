import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For redirecting after login

  const credentials = {
    username: 'AdminUser',
    password: 'Admin@123',
  };
  console.log(password, username);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ username, password }));
    if (username === credentials.username && password === credentials.password) {
      navigate('/');
    } else {
      alert('Wrong username or password');
      setPassword('');
      setUsername('');
    }
  };

  return (
    <div className='container'>
      <section className='section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center'>
              <div className='d-flex justify-content-center py-4'>
                <Link to='/' className='logo d-flex align-items-center w-auto'>
                  <span className='d-none d-lg-block'>Afghan Tech Freelancers</span>
                </Link>
              </div>

              <div className='card mb-3'>
                <div className='card-body'>
                  <div className='pt-4 pb-2'>
                    <h5 className='card-title text-center pb-0 fs-4'>Login to Your Account</h5>
                    <p className='text-center small'>Enter your username & password to login</p>
                  </div>

                  <form className='row g-3 needs-validation' onSubmit={handleSubmit}>
                    <div className='col-12'>
                      <label htmlFor='yourUsername' className='form-label'>
                        Username
                      </label>
                      <div className='input-group has-validation'>
                        <span className='input-group-text' id='inputGroupPrepend'>
                          @
                        </span>
                        <input type='text' name='username' className='form-control' id='yourUsername' required value={username} onChange={(e) => setUsername(e.target.value)} />
                        <div className='invalid-feedback'>Please enter your username.</div>
                      </div>
                    </div>

                    <div className='col-12'>
                      <label htmlFor='yourPassword' className='form-label'>
                        Password
                      </label>
                      <input type='password' name='password' className='form-control' id='yourPassword' required value={password} onChange={(e) => setPassword(e.target.value)} />
                      <div className='invalid-feedback'>Please enter your password!</div>
                    </div>
                    <div className='col-12'>
                      <button className='btn btn-primary w-100' type='submit'>
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
