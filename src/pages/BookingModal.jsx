import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "../pages/pagesCss/BookingModal.css";

const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Minimum 10 digits")
    .required("Phone number is required"),
});

const BookingModal = ({ teacher, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "Career and business",
    },
  });

 
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; 

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const onSubmit = (data) => {
    
    toast.success("Lesson booked successfully!", data);
    onClose();
  };

  const modalHTML = (
    <div className="book-modal-overlay" onClick={onClose}>
      <div className="book-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="book-modal-close" onClick={onClose}>
          <IoClose size={32} />
        </button>
        <h2 className="book-title">Book trial lesson</h2>
        <p className="book-desc">
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className="book-teacher-info">
          <img
            src={teacher.avatar_url}
            alt={teacher.name}
            className="book-teacher-img"
          />
          <div className="book-teacher-text">
            <span className="book-teacher-label">Your teacher</span>
            <p className="book-teacher-name">{teacher.name}</p>
          </div>
        </div>

        <h3 className="book-subtitle">
          What is your main reason for learning English?
        </h3>

        <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
          {/* RADIO BUTTONS */}
          <div className="book-radio-group">
            {[
              "Career and business",
              "Lesson for kids",
              "Living abroad",
              "Exams and coursework",
              "Culture, travel or hobby",
            ].map((item) => (
              <label key={item} className="book-radio-label">
                <input
                  type="radio"
                  value={item}
                  {...register("reason")}
                />
                <span className="custom-radio"></span>
                {item}
              </label>
            ))}
            {errors.reason && <p className="error-message">{errors.reason.message}</p>}
          </div>

          {/* INPUTS WITH VALIDATION */}
          <div className="book-inputs">
            <div className="input-wrapper">
              <input 
                {...register("fullName")} 
                type="text" 
                placeholder="Full Name" 
                className={errors.fullName ? "input-error" : ""}
              />
              {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
            </div>

            <div className="input-wrapper">
              <input 
                {...register("email")} 
                type="email" 
                placeholder="Email" 
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div className="input-wrapper">
              <input 
                {...register("phone")} 
                type="tel" 
                placeholder="Phone number" 
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && <p className="error-message">{errors.phone.message}</p>}
            </div>
          </div>

          <button type="submit" className="book-submit-btn">
            Book
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalHTML, document.body);
};

export default BookingModal;