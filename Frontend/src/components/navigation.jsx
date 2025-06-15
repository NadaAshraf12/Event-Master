import React from "react";
import { getCookie, removeCookie } from "./CookiesFunction";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Navigation = () => {
  const navigate = useNavigate();
  const userData = getCookie("userData") ? JSON.parse(getCookie("userData")) : null;

  const handleLogout = () => {
    Swal.fire({
      title: 'Ready to Leave?',
      text: "Are you sure you want to log out?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
      background: '#f8f9fa',
      customClass: {
        title: 'swal2-title-custom',
        content: 'swal2-content-custom'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie('userData');
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            Event Master
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#Features" className="page-scroll">Features</a></li>
            <li><a href="#about" className="page-scroll">About</a></li>
            <li><a href="#services" className="page-scroll">Services</a></li>
            <li><a href="#Events" className="page-scroll">Highlights</a></li>
            <li><a href="#testimonials" className="page-scroll">Testimonials</a></li>
            <li>
              <a href="/eventpage" className="page-scroll" rel="noopener noreferrer" target="_blank">
                Events
              </a>
            </li>

            {userData === null ? (
              <>
                <li><Link to="/login" className="page-scroll">Login</Link></li>
                <li><Link to="/signup" className="page-scroll">Signup</Link></li>
              </>
            ) : (
              <li>
                <Link 
                  to="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }} 
                  className="page-scroll logout-link"
                  style={{
                    color: '#d9534f',
                    fontWeight: '500',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#c9302c')}
                  onMouseLeave={(e) => (e.target.style.color = '#d9534f')}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};