import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebase.js";
import { ref as rdbRef, get as rdbGet, query as rdbQuery, orderByKey } from "firebase/database";
import { selectUser } from "../../redux/auth/selectors";
import { loadBookingIds, saveBookingIds } from "../../utils/bookingStorage";
import { normalizeTeachers } from "../../utils/teacherUtils";
import TeacherCard from "../../components/teachers/TeacherCard";
import css from "../teachers/Teachers.module.css";
import Header from "../../components/headers/Header.jsx";

const Bookings = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIds, setExpandedIds] = useState([]);

  const user = useSelector(selectUser);
  const userId = user?.uid || "";

  const [bookingIds, setBookingIds] = useState(() => loadBookingIds(userId));

  useEffect(() => {
    const loadTeachers = async () => {
      setLoading(true);
      setError("");

      try {
        const teachersRef = rdbRef(db, "teachers");
        const snapshot = await rdbGet(rdbQuery(teachersRef, orderByKey()));
        setTeachers(normalizeTeachers(snapshot.val()));
      } catch {
        setError("Unable to load booked teachers.");
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

  const handleUnbook = (teacherId) => {
    if (!userId) return;

    setBookingIds((currentIds) => {
      const nextIds = currentIds.filter((id) => id !== teacherId);
      saveBookingIds(userId, nextIds);
      return nextIds;
    });
  };

  const bookedTeachers = useMemo(
    () => teachers.filter((teacher) => bookingIds.includes(teacher.id)),
    [teachers, bookingIds]
  );

  return (
    <div className={css.page}>
      <Header />
      <h1 className={css.pageTitle}>Booked Teachers</h1>

      {loading && <p className={css.info}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      {!loading && !error && (
        <>
          {bookedTeachers.length > 0 ? (
            <div className={css.list}>
              {bookedTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  isFavorite={false}
                  isExpanded={expandedIds.includes(teacher.id)}
                  onToggleExpanded={handleToggleExpanded}
                  onToggleFavorite={() => {}}
                />
              ))}
            </div>
          ) : (
            <p className={css.info}>No booked teachers yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Bookings;
