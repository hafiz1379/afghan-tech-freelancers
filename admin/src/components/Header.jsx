import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };
  return (
    <header id='header' class='header fixed-top d-flex align-items-center'>
      <div className='d-flex align-items-center justify-content-between'>
        <a href='index.html' className='logo d-flex align-items-center'>
          <span className='d-none d-lg-block'>ATF</span>
        </a>
        {/* <i className="bi bi-list toggle-sidebar-btn"></i> */}
      </div>
      {/* <!-- End Logo --> */}
      <div class='search-bar'>
        <h1 className='fs-3'>Afghan Tech Freelancers' Administration Panel</h1>
      </div>

      <nav class='header-nav ms-auto me-3'>
        <ul className='d-flex justify-content-between'>
          <button className='btn btn-sm btn-danger' onClick={handleLogout}>
            <i className='bi bi-door-open-fill'></i>Logout
          </button>
        </ul>
      </nav>
    </header>
  );
}
