"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PhysicianCareFAQSection.module.css";

const faqs = [
  {
    question: "Do you accept insurance? Can I use HSA/FSA funds?",
    answer: [
      "Yes. Meddy accepts participating insurance plans for covered physician services. Your membership price is based on your insurance plan and coverage, and we'll show you your applicable membership price before you enroll.",
      "Depending on your plan, you may also have standard insurance costs such as copays, coinsurance, or deductibles for covered medical services. HSA or FSA funds may be used for eligible healthcare expenses, subject to your plan's rules.",
      "Laboratory testing, imaging, prescriptions, and other services may have separate costs based on your insurance coverage.",
    ],
  },
  {
    question: "Can my Meddy physician prescribe medications?",
    answer: ["Yes. When clinically appropriate, your Meddy physician can prescribe and manage medications as part of your care."],
  },
  {
    question: "What if I have an emergency or need care after hours?",
    answer: ["For a medical emergency, call 911 or go to the nearest emergency department. For non-emergency questions after hours, contact your Meddy care team for guidance on available support."],
  },
  {
    question: "Where is Meddy physician care available?",
    answer: ["Availability depends on your location. Confirm whether physician care is available in your state when you book your consultation."],
  },
  {
    question: "Can I contact Meddy between appointments?",
    answer: ["You can message your Meddy care team between appointments with questions about your care, medications, or health information."],
  },
  {
    question: "What happens during my first consultation?",
    answer: ["Your physician gets to know your medical history, current medications, health data, and goals. Together, you'll discuss your concerns and next steps for your care."],
  },
];

export default function PhysicianCareFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="physician-care-faq" className={styles.section} aria-labelledby="physician-care-faq-heading">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <h2 id="physician-care-faq-heading" className={styles.heading}>
            <span>Frequently Asked</span>
            <em>Questions</em>
          </h2>
          <Link href="/book-consultation" className={styles.cta}>Book With Dr. Aggarwal</Link>
        </div>
        <div className={styles.questions}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `physician-faq-question-${index}`;
            const panelId = `physician-faq-answer-${index}`;
            return (
              <div key={faq.question} className={styles.item} data-open={isOpen}>
                <h3 className={styles.question}>
                  <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                    <span>{faq.question}</span>
                    <Image src={`/physician-care/faq/${index === 0 ? "chevron-open" : "chevron-down"}.svg`} alt="" width={20} height={20} unoptimized className={isOpen ? styles.openChevron : undefined} />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className={styles.answer}>
                  {faq.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
