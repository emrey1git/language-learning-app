import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import Teachers from './pages/Teachers.jsx'
import './App.css'

function App() {
  return (
    <Router>

      {/* Navigasyon Barı */}
      <nav style={{
        padding: '20px',
        display: 'flex',
        gap: '20px',
        borderBottom: '1px solid #ccc'
      }}>
        <Link to="/">Home</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/favorites">Favorites</Link>
        
      </nav>

      {/* Sayfa İçerikleri */}
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/favorites" element={<Favorites />} />
       </Routes>
    </Router>
  )
}

export default App