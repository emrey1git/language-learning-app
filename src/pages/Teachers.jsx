import React, { useEffect, useState } from "react";
import { ref, onValue, query, limitToFirst, orderByKey, startAt } from "firebase/database";
import { db, auth } from "../firebase.js"; 
import TeacherCard from "./TeacherCard.jsx"; 
import "../pages/pagesCss/teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    fetchTeachers();
    
    let unsubscribeFavs = () => {};
    if (auth.currentUser) {
      const favRef = ref(db, `favorites/${auth.currentUser.uid}`);
      unsubscribeFavs = onValue(favRef, (snapshot) => {
        setFavorites(snapshot.val() || {});
      });
    }
    return () => unsubscribeFavs();
  }, []);

  const fetchTeachers = () => {
    setLoading(true);
    const firstQuery = query(ref(db, "/"), orderByKey(), limitToFirst(4));
    
    onValue(firstQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const teachersArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setTeachers(teachersArray);
        setLastKey(teachersArray[teachersArray.length - 1].id);
        if (teachersArray.length < 4) setHasMore(false);
      } else {
        setError("No teacher data found.");
      }
      setLoading(false);
    }, { onlyOnce: true });
  };

  const loadMore = () => {
  if (!lastKey || loading) return;

   const nextQuery = query(
    ref(db, "/"),
    orderByKey(),
    startAt(lastKey), 
    limitToFirst(5)   
  );

    onValue(nextQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const nextBatch = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(t => t.id !== lastKey);

        if (nextBatch.length === 0) {
          setHasMore(false);
        } else {
          setTeachers(prev => [...prev, ...nextBatch]);
          setLastKey(nextBatch[nextBatch.length - 1].id);
          if (nextBatch.length < 4) setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    }, { onlyOnce: true });
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchLanguage = !selectedLanguage || (teacher.languages && teacher.languages.includes(selectedLanguage));
    const matchLevel = !selectedLevel || (teacher.levels && teacher.levels.includes(selectedLevel));
    const matchPrice = !selectedPrice || Number(teacher.price_per_hour) <= Number(selectedPrice);
    return matchLanguage && matchLevel && matchPrice;
  });

  if (loading && teachers.length === 0) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="teachers-page-container">
      <div className="filters-container">
        <div className="filter-item">
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

        <div className="filter-item">
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

        <div className="filter-item">
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
          filteredTeachers.map((teacher) => (
            <TeacherCard 
              key={teacher.id} 
              teacher={teacher} 
              isInitialFavorite={!!favorites[teacher.id]} 
              activeFilterLevel={selectedLevel}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No teachers matching your criteria were found.</p>
          </div>
        )}
      </div>
      
      {hasMore && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Teachers;