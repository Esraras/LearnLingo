import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.headerContainer}>
      <div className={css.logoSection}>
        
        <span className={css.logoText}>LearnLingo</span>
      </div>

      <nav className={css.navLinks}>
        <NavLink to="/" className={({ isActive }) => `${css.navLink} ${isActive ? css.active : ""}`}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={({ isActive }) => `${css.navLink} ${isActive ? css.active : ""}`}>
          Teachers
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/favorites" className={({ isActive }) => `${css.navLink} ${isActive ? css.active : ""}`}>
            Favorites
          </NavLink>
        )}
        <NavLink to="/bookings" className={({ isActive }) => `${css.navLink} ${isActive ? css.active : ""}`}>
          Bookings
        </NavLink>
      </nav>

      <div className={css.authActions}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={css.loginBtn}>
              <svg>
                <use href="../../img/icons.svg#icon-log-in" />
              </svg>
              Log in
            </Link>
            <Link to="/register" className={css.registerBtn}>Registration</Link>
          </>
        ) : (
          <Link to="/logout" className={css.loginBtn}>Logout</Link>
        )}
      </div>
    </header>
  );
};

export default Header;