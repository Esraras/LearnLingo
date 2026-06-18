
import css from './Hero.module.css';
import img from '../../img/block2x.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className={css.heroContainer}>

      <div className={css.heroLeft}>
        <h1 className={css.heroTitle}>
          Unlock your potential with the best <span className={css.highlightText}>language</span> tutors
        </h1>
        <p className={css.heroDescription}>
          Embark on an Exciting Language Journey with Expert Language Tutors: 
          Elevate your language proficiency to new heights by connecting with 
          highly qualified and experienced tutors.
        </p>
        <button onClick={() => navigate('/teachers')} className={css.getStartedBtn}>Get started</button>
      </div>

      <div className={css.heroRight}>
        <div className={css.imageCardBg}>
          <img src={img} alt="Language Student Illustration" className={css.heroMainImg} />
        </div>
      </div>
    </section>
  );
};

export default Hero;