import Image from "next/image";
import styles from "./CareHealthChangesSection.module.css";

export default function CareHealthChangesSection() {
  return (
    <section className={styles.section} aria-labelledby="care-health-changes-title">
      <div className={styles.canvas}>
        <div className={styles.text}>
        <h2 id="care-health-changes-title" className={styles.heading}>
          <span className={styles.headingLine}>Your health</span>
          <span className={styles.headingLine}>changes. <em>Your</em></span>
          <em className={styles.headingLine}>physician doesn&rsquo;t.</em>
        </h2>

        <div className={styles.copy}>
          <p className={styles.lead}>
            <span>Primary care works better when</span>
            <em>your doctor actually knows you.</em>
          </p>
          <p className={styles.description}>
            Your Meddy physician <strong>knows your history, follows your progress, and sees how your health changes over time.</strong>
          </p>
        </div>

        </div>

        <Image src="/247-care/section3-timeline.svg" alt="" width={1520} height={650} unoptimized className={styles.timeline} />
        <div className={styles.patient}>
          <Image src="/247-care/section3-curve-2-33758a.png" alt="Patient speaking with his physician" fill sizes="31vw" className={styles.photo} />
        </div>
        <div className={styles.physician}>
          <Image src="/247-care/section3-curve-1-78c240.png" alt="Meddy physician listening to her patient" fill sizes="38vw" className={styles.photo} />
        </div>
        <Image src="/247-care/section3-icon.svg" alt="" width={38} height={38} unoptimized className={styles.icon} />
        <div className={styles.blend} />
      </div>
    </section>
  );
}
