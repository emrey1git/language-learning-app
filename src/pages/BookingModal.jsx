import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // Portal için gerekli
import { IoClose } from "react-icons/io5";
import "../pages/pagesCss/BookingModal.css";

const BookingModal = ({ teacher, onClose }) => {
  const [reason, setReason] = useState("Career and business");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Mevcut JSX yapını bir değişkene alıyoruz
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

        <form
          className="book-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
                  name="reason"
                  value={item}
                  checked={reason === item}
                  onChange={(e) => setReason(e.target.value)}
                />
                <span className="custom-radio"></span>
                {item}
              </label>
            ))}
          </div>

          <div className="book-inputs">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone number" required />
          </div>

          <button type="submit" className="book-submit-btn">
            Book
          </button>
        </form>
      </div>
    </div>
  );

  // Bu kısmı portal ile body'ye gönderiyoruz
  return createPortal(modalHTML, document.body);
};

export default BookingModal;