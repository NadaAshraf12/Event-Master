import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "participant",
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
            const response = await axios.post("http://localhost:5000/api/signup", formData); // Change URL as needed
            console.log("Signup Successful:", response.data);
            // Optionally redirect user or show success message
        } catch (error) {
            console.error("Signup Failed:", error.response ? error.response.data : error.message);
        }
    };

    const isFormValid = formData.name && formData.email && formData.password;

    return (
        <div className="wrappZ-sign">
            <div className="formio-sign">
                <div className="titlon-sign">CREATE AN ACCOUNT</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="signup-name" className="labelio-sign">
                            Name
                        </label>
                        <input
                            type="text"
                            id="signup-name"
                            name="name"
                            placeholder="Enter your name"
                            className="inpux-sign"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="signup-email" className="labelio-sign">
                            E-Mail
                        </label>
                        <input
                            type="email"
                            id="signup-email"
                            name="email"
                            placeholder="Enter your email"
                            className="inpux-sign"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="signup-password" className="labelio-sign">
                            Password
                        </label>
                        <input
                            type="password"
                            id="signup-password"
                            name="password"
                            placeholder="Enter your password"
                            className="inpux-sign"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="signup-role" className="labelio-sign">
                            Role
                        </label>
                        <select
                            id="signup-role"
                            name="role"
                            className="inpux-sign"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="participant">Participant</option>
                            <option value="organizer">Event Organizer</option>
                        </select>
                    </div>

                    <button type="submit" className="subbtn-sign" disabled={!isFormValid}>
                        Sign Up
                    </button>

                    <h2 align="center" className="or-signdiv" style={{ fontSize: "18px" }}>
                        OR
                    </h2>
                </form>
                <p className="paraZ-sign">
                    Have an account? <Link to="/Login">Login</Link>
                </p>
            </div>
        </div>
    );
}
