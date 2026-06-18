import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../../../firebase.js";
import {
  ref as rdbRef,
  get as rdbGet,
  query as rdbQuery,
  orderByKey,
  limitToFirst,
  startAt,
} from "firebase/database";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { loadFavoriteIds, saveFavoriteIds } from "../../utils/favoriteStorage";
import { loadBookingIds, saveBookingIds } from "../../utils/bookingStorage";
import { normalizeTeachers } from "../../utils/teacherUtils";
import TeacherCard from "../../components/teachers/TeacherCard";
import BookingModal from "../../components/teachers/BookingModal";
import css from "./Teachers.module.css";
import Header from "../../components/headers/Header.jsx";

const PAGE_SIZE = 4;

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = user?.uid || "";

  const [expandedIds, setExpandedIds] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(() => loadFavoriteIds(userId));
  const [bookingTeacher, setBookingTeacher] = useState(null);
  const [filterLang, setFilterLang] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  const toggleExpanded = (teacherId) => {
    setExpandedIds((current) =>
      current.includes(teacherId)
        ? current.filter((id) => id !== teacherId)
        : [...current, teacherId]
    );
  };

  const fetchTeachersPage = async (currentCursor = null) => {
    if (currentCursor) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const teachersRef = rdbRef(db, "teachers");
      const queryArgs = [orderByKey()];

      if (currentCursor) {
        queryArgs.push(startAt(String(currentCursor)));
        queryArgs.push(limitToFirst(PAGE_SIZE + 2));
      } else {
        queryArgs.push(limitToFirst(PAGE_SIZE + 1));
      }

      const snapshot = await rdbGet(rdbQuery(teachersRef, ...queryArgs));
      const items = normalizeTeachers(snapshot.val());

      let pageItems = items;
      if (currentCursor && pageItems.length > 0 && String(pageItems[0].id) === String(currentCursor)) {
        pageItems = pageItems.slice(1);
      }

      const nextPageItems = pageItems.slice(0, PAGE_SIZE);
      const nextHasMore = pageItems.length > PAGE_SIZE;

      setTeachers((currentTeachers) =>
        currentCursor ? [...currentTeachers, ...nextPageItems] : nextPageItems
      );
      setHasMore(nextHasMore);
      setCursor(nextPageItems.length > 0 ? nextPageItems[nextPageItems.length - 1].id : null);
    } catch (fetchError) {
      setError("Unable to load teachers. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTeachersPage();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchTeachersPage(cursor);
    }
  };

  const handleToggleFavorite = (teacherId) => {
    if (!isLoggedIn) {
      toast.error("This action is only available for logged-in users. Please sign in.");
      return;
    }

    if (!userId) return;

    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(teacherId)
        ? currentIds.filter((id) => id !== teacherId)
        : [...currentIds, teacherId];

      saveFavoriteIds(userId, nextIds);
      return nextIds;
    });
  };

  const handleOpenBooking = (teacher) => {
    setBookingTeacher(teacher);
  };

  const handleCloseBooking = () => {
    setBookingTeacher(null);
  };

  const handleBookingSubmit = async (bookingValues) => {
    const nextBookedIds = loadBookingIds(userId);
    if (!nextBookedIds.includes(bookingValues.teacherId)) {
      saveBookingIds(userId, [...nextBookedIds, bookingValues.teacherId]);
    }

    toast.success(`Trial lesson reserved with ${bookingValues.teacherName}!`);
    handleCloseBooking();
  };

  const availableLanguages = useMemo(() => {
    const s = new Set();
    teachers.forEach((t) => {
      if (Array.isArray(t.languages)) t.languages.forEach((l) => l && s.add(l));
    });
    return Array.from(s).sort();
  }, [teachers]);

  const availableLevels = useMemo(() => {
    const s = new Set();
    teachers.forEach((t) => {
      if (Array.isArray(t.levels)) t.levels.forEach((lv) => lv && s.add(lv));
    });
    return Array.from(s).sort();
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      if (filterLang) {
        if (!Array.isArray(t.languages) || !t.languages.includes(filterLang)) return false;
      }
      if (filterLevel) {
        if (!Array.isArray(t.levels) || !t.levels.includes(filterLevel)) return false;
      }
      const price = Number(t.price_per_hour ?? t.price ?? NaN);
      if (filterMinPrice !== "") {
        const min = Number(filterMinPrice);
        if (!Number.isNaN(min) && (Number.isNaN(price) || price < min)) return false;
      }
      if (filterMaxPrice !== "") {
        const max = Number(filterMaxPrice);
        if (!Number.isNaN(max) && (Number.isNaN(price) || price > max)) return false;
      }
      return true;
    });
  }, [teachers, filterLang, filterLevel, filterMinPrice, filterMaxPrice]);

  const resetFilters = () => {
    setFilterLang("");
    setFilterLevel("");
    setFilterMinPrice("");
    setFilterMaxPrice("");
  };

  return (
    <div className={css.page}>
      <Header />
      <div className={css.filterBar}>
        <div className={css.filterControl}>
          <label>Teaching Language</label>
          <select value={filterLang} onChange={(e) => setFilterLang(e.target.value)}>
            <option value="">All</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className={css.filterControl}>
          <label>Student Level</label>
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
            <option value="">All</option>
            {availableLevels.map((lv) => (
              <option key={lv} value={lv}>
                {lv}
              </option>
            ))}
          </select>
        </div>

        <div className={css.filterControl}>
          <label>Min Price ($/hr)</label>
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filterMinPrice}
            onChange={(e) => setFilterMinPrice(e.target.value)}
          />
        </div>

        <div className={css.filterControl}>
          <label>Max Price ($/hr)</label>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filterMaxPrice}
            onChange={(e) => setFilterMaxPrice(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <button type="button" className={css.resetBtn} onClick={resetFilters}>
            Reset
          </button>
          <div className={css.filterCount}>{filteredTeachers.length} / {teachers.length}</div>
        </div>
      </div>

      {loading && <p className={css.info}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={css.list}>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  isFavorite={favoriteIds.includes(teacher.id)}
                  isExpanded={expandedIds.includes(teacher.id)}
                  onToggleExpanded={toggleExpanded}
                  onToggleFavorite={handleToggleFavorite}
                  onBookTrial={handleOpenBooking}
                />
              ))
            ) : (
              <p className={css.info}>No teachers found.</p>
            )}
          </div>

          <BookingModal
            teacher={bookingTeacher}
            isOpen={Boolean(bookingTeacher)}
            onClose={handleCloseBooking}
            onSubmit={handleBookingSubmit}
          />

          {hasMore && (
            <div className={css.loadMoreWrapper}>
              <button
                className={css.loadMoreButton}
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading more..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Teachers;
