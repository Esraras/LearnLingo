import css from "../../pages/teachers/Teachers.module.css";
import { formatTeacherLanguages, getTeacherExperience } from "../../utils/teacherUtils";

const TeacherCard = ({
  teacher,
  isFavorite,
  isExpanded,
  onToggleExpanded,
  onToggleFavorite,
  onBookTrial,
}) => (
  <article key={teacher.id} className={css.card}>
    <div className={css.cardLeft}>
      <div className={css.avatarWrap}>
        <img
          src={teacher.avatar_url || "/img/default-avatar.png"}
          alt={teacher.name || "Teacher avatar"}
          className={css.avatar}
        />
        {teacher.isOnline && <span className={css.onlineDot} />}
      </div>
    </div>

    <div className={css.cardBody}>
      <div className={css.headerRow}>
        <div className={css.languages}>Languages</div>
        <div className={css.meta}>
          <span className={css.metaItem}>{teacher.lessonsOnline ? "Lessons online" : ""}</span>
          <span className={css.metaSeparator}>|</span>
          <span className={css.metaItem}>Lessons done: {teacher.lessons_done ?? 0}</span>
          <span className={css.metaSeparator}>|</span>
          <span className={css.metaItem}>⭐ Rating: {teacher.rating ?? "-"}</span>
          <span className={css.metaSeparator}>|</span>
          <span className={css.metaItem}>
            Price / 1 hour: <span className={css.price}>${teacher.price_per_hour ?? "--"}</span>
          </span>
        </div>
      </div>

      <h2 className={css.name}>{teacher.name || "İsim yok"}</h2>

      <p className={css.speaks}>
        <strong>Speaks:</strong> {formatTeacherLanguages(teacher.languages)}
      </p>

      <p className={css.lessonInfo}>
        <strong>Lesson Info:</strong> {teacher.lesson_info || teacher.bio || "-"}
      </p>

      <p className={css.conditions}>
        <strong>Conditions:</strong> {teacher.conditions || "-"}
      </p>

      <button className={css.readMore} type="button" onClick={() => onToggleExpanded(teacher.id)}>
        {isExpanded ? "Hide details" : "Read more"}
      </button>

      {isExpanded && (
        <div className={css.expandSection}>
          <div className={css.experienceBlock}>
            <strong>Experience:</strong>
            <p>{getTeacherExperience(teacher)}</p>
          </div>

          {Array.isArray(teacher.reviews) && teacher.reviews.length > 0 ? (
            <div className={css.reviewsBlock}>
              <h3 className={css.reviewsTitle}>Reviews</h3>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={css.reviewCard}>
                  <div className={css.reviewContent}>
                    <div className={css.reviewHeader}>
                      <span className={css.reviewName}>{review.reviewer_name || "Guest"}</span>
                      <span className={css.reviewRating}>⭐ {review.reviewer_rating ?? "-"}</span>
                    </div>
                    <p className={css.reviewText}>
                      {review.comment || review.text || review.message || "No review text available."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={css.noDetails}>No reviews available yet.</p>
          )}

          <button
            type="button"
            className={css.bookTrialButton}
            onClick={() => onBookTrial(teacher)}
          >
            Book trial lesson
          </button>
        </div>
      )}

      <div className={css.tags}>
        {Array.isArray(teacher.levels) &&
          teacher.levels.map((tag, index) => (
            <span key={index} className={`${css.tag} ${index === 0 ? css.tagPrimary : ""}`}>
              #{tag}
            </span>
          ))}
      </div>
    </div>

    <div className={css.cardRight}>
      <button
        type="button"
        className={`${css.heart} ${isFavorite ? css.heartActive : ""}`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(teacher.id)}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </div>
  </article>
);

export default TeacherCard;
