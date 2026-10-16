import Image from "next/image";
import Link from "next/link";
import { WhyMeddyFooterItems } from "./WhyMeddyFooterItems";
import styles from "./WhyMeddyFooter.module.css";

const photo = "/why-meddy/6c4544264640d72d349c7f77f7eb2856c08a65eb.jpg";

export default function WhyMeddyFooterSection() {
  return (
    <section data-why-chapter="closing" className={styles.section} aria-labelledby="meddy-philosophy-heading">
      <div data-why-closing-scene className={styles.photo}>
        <Image src={photo} alt="A physician and patient sharing a warm conversation" fill sizes="100vw" className={styles.image} />
        <div className={styles.shade} aria-hidden="true" />
        <div data-why-closing-copy className={styles.content}>
          <p className={styles.eyebrow}>The Meddy Philosophy</p>
          <h2 id="meddy-philosophy-heading" className={styles.heading}>
            Better care starts<br />with understanding you.
          </h2>
          <p className={styles.copy}>
            Your health is more than what happens during a doctor’s visit. Experience care built around the whole picture.
          </p>
          <Link href="/book-consultation" className={styles.cta}>Get started</Link>
        </div>
      </div>
      <div data-why-footer className={styles.footer}>
        <Image src={photo} alt="" fill sizes="100vw" className={styles.footerImage} />
        <WhyMeddyFooterItems noTopMargin referenceLayout className={styles.glass} />
      </div>
    </section>
  );
}
