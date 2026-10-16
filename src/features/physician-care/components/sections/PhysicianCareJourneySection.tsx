import Image from "next/image";
import styles from "./PhysicianCareJourneySection.module.css";

const milestones = [
  { month: "JAN 2026", caption: "Establish Baseline", photo: "january", className: styles.january, width: 161, height: 190 },
  { month: "APR 2026", caption: "Building Momentum", photo: "april", className: styles.april, width: 185, height: 216 },
  { month: "AUG 2026", caption: "Plan Adjusted", photo: "august", className: styles.august, width: 271, height: 317 },
  { month: "DEC 2026", caption: "New Results Achieved", photo: "december", className: styles.december, width: 185, height: 216 },
];

export default function PhysicianCareJourneySection() {
  return (
    <section data-pc-chapter="Care that grows with you" id="physician-care-journey" className={styles.section} aria-labelledby="physician-care-journey-heading">
      <div className={styles.canvas}>
        <div data-pc-reveal className={styles.heading}>
          <h2 id="physician-care-journey-heading">
            <span>Care that</span>
            <em>grows with you.</em>
          </h2>
          <p>Your health changes. So should your care.</p>
        </div>
        <div className={styles.journey}>
          <Image data-pc-journey-path src="/physician-care/journey/care-path.svg" alt="A care journey that evolves with your goals and life changes" width={1523.37} height={626.137} unoptimized className={styles.path} />
          <Image data-pc-journey-lettering src="/physician-care/journey/care-path-lettering.svg" alt="" width={1390} height={492} unoptimized className={styles.pathLettering} />
          <ol className={styles.milestones} aria-label="Your evolving care plan">
            {milestones.map((milestone) => (
              <li data-pc-milestone key={milestone.month} className={`${styles.card} ${milestone.className}`}>
                <Image src={`/physician-care/journey/${milestone.photo}.png`} alt="" width={milestone.width} height={milestone.height} className={styles.photo} />
                <div className={styles.shade} aria-hidden="true" />
                <div className={styles.label}>
                  <p className={styles.month}>{milestone.month}</p>
                  <p className={styles.caption}>{milestone.caption}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
