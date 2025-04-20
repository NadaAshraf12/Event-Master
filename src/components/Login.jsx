import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		password: "",
	});

	const [error, setError] = useState("");

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
			const response = await axios.post("http://localhost:5000/api/login", formData); // Adjust URL as needed
			console.log("Login successful:", response.data);
			const userRole = response.data.user.role;
			// Redirect or store token/user as needed
			if (userRole === "organizer") {
				navigate("/dashboard/organizer");
			} else {
				navigate("/dashboard/participant");
			}
		} catch (err) {
			console.error("Login error:", err.response ? err.response.data : err.message);
			setError("Invalid credentials. Please try again.");
		}
	};

	const isFormValid = formData.name && formData.password;

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
							name="name"
							placeholder="Enter your name"
							className="inpux-login"
							value={formData.name}
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
							name="password"
							placeholder="Enter your password"
							className="inpux-login"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>

					{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

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
