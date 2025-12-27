import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.js"; 
import { IoClose } from "react-icons/io5"; 
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import "./Login.css"; 

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      onClose(); 
    } catch (error) {
      alert("Error: " + error.message);
    } 
  };

  return (
    <div className="log-modal-overlay" onClick={onClose}>
      <div className="log-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="log-modal-close-btn" onClick={onClose}>
          <IoClose size={32} />
        </button>
        
        <h2 className="log-title">Log In</h2>
        <p className="log-description">
          Welcome back! Please enter your credentials to access your account and continue your search for a teacher.
        </p>

        <form className="log-form" onSubmit={handleLogin}>
          <input 
            className="log-input"
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <div className="log-password-wrapper">
            <input 
              className="log-input"
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button 
              type="button" 
              className="log-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <button type="submit" className="log-submit-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;