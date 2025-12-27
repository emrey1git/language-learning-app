import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
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

  // Modal'ların açık/kapalı durumunu tutan hafıza (State)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const activeTheme = themes[themeIndex];

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

        {/* ORTA MENÜ */}
        <div className="pages-buttons">
          <NavLink to="/" className="home-button" style={getActiveLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/teachers" className="teachers-button" style={getActiveLinkStyle}>
            Teachers
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className="favorites-button" style={getActiveLinkStyle}>
              Favorites
            </NavLink>
          )}
        </div>

        {/* SAĞ TARAF: AUTH BUTONLARI */}
        <div className="auth-buttons">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            style={{ backgroundColor: activeTheme.color }} 
          />

          {!isLoggedIn ? (
            <>
              {/* Login Modalını Açan Buton */}
              <button onClick={() => setIsLoginOpen(true)} className="login-button">
                <FiLogIn className="login-icon" style={{ color: activeTheme.color }} />
                <span>Log in</span>
              </button>

              {/* Register Modalını Açan Buton */}
              <button 
                onClick={() => setIsRegisterOpen(true)} 
                className="registration-button" 
                style={{ backgroundColor: activeTheme.color }}
              >
                Registration
              </button>
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

      {/* MODAL'LAR (Ekranda sadece state true olduğunda belirirler) */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <Register onClose={() => setIsRegisterOpen(false)} />}

      <Routes>
        <Route path="/" element={<Home activeTheme={activeTheme} />} />
        <Route path="/teachers" element={<Teachers activeTheme={activeTheme} />} />
        <Route path="/favorites" element={<Favorites activeTheme={activeTheme} />} />
      </Routes>
    </Router>
  );
}

export default App;