import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.js"; 
import { IoClose } from "react-icons/io5"; 
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css"; 


const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [regError, setRegError] = useState("");

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
    setRegError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, {
        displayName: data.name
      });
      toast.success("Registration Successful!");
      onClose();
    } catch (error) {
      setRegError("Registration failed. Email might be in use.",error);
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

        <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
          {/* NAME FIELD */}
          <div className="input-wrapper">
            <input 
              {...register("name")}
              className={`reg-input ${errors.name ? "input-error" : ""}`}
              type="text" 
              placeholder="Name" 
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          {/* EMAIL FIELD */}
          <div className="input-wrapper">
            <input 
              {...register("email")}
              className={`reg-input ${errors.email ? "input-error" : ""}`}
              type="email" 
              placeholder="Email" 
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          {/* PASSWORD FIELD */}
          <div className="input-wrapper">
            <div className="reg-password-wrapper">
              <input 
                {...register("password")}
                className={`reg-input ${errors.password ? "input-error" : ""}`}
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
              />
              <button 
                type="button" 
                className="reg-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          {regError && <p className="log-error-text">{regError}</p>}
          
          <button type="submit" className="reg-submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;