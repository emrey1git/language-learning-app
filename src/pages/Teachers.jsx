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

  useEffect(() => {
    // 1. ÖĞRETMENLERİ ÇEK
   
const teachersRef = ref(db, "/");
    
    const unsubscribeTeachers = onValue(teachersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        console.log("Firebase'den gelen veri:", data);

        if (data) {
          // Eğer veriler 'teachers' anahtarı altındaysa orayı al, değilse ana veriyi al
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
          setError("Veritabanı boş görünüyor.");
        }
      } catch (err) {
        console.error("Veri işleme hatası:", err);
        setError("Veri işlenirken bir hata oluştu.");
      }
      setLoading(false);
    }, (firebaseError) => {
      console.error("Firebase bağlantı hatası:", firebaseError);
      setError("Firebase bağlantı hatası: " + firebaseError.message);
      setLoading(false);
    });

    // 2. FAVORİLERİ ÇEK
    let unsubscribeFavs = () => {};
  if (auth.currentUser) {
    const favRef = ref(db, `favorites/${auth.currentUser.uid}`);
    unsubscribeFavs = onValue(favRef, (snapshot) => {
      const favData = snapshot.val() || {};
      setFavorites(favData); // Favori ID'lerini state'e atıyoruz
    });
  }

    return () => {
      unsubscribeTeachers();
      unsubscribeFavs();
    };
  }, []);

  if (loading) return <div className="loading">Firebase verileri yükleniyor...</div>;
  if (error) return <div className="error-message" style={{color: 'red', padding: '20px'}}>{error}</div>;

  return (
    <div className="teachers-page-container">
      <div className="teachers-list">
        {teachers.length > 0 ? (
          teachers.slice(0, visibleCount).map((teacher) => (
            <TeacherCard 
              key={teacher.id} 
              teacher={teacher} 
              isInitialFavorite={!!favorites[teacher.id]} 
            />
          ))
        ) : (
          <p>Görüntülenecek öğretmen bulunamadı.</p>
        )}
      </div>
      
      {visibleCount < teachers.length && (
        <button className="load-more-btn" onClick={() => setVisibleCount(p => p + 4)}>
          Lead More
        </button>
      )}
    </div>
  );
};

export default Teachers;