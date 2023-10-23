import Logo from '../src/Assets/img/Logo.png';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function Navheader() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { logout } = useAuth0();

  //Vendor-Admin Check if the user is authenticated and the email is the specific one
  const isVendorUser = isAuthenticated && user.email === 'roseiyera@gmail.com';

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} className="logo-img" alt="logo" />
      </div>
      <nav>
        <ul>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/product" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link">
              My Orders
            </Link>
          </li>
          {isVendorUser && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Vendor Page
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="user-links">
        {!isAuthenticated && (
          <button
            className="button"
            type="link"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        )}

        {isAuthenticated && (
          <button
            className="button"
            type="link"
            onClick={() => logout()}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default Navheader;
