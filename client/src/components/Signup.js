import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Icons for a modern look

function Signup() {    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/register", { name, email, password })
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-gradient vh-100">
            <div className="signup-box p-4 rounded">
                <h2 className="text-center mb-4 text-gradient">Create Account</h2>
                <form onSubmit={handleSubmit} className="form-style">
                    <div className="input-group mb-3">
                        <span className="input-group-text icon-bg"><FaUser /></span>
                        <input 
                            type="text" 
                            placeholder="Enter Name" 
                            name="name" 
                            className="form-control" 
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text icon-bg"><FaEnvelope /></span>
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
                        Sign Up
                    </button>
                </form>
                <p className="text-center">Already have an account?</p>
                <Link to="/login" className="btn btn-outline-light w-100 rounded-pill text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
