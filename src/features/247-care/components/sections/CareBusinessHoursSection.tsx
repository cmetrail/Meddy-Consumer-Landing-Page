import layoutStyles from "../../CareLayout.module.css";
import styles from "./CareBusinessHoursSection.module.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function CareBusinessHoursSection() {
  return (
    <section className={styles.section} aria-labelledby="care-business-hours-title">
      <div className={layoutStyles.rail}>
        <h2 id="care-business-hours-title" className={styles.title}>Business Hours (EST)</h2>
        <dl className={styles.hours}>
          {DAYS.map((day) => (
            <div key={day} className={styles.day}>
              <dt>{day}</dt>
              <dd><time dateTime="09:00">9:00 AM</time>{" - "}<time dateTime="18:00">6:00 PM</time></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
