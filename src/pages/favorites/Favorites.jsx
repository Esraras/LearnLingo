import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebase.js";
import { ref as rdbRef, get as rdbGet, query as rdbQuery, orderByKey } from "firebase/database";
import { selectUser } from "../../redux/auth/selectors";
import { loadFavoriteIds, saveFavoriteIds } from "../../utils/favoriteStorage";
import { normalizeTeachers } from "../../utils/teacherUtils";
import TeacherCard from "../../components/teachers/TeacherCard";
import css from "../teachers/Teachers.module.css";
import Header from "../../components/headers/Header.jsx";

const Favorites = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIds, setExpandedIds] = useState([]);

  const user = useSelector(selectUser);
  const userId = user?.uid || "";

  const [favoriteIds, setFavoriteIds] = useState(() => loadFavoriteIds(userId));

  useEffect(() => {
    const loadTeachers = async () => {
      setLoading(true);
      setError("");

      try {
        const teachersRef = rdbRef(db, "teachers");
        const snapshot = await rdbGet(rdbQuery(teachersRef, orderByKey()));
        setTeachers(normalizeTeachers(snapshot.val()));
      } catch {
        setError("Favori öğretmenler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  const handleToggleExpanded = (teacherId) => {
    setExpandedIds((current) =>
      current.includes(teacherId) ? current.filter((id) => id !== teacherId) : [...current, teacherId]
    );
  };

  const handleToggleFavorite = (teacherId) => {
    if (!userId) return;

    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(teacherId)
        ? currentIds.filter((id) => id !== teacherId)
        : [...currentIds, teacherId];

      saveFavoriteIds(userId, nextIds);
      return nextIds;
    });
  };

  const favoriteTeachers = useMemo(
    () => teachers.filter((teacher) => favoriteIds.includes(teacher.id)),
    [teachers, favoriteIds]
  );

  return (
    <div className={css.page}>
      <Header />
      {loading && <p className={css.info}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      {!loading && !error && (
        <>
          {favoriteTeachers.length > 0 ? (
            <div className={css.list}>
              {favoriteTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  isFavorite={favoriteIds.includes(teacher.id)}
                  isExpanded={expandedIds.includes(teacher.id)}
                  onToggleExpanded={handleToggleExpanded}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <p className={css.info}>No favorite teachers yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
