import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa"; // Import icons

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", { email, password })
            .then(result => {
                if (result.data.message === "Success") {
                    setUser(result.data.userId);
                    console.log(result.data.userId); // Set user ID
                    navigate("/"); // Redirect to home
                } else {
                    alert(result.data.message);
                    navigate("/register");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-gradient vh-100">
            <div className="login-box p-4 rounded">
                <h2 className="text-center mb-4 text-gradient">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="form-style">
                    <div className="input-group mb-3">
                        <span className="input-group-text icon-bg"><FaUser /></span>
                        <input 
                            type="text" 
                            placeholder="Enter Email" 
                            name="email" 
                            className="form-control" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text icon-bg"><FaLock /></span>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            name="password" 
                            className="form-control" 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill mb-3">
                        Login
                    </button>
                </form>
                <p className="text-center">Don’t have an account?</p>
                <Link to="/register" className="btn btn-outline-light w-100 rounded-pill text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
