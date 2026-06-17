import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../schemas/bookingSchema";
import css from "../../pages/teachers/Teachers.module.css";

const reasonOptions = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const BookingModal = ({ teacher, isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      reason: "",
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen || !teacher) {
    return null;
  }

  const handleSubmitForm = async (values) => {
    await onSubmit({ ...values, teacherId: teacher.id, teacherName: teacher.name });
  };

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalDialog} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={css.modalClose} onClick={onClose} aria-label="Close booking modal">
          ×
        </button>

        <div className={css.modalHeader}>
          <h2 className={css.modalTitle}>Book trial lesson</h2>
          <p className={css.modalDescription}>
            Our experienced tutor will assess your current language level, discuss your goals, and tailor the lesson to your needs.
          </p>
        </div>

        <div className={css.modalTeacher}>
          <img
            src={teacher.avatar_url || "/img/default-avatar.png"}
            alt={teacher.name || "Teacher avatar"}
            className={css.modalTeacherAvatar}
          />
          <div>
            <div className={css.modalTeacherLabel}>Your teacher</div>
            <div className={css.modalTeacherName}>{teacher.name}</div>
          </div>
        </div>

        <form className={css.modalForm} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={css.modalFieldGroup}>
            <div className={css.modalFieldLabel}>What is your main reason for learning {teacher.languages?.[0] ?? "a new language"}?</div>
            <div className={css.modalRadioGroup}>
              {reasonOptions.map((reason) => (
                <label key={reason} className={css.modalRadioLabel}>
                  <input
                    type="radio"
                    value={reason}
                    {...register("reason")}
                    className={css.modalRadioInput}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            {errors.reason && <p className={css.modalError}>{errors.reason.message}</p>}
          </div>

          <div className={css.modalFieldGroup}>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
              className={css.modalInput}
            />
            {errors.fullName && <p className={css.modalError}>{errors.fullName.message}</p>}
          </div>

          <div className={css.modalFieldGroup}>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={css.modalInput}
            />
            {errors.email && <p className={css.modalError}>{errors.email.message}</p>}
          </div>

          <div className={css.modalFieldGroup}>
            <input
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
              className={css.modalInput}
            />
            {errors.phone && <p className={css.modalError}>{errors.phone.message}</p>}
          </div>

          <button type="submit" className={css.modalSubmitButton} disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
