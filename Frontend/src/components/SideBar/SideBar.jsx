import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BsFillPersonFill, BsFillPeopleFill, BsFillFileTextFill } from 'react-icons/bs';
import styles from './SideBar.module.css';
import { removeCookie } from '../CookiesFunction';

const SideBar = () => {

  const navigate = useNavigate();
  function logout(){
      removeCookie('userData');
      navigate("/login")
  }

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`bg-info ${styles.sidebar} ${
        isOpen ? styles.sidebarOpen : styles.sidebarCollapsed
      }`}
    >
      <div className="text-center">
        <h3 className={`${styles.text_color} ${isOpen ? '' : 'hidden-xs'} ${styles.title}`}>
          Admin Dashboard
        </h3>
        <button className="btn btn-info visible-xs-inline" onClick={toggleSidebar}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <ul className={`${styles.nav} nav nav-pills nav-stacked`}>
        <li className={styles.navItem}>
          <NavLink to="/admin" exact activeClassName="active">
            <BsFillPersonFill size="1.5rem" />
            <span className={`${isOpen ? '' : 'hidden-xs'} ${styles.linkText}`}>
              Profile Management
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/admin/users" activeClassName="active">
            <BsFillPeopleFill size="1.5rem" />
            <span className={`${isOpen ? '' : 'hidden-xs'} ${styles.linkText}`}>
              Event Organizers Management
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/admin/events" activeClassName="active">
            <BsFillFileTextFill size="1.5rem" />
            <span className={`${isOpen ? '' : 'hidden-xs'} ${styles.linkText}`}>
              Events Management
            </span>
          </NavLink>
        </li>
      </ul>

      <div className={`text-center ${isOpen ? '' : 'hidden-xs'}`}>
        <Link onClick={logout} className={`${styles.button}`}>Logout</Link>
      </div>
    </aside>
  );
};

export default SideBar;
