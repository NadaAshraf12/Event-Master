import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "./CookiesFunction";
import ApiService from "./Api/ApiService";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiService = new ApiService("https://localhost:7024");
      const response = await apiService.post("/api/Authentication/login", formData);
  
      console.log("Login successful:", response);
      setCookie("userData", response);
  
      await Swal.fire({
        title: 'Login Successful!',
        text: 'You have been logged in successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      const userRole = response.role?.toLowerCase();
  
      if (userRole === "eventorganizer") {
        navigate("/eventOrganizerPage");
      } else if (userRole === "participant") {
        navigate("/");
      } else if (userRole === "admin") {
        navigate("/Admin");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again.";
      await Swal.fire({
        title: 'Login Failed',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const isFormValid = formData.Username && formData.Password;

  return (
    <div className="wrappZ-login">
      <div className="formio-login">
        <div className="titlon-login">LOGIN</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-name" className="labelio-login">
              Username
            </label>
            <input
              type="text"
              id="login-name"
              name="Username"
              placeholder="Enter your name"
              className="inpux-login"
              value={formData.Username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="labelio-login">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="Password"
              placeholder="Enter your password"
              className="inpux-login"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="subbtn-login" disabled={!isFormValid}>
            Login
          </button>
        </form>
        <p className="paraZ-login">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}