import React, { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usersRes = await newRequest.get('users');
      setUsers(usersRes.data.users);
      const categoriesRes = await newRequest.get('categories');
      setCategories(categoriesRes.data.data.categories);
      const gigs = await newRequest.get('gigs/all');
      setGigs(gigs.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <p>Please wait...</p>;
  }
  return (
    <section className='section dashboard'>
      {/* <!-- Left side columns --> */}

      {/* <!-- Users Card --> */}
      <div>
        <div className='card info-card customers-card'>
          <div className='card-body'>
            <h5 className='card-title'>
              Users <span>| All users</span>
            </h5>

            <div className='d-flex align-items-center'>
              <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
                <i className='bi bi-people'></i>
              </div>
              <div className='ps-3'>
                <h6>{users.length}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services */}
      <div>
        <div className='card info-card sales-card'>
          <div className='card-body'>
            <h5 className='card-title'>
              Services or Gigs <span>| All services</span>
            </h5>

            <div className='d-flex align-items-center'>
              <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
                <i className='bi bi-database-fill'></i>
              </div>
              <div className='ps-3'>
                <h6>{gigs.length}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End services */}

      {/* <!-- Category Card --> */}
      <div>
        <div className='card info-card revenue-card'>
          <div className='card-body'>
            <h5 className='card-title'>
              Categories <span>| all categories</span>
            </h5>

            <div className='d-flex align-items-center'>
              <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
                <i className='bi bi-sign-intersection-y'></i>
              </div>
              <div className='ps-3'>
                <h6>{categories.length}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Revenue Card --> */}

      {/* <!-- Customers Card --> */}

      {/* <!-- End Customers Card --> */}
    </section>
  );
}
