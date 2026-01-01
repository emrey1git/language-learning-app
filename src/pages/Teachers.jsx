import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../firebase.js"; 
import TeacherCard from "./TeacherCard.jsx"; 
import "../pages/pagesCss/teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  // DATA FETCHING SECTION
  useEffect(() => {
    const teachersRef = ref(db, "/");
    const unsubscribeTeachers = onValue(teachersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const source = data.teachers ? data.teachers : data;
          let teachersArray = [];
          
          if (Array.isArray(source)) {
            teachersArray = source.filter(t => t).map((t, index) => ({
              id: t.id ? t.id.toString() : index.toString(),
              ...t
            }));
          } else {
            teachersArray = Object.keys(source)
              .filter(key => key !== 'favorites')
              .map(key => ({
                id: key,
                ...source[key]
              }));
          }
          setTeachers(teachersArray);
        } else {
          setError("No teacher data found in the database.");
        }
      } catch (err) {
        setError("An error occurred while processing the data.",err);
      }
      setLoading(false);
    });

    let unsubscribeFavs = () => {};
    if (auth.currentUser) {
      const favRef = ref(db, `favorites/${auth.currentUser.uid}`);
      unsubscribeFavs = onValue(favRef, (snapshot) => {
        const favData = snapshot.val() || {};
        setFavorites(favData);
      });
    }

    return () => {
      unsubscribeTeachers();
      unsubscribeFavs();
    };
  }, []);

  if (loading) return <div className="loading">Firebase verileri yükleniyor...</div>;
  if (error) return <div className="error-message" style={{color: 'red', padding: '20px'}}>{error}</div>;

  // FILTER LOGIC SECTION
  const filteredTeachers = teachers.filter((teacher) => {
    const matchLanguage = selectedLanguage === "" || 
      (teacher.languages && teacher.languages.includes(selectedLanguage));
    
    
    const matchLevel = selectedLevel === "" ||
      (teacher.levels && teacher.levels.includes(selectedLevel));

    const matchPrice = selectedPrice === "" ||
      Number(teacher.price_per_hour) <= Number(selectedPrice);

    return matchLanguage && matchLevel && matchPrice;
  });

  // RENDER SECTION
  return (
    <div className="teachers-page-container">
      <div className="filters-container">
        <div className="filter-item filter-languages">
          <label>Languages</label>
          <select onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="">All</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Mandarin Chinese">Mandarin Chinese</option>
            <option value="Italian">Italian</option>
            <option value="Korean">Korean</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>

        <div className="filter-item filter-level">
          <label>Level of knowledge</label>
          <select onChange={(e) => setSelectedLevel(e.target.value)}>
            <option value="">All</option>
            <option value="A1 Beginner">A1 Beginner</option>
            <option value="A2 Elementary">A2 Elementary</option>
            <option value="B1 Intermediate">B1 Intermediate</option>
            <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
            <option value="C1 Advanced">C1 Advanced</option>
            <option value="C2 Proficient">C2 Proficient</option>
          </select>
        </div>

        <div className="filter-item filter-price">
          <label>Price</label>
          <select onChange={(e) => setSelectedPrice(e.target.value)}>
            <option value="">All</option>
            <option value="10">10 $</option>
            <option value="20">20 $</option>
            <option value="30">30 $</option>
            <option value="40">40 $</option>
            <option value="50">50 $</option>
          </select>
        </div>
      </div>

      <div className="teachers-list">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.slice(0, visibleCount).map((teacher) => (
            <TeacherCard 
              key={teacher.id} 
              teacher={teacher} 
              isInitialFavorite={!!favorites[teacher.id]} 
              activeFilterLevel={selectedLevel}
              
            />
          ))
        ) : (
          <div style={{
      gridColumn: "1 / -1", 
      textAlign: "center",
      padding: "100px 20px",
      fontSize: "20px",
      color: "#121417",
      fontWeight: "500",
      backgroundColor: "#fff",
      borderRadius: "14px",
      border: "1px dashed #ccc" 
    }}>
      <p>No teachers matching your criteria were found. Please try different filters.</p>
    </div>
        )}
      </div>
      
      {visibleCount < filteredTeachers.length && (
        <button className="load-more-btn" onClick={() => setVisibleCount(p => p + 4)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Teachers;