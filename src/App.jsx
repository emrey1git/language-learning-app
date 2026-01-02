import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import Favorites from "./pages/Favorites.jsx";
import Teachers from "./pages/Teachers.jsx";
import ukraine from "./assets/ukraine.png";

import { FiLogIn, FiUser, FiLogOut } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const themes = [
  { color: "rgba(244, 197, 80, 1)", id: "yellow" },
  { color: "rgba(159, 186, 174, 1)", id: "green" },
  { color: "rgba(159, 183, 206, 1)", id: "blue" },
  { color: "rgba(224, 163, 154, 1)", id: "pink" },
  { color: "rgba(240, 170, 141, 1)", id: "orange" },
];

const LogoutModal = ({ confirm, cancel }) => (
  <div className="modal-overlay" onClick={cancel}> 
    <div className="modal-content">
      <p>Are you sure you want to log out?</p>
      <div className="modal-actions">
        <button onClick={confirm} className="confirm-btn">
          Yes, Log out
        </button>
        <button onClick={cancel}  className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [themeIndex, setThemeIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
const activeTheme = themes[themeIndex];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

useEffect(() => {
 
  document.documentElement.style.setProperty('--active-color', activeTheme.color);
}, [activeTheme]);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLogoutModalOpen(false); 
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed!");
      console.error(error);
    }
  };

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };


  const getActiveLinkStyle = ({ isActive }) => ({
    color: isActive ? activeTheme.color : "black",
    fontWeight: isActive ? "bold" : "normal",
  });

  if (loading) return null;

  return (
    <Router>
      <nav className="header-nav">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src={ukraine} alt="Logo" />
          </Link>
          <Link to="/" className="logo-text">LearnLingo</Link>
        </div>

        <div className="pages-buttons">
          <NavLink to="/" className="home-button" style={getActiveLinkStyle}>Home</NavLink>
          <NavLink to="/teachers" className="teachers-button" style={getActiveLinkStyle}>Teachers</NavLink>
          {user && (
            <NavLink to="/favorites" className="favorites-button" style={getActiveLinkStyle}>Favorites</NavLink>
          )}
        </div>

        <div className="auth-buttons">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            style={{ backgroundColor: activeTheme.color }}
          />

          {!user ? (
            <>
              <button onClick={() => setIsLoginOpen(true)} className="login-button">
                <FiLogIn className="login-icon" style={{ color: activeTheme.color }} />
                <span>Log in</span>
              </button>
              <button onClick={() => setIsRegisterOpen(true)} className="registration-button" style={{ backgroundColor: activeTheme.color }}>
                Registration
              </button>
            </>
          ) : (
            <div className="user-profile-box">
              <div className="user-profile-box" style={{ marginRight: "10px" }}>
                <FiUser className="user-icon" style={{ color: activeTheme.color }} />
                <span className="username-text">{user.displayName || "User"}</span>
              </div>
              <button onClick={() => setIsLogoutModalOpen(true)} className="logout-btn">
                <FiLogOut style={{ marginRight: "5px" }} />
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <Register onClose={() => setIsRegisterOpen(false)} />}
      {isLogoutModalOpen && (
        <LogoutModal
          confirm={handleLogout}
          cancel={() => setIsLogoutModalOpen(false)}
        />
      )}

      <Routes>
        <Route path="/" element={<Home activeTheme={activeTheme} />} />
        <Route path="/teachers" element={<Teachers activeTheme={activeTheme} />} />
        <Route
          path="/favorites"
          element={user ? <Favorites activeTheme={activeTheme} /> : <Home activeTheme={activeTheme} />}
        />
      </Routes>

      <ToastContainer autoClose={2000} />
    </Router>
  );
}

export default App;