import { useNavigate } from "react-router-dom";
import homePagesImageYellow from "../assets/homePagesImageYellow.png";
import homePagesImageGreen from "../assets/homePagesImageGreen.png";
import homePagesImageBlue from "../assets/homePagesImageBlue.png";
import homePagesImagePink from "../assets/homePagesImagePink.png";
import homePagesImageOrange from "../assets/homePagesImageOrange.png";

import "./pagesCss/home.css";

const Home = ({ activeTheme }) => { // 1. Patronun gönderdiği rengi buradan içeri alıyoruz
  const navigate = useNavigate();

  // 2. Renk ile Fotoğrafı eşleştiren basit bir sözlük yapalım
  const themeImages = {
    "rgba(244, 197, 80, 1)": homePagesImageYellow,
    "rgba(159, 186, 174, 1)": homePagesImageGreen,
    "rgba(159, 183, 206, 1)": homePagesImageBlue,
    "rgba(224, 163, 154, 1)": homePagesImagePink,
    "rgba(240, 170, 141, 1)": homePagesImageOrange
  };

  // Şu anki aktif rengin fotoğrafını buluyoruz
  const currentImg = themeImages[activeTheme.color];

  return (
    <div className="home-container">
      <div className="home-main-section">
        <div className="home-content">
          <h1 className="home-title">
            Unlock your potential with the best{" "}
            <span
              style={{ 
                backgroundColor: activeTheme.color, 
                fontStyle: "italic",
                padding: "2px 8px",
                borderRadius: "8px"
              }}
            >
              language
            </span>{" "}
            tutors
          </h1>
          <p className="home-subtitle">
            Embark on an exciting language journey with expert tutors.
          </p>
          
          <button
            className="get-started-btn"
            style={{ backgroundColor: activeTheme.color }} 
            onClick={() => navigate("/teachers")}
          >
            Get Started
          </button>
        </div>

        <div className="home-image-container">
          {/* 5. Resmi buradan değiştiriyor */}
          <img src={currentImg} alt="Tutor" className="home-image" />
        </div>
      </div>

      <div className="stats-board" style={{ borderColor: activeTheme.color }}>
        <div className="stat-item">
          <strong>32,000+</strong> <br /> <span>Experienced tutors</span>
        </div>
        <div className="stat-item">
          <strong>300,000+</strong> <br /> <span>5-star reviews</span>
        </div>
        <div className="stat-item">
          <strong>120+</strong> <br /> <span>Subjects taught</span>
        </div>
        <div className="stat-item">
          <strong>200+</strong> <br /> <span>Native speakers</span>
        </div>
      </div>
    </div>
  );
};

export default Home;