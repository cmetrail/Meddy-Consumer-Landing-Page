import Image from "next/image";
import styles from "./WearablesPhysicianSection.module.css";

const GRADIENT =
  "linear-gradient(240.79deg, rgb(151,192,196) 11.38%, rgb(244,244,244) 58.34%, rgb(198,214,224) 69.63%, rgb(249,255,232) 99.5%)";

export default function WearablesPhysicianSection() {
  return (
    <section className={styles.section} aria-labelledby="wearables-physician-heading">
      <div className={styles.card} style={{ background: GRADIENT }}>
        <h2 id="wearables-physician-heading" className={styles.heading}>
          <span className={styles.intro}>
            Give your <em className="comprehensive-serif">physician</em> the
          </span>
          <span className={styles.title}>bigger picture.</span>
        </h2>
        <div className={styles.copy}>
          <p className={styles.description}>
            Your physician can see your sleep, activity, heart rate, HRV,
            workouts, weight, nutrition, labs, and other health trends together.
          </p>
          <div className={styles.message}>
            <p className={styles.statement}>The data was already there.</p>
            <p className={`${styles.care} comprehensive-serif`}>
              Now it can help inform your care.
            </p>
          </div>
          <button type="button" className={styles.button}>Get Started</button>
        </div>
        <Image
          src="/wearables/physician-abstract.svg"
          alt=""
          width={466}
          height={478}
          className={styles.orbit}
        />
        <Image
          src="/wearables/physician-person-38a9d1.png"
          alt="A smiling physician wearing a white coat"
          width={680}
          height={1104}
          className={styles.physician}
          sizes="(max-width: 767px) 85vw, (max-width: 1693px) 40vw, 680px"
        />
      </div>
    </section>
  );
}
