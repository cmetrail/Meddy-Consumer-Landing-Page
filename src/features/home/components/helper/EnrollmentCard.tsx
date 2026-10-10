import Image from "next/image";
import styles from "../sections/HeroSection.module.css";

const ASSETS = "/home/Meddy Website_icon";
const AVATARS = Array.from({ length: 11 }, (_, index) => 2200 + index);

export default function EnrollmentCard() {
  return (
    <div className={styles.enrollment}>
      <p className={styles.enrollmentTitle}>Now accepting our first 500 patients</p>
      <div className={styles.availability}>
        <p className={styles.spots}><span>327</span> <em>remaining spots</em></p>
        <Image src={`${ASSETS}/Group 1707478132.svg`} alt="327 of 500 patient spots remaining" width={78} height={81} className={styles.ring} unoptimized />
      </div>
      <div className={styles.patients} aria-label="Patients joining Meddy">
        {AVATARS.map((avatar) => (
          <Image key={avatar} src={`${ASSETS}/Ellipse ${avatar}.svg`} alt="" width={30} height={30} className={styles.avatar} unoptimized />
        ))}
        <span className={styles.patientCount}><span className={styles.desktopPatientCount}>+162</span><span className={styles.mobilePatientCount}>+167</span></span>
      </div>
    </div>
  );
}
