import Image from "next/image";
import { WhyMeddyFooterItems } from "./WhyMeddyFooterItems";
import styles from "./WhyMeddyFooter.module.css";

const photo = "/why-meddy/6c4544264640d72d349c7f77f7eb2856c08a65eb.jpg";

export default function WhyMeddyFooterSection() {
  return (
    <section className={styles.section}>
      <div className={styles.photo}>
        <Image src={photo} alt="A physician and patient sharing a warm conversation" fill sizes="100vw" className={styles.image} />
      </div>
      <div className={styles.footer}>
        <Image src={photo} alt="" fill sizes="100vw" className={styles.footerImage} />
        <WhyMeddyFooterItems noTopMargin referenceLayout className={styles.glass} />
      </div>
    </section>
  );
}
