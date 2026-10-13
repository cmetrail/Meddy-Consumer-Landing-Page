"use client";

import Image from "next/image";
import layoutStyles from "../../CareLayout.module.css";
import styles from "./CareQuestionsSection.module.css";

const CARDS = [
  { src: "/247-care/call-card.png", label: "Call" },
  { src: "/247-care/message-card.png", label: "Message" },
  { src: "/247-care/video-card-3296f4.png", label: "Video" },
];

export default function CareQuestionsSection() {
  return (
    <section className={styles.section} aria-labelledby="care-questions-title">
      <div className={`${styles.container} ${layoutStyles.rail}`}>
        <h2 id="care-questions-title" className={styles.title}>
          <em>Reach us</em>{" "}<span>when something comes up.</span>
        </h2>

        <div className={styles.body}>
          <div className={styles.content}>
            <p className={styles.intro}>
              Your questions don&apos;t wait <em>for your next appointment.</em>
            </p>
            <div className={styles.contact}>
              <Image src="/247-care/phone-call.svg" alt="" width={48} height={48} />
              <p>Call or message Meddy 24/7.</p>
            </div>
            <p className={styles.description}>
              Whether you have a question about <strong>a symptom, medication, lab result, or your care plan,</strong>{" "}
              you always have a way to reach us.
            </p>
            <div className={styles.cards}>
              {CARDS.map((card) => (
                <figure key={card.label} className={styles.card}>
                  <div className={styles.cardImage}>
                    <Image src={card.src} alt={card.label} fill sizes="(max-width: 767px) 30vw, 170px" className={styles.cover} />
                  </div>
                  <figcaption>{card.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className={styles.illustration}>
            <Image src="/247-care/section2-background-56586a.png" alt="" fill sizes="(max-width: 767px) 100vw, 558px" className={styles.cover} />
            <div className={styles.scene}>
              <div className={styles.hand}>
                <Image src="/247-care/section2-hand-56586a.png" alt="" fill sizes="850px" className={styles.cover} />
              </div>
              <div className={styles.phone}>
                <Image src="/247-care/section2-iphone-56586a.png" alt="" fill sizes="440px" className={styles.cover} />
              </div>
              <div className={styles.screen}>
                <Image src="/247-care/section2-mockup-56586a.png" alt="Hands holding a phone with a Meddy physician conversation" fill sizes="445px" className={styles.cover} />
              </div>
            </div>
          </div>

          <p className={styles.note}>
            Outside of normal business hours, AI answers and triages the call and SMS. Video only available during normal business hours.
          </p>
        </div>
      </div>
    </section>
  );
}
