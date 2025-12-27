import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase.js"; 
import TeacherCard from "./TeacherCard.jsx"; 
import "../pages/pagesCss/teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); 

  useEffect(() => {
    const teachersRef = ref(db, "/"); 
    get(teachersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTeachers(Array.isArray(data) ? data : Object.values(data));
      }
    });
  }, []);

  return (
    <div className="teachers-page-container">
      <div className="filters-section">
        {/* Filtreler buraya gelecek */}
      </div>

      <div className="teachers-list">
        {/* Her öğretmen için ayrı bir TeacherCard oluşturuyoruz */}
        {teachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
      
      {/* Eğer gösterilecek daha fazla öğretmen varsa butonu göster */}
      {visibleCount < teachers.length && (
        <button 
          className="load-more-btn" 
          onClick={() => setVisibleCount(prev => prev + 4)}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default Teachers;