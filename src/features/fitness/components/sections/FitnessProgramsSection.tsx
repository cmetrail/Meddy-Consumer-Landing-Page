import Image from "next/image";
import styles from "./FitnessProgramsSection.module.css";

const PROGRAMS = [
  {
    title: "STRENGTH",
    image: "/fitness/fitness-programs-strength.png",
    alt: "Dumbbells and a jump rope on a red training surface",
    rows: [["Sets", "Reps", "Weights"], ["Loads", "Workout Duration", "Muscle Targets"]],
  },
  {
    title: "CARDIO",
    image: "/fitness/fitness-programs-cardio.png",
    alt: "A row of air bikes in a gym",
    rows: [["Duration", "Distance", "Pace", "HR Zones"], ["Incline", "Resistance", "Cadence", "Stroke Rate"]],
  },
  {
    title: "CIRCUIT TRAINING",
    image: "/fitness/fitness-programs-circuit-16ed96.png",
    alt: "Training shoes, dumbbells, and a jump rope on an exercise mat",
    rows: [["Strength", "Cardio", "Stretch", "Yoga"]],
  },
];

function ProgramCard({ program }: { program: (typeof PROGRAMS)[number] }) {
  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <Image
          src={program.image}
          alt={program.alt}
          fill
          sizes="(max-width: 767px) 76vw, (max-width: 1023px) calc((100vw - 136px) / 3), (max-width: 1440px) calc((100vw - 208px) / 3), 411px"
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{program.title}</h3>
      <div className={styles.features}>
        {program.rows.map((row, index) => (
          <ul key={index} className={styles.featureList}>
            {row.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ))}
      </div>
      <button type="button" className={styles.button}>
        Get Started
      </button>
    </article>
  );
}

export default function FitnessProgramsSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="fitness-programs-heading"
    >
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/fitness/fitness-programs-bg-916cd5.png"
          alt=""
          fill
          sizes="(max-width: 1440px) 150vw, 2146px"
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.shade} />
      <div className={styles.content}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>MORE THAN</p>
          <h2 id="fitness-programs-heading" className={styles.headline}>
            <span className={styles.desktopHeadline}>
              Sets, Reps and Minutes.
            </span>
            <span className={styles.mobileHeadline}>
              Sets, Reps, and Minutes.
            </span>
          </h2>
          <p className={styles.description}>
            Meddy understands how you trained and how
            <br className={styles.desktopBreak} /> your body was challenged.
          </p>
        </header>
        <div className={styles.cards}>
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
