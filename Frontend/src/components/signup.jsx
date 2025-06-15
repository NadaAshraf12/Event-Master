import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordHash: "",
    role: "participant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7024/api/${formData.role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Signup failed: ${response.status} ${response.statusText}`);
      }

      const userData = await response.json();
      console.log("Signup successful:", userData);
      
      await Swal.fire({
        title: 'Success!',
        text: 'Your account has been created successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      navigate("/login");

    } catch (error) {
      console.error("Signup failed:", error.message);
      await Swal.fire({
        title: 'Signup Failed',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const isFormValid = formData.name && formData.email && formData.passwordHash;

  return (
    <div className="wrappZ-sign">
      <div className="formio-sign">
        <div className="titlon-sign">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="signup-name" className="labelio-sign">Name</label>
            <input
              type="text"
              id="signup-name"
              name="name"
              placeholder="Enter your name"
              className="inpux-sign"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="labelio-sign">E-Mail</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              placeholder="Enter your email"
              className="inpux-sign"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="labelio-sign">Password</label>
            <input
              type="password"
              id="signup-password"
              name="passwordHash"
              placeholder="Enter your password"
              className="inpux-sign"
              value={formData.passwordHash}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="signup-role" className="labelio-sign">Role</label>
            <select
              id="signup-role"
              name="role"
              className="inpux-sign"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="participant">Participant</option>
              <option value="eventOrganizer">Event Organizer</option>
            </select>
          </div>

          <button type="submit" className="subbtn-sign" disabled={!isFormValid}>
            Sign Up
          </button>

          <h2 align="center" className="or-signdiv" style={{ fontSize: "18px" }}>OR</h2>
        </form>

        <p className="paraZ-sign">
          Have an account? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
}