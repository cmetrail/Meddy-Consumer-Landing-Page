import Image from "next/image";
import styles from "./PhysicianCareProfileSection.module.css";

export default function PhysicianCareProfileSection() {
  return (
    <section data-pc-chapter="One physician. Your whole story." id="physician-care-profile" className={styles.section} aria-labelledby="physician-care-profile-heading">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <div data-pc-profile-copy className={styles.intro}>
            <h2 id="physician-care-profile-heading" className={styles.heading}>
              <span className={styles.eyebrow}>Your physician</span>
              <em><span>One Doctor</span>.<br />Your whole picture</em>
            </h2>
            <p className={styles.description}>Every decision starts with context — your habits, your labs, your history — reviewed by the same physician every time.</p>
          </div>
          <p data-pc-profile-continuity className={styles.continuity}>Same physician, every visit. | Your data reviewed between visits, not just during them. | Your plan adjusts as your life does.</p>
        </div>
        <figure data-pc-profile-portrait className={styles.portrait}>
          <div className={styles.imageBox}>
            <Image src="/physician-care/profile/sameer-aggarwal.png" alt="Dr. Sameer Aggarwal, Chief Medical Officer at Meddy" fill sizes="(max-width: 743px) calc(100vw - 40px), 30vw" unoptimized className={styles.image} />
          </div>
          <figcaption data-pc-profile-name className={styles.nameplate}>
            <p className={styles.name}>Sameer <span>Aggarwal, MD</span></p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
