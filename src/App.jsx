import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom"; // NavLink eklendi
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import Teachers from "./pages/Teachers.jsx";
import ukraine from "./assets/ukraine.png";
import { FiLogIn, FiUser, FiLogOut } from "react-icons/fi";
import "./App.css";

const themes = [
  { color: "rgba(244, 197, 80, 1)", id: "yellow" },
  { color: "rgba(159, 186, 174, 1)", id: "green" },
  { color: "rgba(159, 183, 206, 1)", id: "blue" },
  { color: "rgba(224, 163, 154, 1)", id: "pink" },
  { color: "rgba(240, 170, 141, 1)", id: "orange" }
];

function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const activeTheme = themes[themeIndex];

  // Aktif link stilini belirleyen yardımcı fonksiyon (Kod kalabalığı yapmasın diye)
  const getActiveLinkStyle = ({ isActive }) => ({
    color: isActive ? activeTheme.color : "black",
    fontWeight: isActive ? "bold" : "normal"
  });

  return (
    <Router>
      <nav className="header-nav">
        {/* LOGO */}
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src={ukraine} alt="Logo" />
          </Link>
          <Link to="/" className="logo-text">LearnLingo</Link>
        </div>

        {/* ORTA MENÜ - NavLink ve isActive ile Güncellendi */}
        <div className="pages-buttons">
          <NavLink to="/" className="home-button" style={getActiveLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/teachers" className="teachers-button" style={getActiveLinkStyle}>
            Teachers
          </NavLink>
          {/* Giriş yapılmışsa Favorites sekmesi belirir */}
          {isLoggedIn && (
            <NavLink to="/favorites" className="favorites-button" style={getActiveLinkStyle}>
              Favorites
            </NavLink>
          )}
        </div>

        <div className="auth-buttons">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            style={{ backgroundColor: activeTheme.color }} 
          />

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login-button">
                <FiLogIn className="login-icon" style={{ color: activeTheme.color }} />
                Log in
              </Link>
              <Link to="/registration" className="registration-button" style={{ backgroundColor: activeTheme.color }}>
                Registration
              </Link>
            </>
          ) : (
            <div className="user-profile-box">
              <div className="user-profile-box" style={{ marginRight: "10px" }}>
                <FiUser className="user-icon" style={{ color: activeTheme.color }} />
                <span className="username-text">Username</span>
              </div>
              
              <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
                <FiLogOut style={{ marginRight: "5px" }} />
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home activeTheme={activeTheme} />} />
        <Route path="/teachers" element={<Teachers activeTheme={activeTheme} />} />
        <Route path="/favorites" element={<Favorites activeTheme={activeTheme} />} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/registration" element={<div>Registration Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;