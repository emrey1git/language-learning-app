import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../firebase.js";
import TeacherCard from "./TeacherCard.jsx";

const Favorites = () => {
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const favRef = ref(db, `favorites/${auth.currentUser.uid}`);
    const unsubscribe = onValue(favRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFavoriteTeachers(favList);
      } else {
        setFavoriteTeachers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!auth.currentUser) return <p>Please log in to see your favorites.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="teachers-page-container">
      <h2>My Favorite Teachers</h2>
      <div className="teachers-list">
        {favoriteTeachers.length > 0 ? (
          favoriteTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isInitialFavorite={true}
            />
          ))
        ) : (
          <p>You haven't added any favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
