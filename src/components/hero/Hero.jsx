
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.heroContainer}>
      {/* Sol Blok: Metin İçerikleri */}
      <div className={css.heroLeft}>
        <h1 className={css.heroTitle}>
          Unlock your potential with the best <span className={css.highlightText}>language</span> tutors
        </h1>
        <p className={css.heroDescription}>
          Embark on an Exciting Language Journey with Expert Language Tutors: 
          Elevate your language proficiency to new heights by connecting with 
          highly qualified and experienced tutors.
        </p>
        <button className={css.getStartedBtn}>Get started</button>
      </div>

      {/* Sağ Blok: Görsel Alanı */}
      <div className={css.heroRight}>
        <div className={css.imageCardBg}>
          {/* ANA AVATAR/LAPTOP GÖRSELİ YERİ: Memoji ve Apple laptoplu görsel buraya gelecek */}
          <img src="path_to_avatar_laptop_image.png" alt="Language Student Illustration" className={css.heroMainImg} />
        </div>
      </div>
    </section>
  );
};

export default Hero;