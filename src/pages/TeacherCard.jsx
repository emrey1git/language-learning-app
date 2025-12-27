import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import "../pages/pagesCss/teacherCard.css";

const TeacherCard = ({ teacher }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

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
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <FaHeart size={24} /> 
          ) : (
            <FiHeart size={24} /> 
          )}
        </button>
        </div>

        <div className="card-body">
          <p><strong>Speaks:</strong> {teacher.languages.join(", ")}</p>
          <p><strong>Lesson Info:</strong> {teacher.lesson_info}</p>
          <p><strong>Conditions:</strong> {teacher.conditions.join(" ")}</p>
          
          <button className="read-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Show less" : "Read more"}
          </button>

          {/* DETAYLAR AÇILDIĞINDA BURASI DEVREYE GİRER */}
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

              {/* SEVİYE KUTUCUKLARI ŞİMDİ DETAYLARIN İÇİNDE VE EN ALTTA */}
              <div className="level-badges" style={{ marginTop: "24px" }}>
                {teacher.levels.map((level, i) => (
                  <span key={i} className={`level-badge ${i === 0 ? "active-level" : ""}`}>
                    #{level}
                  </span>
                ))}
              </div>

              <button className="book-lesson-btn" style={{ marginTop: "32px" }}>
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
    </div>
  );
};

export default TeacherCard;