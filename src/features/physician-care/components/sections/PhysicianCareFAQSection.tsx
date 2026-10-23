"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PhysicianCareFAQSection.module.css";
import { FAQS } from "../../faqs";

export default function PhysicianCareFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section data-pc-chapter="Clarity before you begin" id="physician-care-faq" className={styles.section} aria-labelledby="physician-care-faq-heading">
      <div className={styles.layout}>
        <div data-pc-reveal className={styles.intro}>
          <h2 id="physician-care-faq-heading" className={styles.heading}>
            <span>Frequently Asked</span>
            <em>Questions</em>
          </h2>
          <Link href="/book-consultation" className={styles.cta}>Book With Dr. Aggarwal</Link>
        </div>
        <div className={styles.questions}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `physician-faq-question-${index}`;
            const panelId = `physician-faq-answer-${index}`;
            return (
              <div data-pc-faq key={faq.q} className={styles.item} data-open={isOpen}>
                <h3 className={styles.question}>
                  <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                    <span>{faq.q}</span>
                    <Image src={`/physician-care/faq/${index === 0 ? "chevron-open" : "chevron-down"}.svg`} alt="" width={20} height={20} unoptimized className={isOpen ? styles.openChevron : undefined} />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className={styles.answer}>
                  {faq.a.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
