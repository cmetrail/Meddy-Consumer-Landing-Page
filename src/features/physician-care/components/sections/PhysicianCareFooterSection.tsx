import Image from "next/image";
import Link from "next/link";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";
import styles from "./PhysicianCareFooterSection.module.css";

const photo = "/physician-care/b68d00ff4cdc28d5a49a1c8fd12f2dcc8ccc5769.png";

export default function PhysicianCareFooterSection() {
  return (
    <section className={styles.section} aria-labelledby="physician-care-footer-heading">
      <Image src={photo} alt="A physician accompanying her patient outdoors" fill sizes="100vw" className={styles.image} />
      <div className={styles.photo}>
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.content}>
          <h2 id="physician-care-footer-heading" className={styles.heading}>
            <span>Because better care begins with</span>
            <em>knowing you.</em>
          </h2>
          <Link href="/book-consultation" className={styles.cta}>Start Physician Care</Link>
        </div>
      </div>
      <FooterItems noTopMargin mobileReference mobileVariant="physician" className={styles.glass} />
    </section>
  );
}
