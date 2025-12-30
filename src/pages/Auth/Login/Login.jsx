import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.js"; 
import { IoClose } from "react-icons/io5"; 
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { toast } from 'react-toastify'; // ToastContainer'ı buradan sildik (App.js'de olmalı)
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"; 

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(""); // Hata mesajı için yeni state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // Her denemede hatayı temizle
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      onClose(); 
    } catch (error) {
      // Toast arkada kalsa bile artık kullanıcı bunu inputun altında görecek
      setLoginError("Invalid email or password. Please try again.");
      toast.error("Login Failed!");
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
          Welcome back! Please enter your credentials to access your account.
        </p>

        <form className="log-form" onSubmit={handleLogin}>
          <input 
            className={`log-input ${loginError ? "input-error" : ""}`}
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <div className="log-password-wrapper">
            <input 
              className={`log-input ${loginError ? "input-error" : ""}`}
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

          {/* KIRMIZI HATA MESAJI BURADA ÇIKACAK */}
          
          {loginError && (
            <p className="log-error-text">
              {loginError}
            </p>
          )}
          <button type="submit" className="log-submit-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;