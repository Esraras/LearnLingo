import { Link } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <div className={css.logoSection}>
        {/* LOGO IMAGE YERİ: Buraya yuvarlak sarı-mavi ikonunu koyabilirsin */}
        <img src="path_to_logo_icon.png" alt="LearnLingo Logo İkonu" className={css.logoIcon} />
        <span className={css.logoText}>LearnLingo</span>
      </div>

      <nav className={css.navLinks}>
        <Link to="/" className={`${css.navLink} ${css.active}`}>Home</Link>
        <Link to="/teachers" className={css.navLink}>Teachers</Link>
      </nav>

      <div className={css.authActions}>
        <Link to="/login" className={css.loginBtn}>
          <img src="path_to_login_icon.svg" alt="Log In" className={css.loginIcon} />
          Log in
        </Link>
        <Link to="/register" className={css.registerBtn}>Registration</Link>
      </div>
    </header>
  );
};

export default Header;