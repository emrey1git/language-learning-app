import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.js"; 
import { IoClose } from "react-icons/io5"; 
import { FiEye, FiEyeOff } from "react-icons/fi"; 
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import "./Register.css"; 

const Register = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      window.location.reload();
      toast.success("Registration Successful!");
      onClose(); 
    } catch (error) {
      toast.error("Registration Failed: " + error.message);
    }
  };

  return (
    <div className="reg-modal-overlay" onClick={onClose}>
      <div className="reg-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="reg-modal-close-btn" onClick={onClose}>
          <IoClose size={32} />
        </button>
        
        <h2 className="reg-title">Registration</h2>
        <p className="reg-description">
          Thank you for your interest in our platform! Please enter your details, so we can help you find the perfect teacher.
        </p>

        <form className="reg-form" onSubmit={handleRegister}>
          <input 
            className="reg-input"
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            className="reg-input"
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <div className="reg-password-wrapper">
            <input 
              className="reg-input"
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button 
              type="button" 
              className="reg-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <button type="submit" className="reg-submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;