import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.js"; 
import { IoClose } from "react-icons/io5"; 
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { toast } from 'react-toastify'; 
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), 
  });

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);


  const onSubmit = async (data) => {
    setLoginError(""); 
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login Successful!");
      onClose(); 
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.", error);
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

        <form className="log-form" onSubmit={handleSubmit(onSubmit)}>
          {/* EMAIL INPUT */}
          <div className="input-wrapper">
            <input 
              {...register("email")} 
              className={`log-input ${errors.email || loginError ? "input-error" : ""}`}
              type="email" 
              placeholder="Email" 
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          {/* PASSWORD INPUT */}
          <div className="input-wrapper">
            <div className="log-password-wrapper">
              <input 
                {...register("password")}
                className={`log-input ${errors.password || loginError ? "input-error" : ""}`}
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
              />
              <button 
                type="button" 
                className="log-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          
          {loginError && <p className="log-error-text">{loginError}</p>}
          
          <button type="submit" className="log-submit-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;