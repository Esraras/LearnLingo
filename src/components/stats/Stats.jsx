
import css from './Stats.module.css';

const Stats = () => {
  const statItems = [
    { number: '32,000 +', label: 'Experienced tutors' },
    { number: '300,000 +', label: '5-star tutor reviews' },
    { number: '120 +', label: 'Subjects taught' },
    { number: '200 +', label: 'Tutor nationalities' },
  ];

  return (
    <div className={css.statsContainer}>
      {statItems.map((item, index) => (
        <div key={index} className={css.statItem}>
          <span className={css.statNumber}>{item.number}</span>
          <span className={css.statLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;