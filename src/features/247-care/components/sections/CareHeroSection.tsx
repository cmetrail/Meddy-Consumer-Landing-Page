"use client";

import Image from "next/image";
import layoutStyles from "../../CareLayout.module.css";
import Header from "@/components/Header";
import buttonStyles from "./CareButton.module.css";
import styles from "./CareHeroSection.module.css";

function ChatReply({ text }: { text: string }) {
  return (
    <div className={styles.reply}>
      <span className={styles.replyTail} aria-hidden="true" />
      <div className={styles.replyBubble}>
        <span>{text}</span>
        <span className={styles.replyTime}>5:45 PM</span>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className={styles.chat}>
      <div className={styles.chatCanvas}>
        <div className={styles.chatPhone}>
          <Image src="/247-care/hero-phone-d58c1b.png" alt="Meddy app" fill sizes="203px" className={styles.photo} />
        </div>
        <div className={styles.message}>
          <div className={styles.messageBubble}>
            <span>Okay. Are there any side effects I should watch for?</span>
            <span className={styles.messageTime}>5:43 PM</span>
          </div>
          <span className={styles.messageTail} aria-hidden="true" />
        </div>
        <div className={styles.replies}>
          <ChatReply text="Okay, let me review this..." />
          <ChatReply text="Understood. I recommend you check your blood pressure and let me know the readings." />
        </div>
      </div>
    </div>
  );
}

export default function CareHeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.header}><Header variant="dark" /></div>
      <div className={`${styles.stage} ${layoutStyles.rail}`}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            <span className={styles.title}>Primary care</span>
            <span className={styles.subtitle}>That doesn&rsquo;t clock out</span>
          </h1>
          <p className={styles.description}>
            See the same <strong>physician over time</strong>, reach <strong>Meddy 24/7,</strong> and get help
            navigating what comes up between appointments.
          </p>
          <button className={`${buttonStyles.button} ${styles.cta}`}>Start Physician Care</button>
          <ChatMockup />
        </div>
        <div className={styles.doctor}>
          <Image src="/247-care/hero-doctor-77e094.png" alt="Meddy physician" fill priority sizes="(max-width: 767px) 90vw, 660px" className={styles.photo} />
        </div>
      </div>
    </section>
  );
}
