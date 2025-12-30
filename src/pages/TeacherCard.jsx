import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { ref, set, remove } from "firebase/database";
import { db, auth } from "../firebase"; 
import "../pages/pagesCss/teacherCard.css";
// MODALI IMPORT ET
import BookingModal from "./BookingModal"; 

const TeacherCard = ({ teacher, isInitialFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isInitialFavorite);
  // MODAL STATE'I
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      alert("Please log in to add favorites!");
      return;
    }
    const userId = auth.currentUser.uid;
    const teacherId = teacher.id; 
    const favRef = ref(db, `favorites/${userId}/${teacherId}`);

    try {
      if (isFavorite) {
        await remove(favRef);
        setIsFavorite(false);
      } else {
        await set(favRef, teacher);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Firebase Hatası:", error);
    }
  };

  return (
    <div className="teacher-card">
      <div className="card-left">
        <div className="photo-container">
          <img src={teacher.avatar_url} alt={teacher.name} className="teacher-avatar" />
          <div className="online-badge"></div>
        </div>
      </div>

      <div className="card-right">
        <div className="card-header">
          <div className="header-left">
            <span className="label">Languages</span>
            <h3 className="teacher-name">{teacher.name} {teacher.surname}</h3>
          </div>
          <div className="header-stats">
            <span>📖 Lessons online</span>
            <span className="stat-divider">|</span>
            <span>Lessons done: {teacher.lessons_done}</span>
            <span className="stat-divider">|</span>
            <span>⭐ Rating: {teacher.rating}</span>
            <span className="stat-divider">|</span>
            <span>Price / 1 hour: <span className="price-text">{teacher.price_per_hour}$</span></span>
          </div>
          
          <button 
            className={`favorite-btn ${isFavorite ? "active" : ""}`} 
            onClick={toggleFavorite}
          >
            {isFavorite ? <FaHeart size={24} color="#f4c550" /> : <FiHeart size={24} />}
          </button>
        </div>

        <div className="card-body">
          <p><strong>Speaks:</strong> {teacher.languages.join(", ")}</p>
          <p><strong>Lesson Info:</strong> {teacher.lesson_info}</p>
          <p><strong>Conditions:</strong> {teacher.conditions.join(" ")}</p>
          
          <button className="read-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Show less" : "Read more"}
          </button>

          {isExpanded && (
            <div className="expanded-content" style={{ marginTop: "16px" }}>
              <p className="experience-text">{teacher.experience}</p>
              
              <div className="reviews-section">
                {teacher.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-avatar">{review.reviewer_name.charAt(0)}</div>
                      <div className="reviewer-info">
                        <h4 className="reviewer-name">{review.reviewer_name}</h4>
                        <div className="reviewer-rating">⭐ {review.reviewer_rating}.0</div>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>

              <div className="level-badges" style={{ marginTop: "24px" }}>
                {teacher.levels.map((level, i) => (
                  <span key={i} className={`level-badge ${i === 0 ? "active-level" : ""}`}>
                    #{level}
                  </span>
                ))}
              </div>

              {/* BUTONA TIKLANDIĞINDA MODALI AÇ */}
              <button 
                className="book-lesson-btn" 
                style={{ marginTop: "32px" }}
                onClick={() => setIsModalOpen(true)}
              >
                Book trial lesson
              </button>
            </div>
          )}
        </div>

        {!isExpanded && (
          <div className="card-footer">
            <div className="level-badges">
              {teacher.levels.map((level, i) => (
                <span key={i} className={`level-badge ${i === 0 ? "active-level" : ""}`}>
                  #{level}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODALI BURADA ÇAĞIRIYORUZ */}
      {isModalOpen && (
        <BookingModal 
          teacher={teacher} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default TeacherCard;