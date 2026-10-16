"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BiomarkersBreadthSection.module.css";

const CARDS = [
  { label: "Heart", image: "heart" },
  { label: "Thyroid", image: "thyroid" },
  { label: "Cancer", image: "cancer" },
  { label: "Autoimmunity", image: "autoimmunity-rect" },
  { label: "Liver", image: "liver" },
  { label: "Biological Age", image: "biological-age" },
  { label: "Immune Regulation", image: "immune-regulation" },
  { label: "Male Health", image: "male-health" },
  { label: "Female Health", image: "female-health" },
  { label: "Metabolic", image: "metabolic" },
  { label: "Nutrients", image: "nutrients" },
  { label: "Stress & Aging", image: "stress-aging" },
  { label: "Electrolytes", image: "electrolytes" },
  { label: "Kidneys", image: "kidneys" },
  { label: "Pancreas", image: "pancreas" },
  { label: "Brain Health", image: "brain-health" },
  { label: "Gut", image: "gut" },
  { label: "Infections", image: "infections" },
  { label: "MRI & CT Scans", image: "mri-ct" },
];

export default function BiomarkersBreadthSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateEdges = () => setEdges({
      start: track.scrollLeft <= 1,
      end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 1,
    });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    track.addEventListener("scroll", updateEdges, { passive: true });
    updateEdges();
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateEdges);
    };
  }, []);

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    const visibleCards = Math.max(1, Math.floor(track.clientWidth / step));
    track.scrollBy({
      left: direction * visibleCards * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.currentTarget;
    event.preventDefault();
    track.focus({ preventScroll: true });
    track.dataset.dragging = "true";
    // Stop any arrow animation before tracking the mouse directly.
    track.scrollTo({ left: track.scrollLeft, behavior: "instant" });
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const start = dragRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft = start.scrollLeft + start.x - event.clientX;
  };

  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="biomarkers-breadth-title">
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h2 data-bio-reveal id="biomarkers-breadth-title" className={styles.title}>Breadth</h2>
            <p data-bio-reveal className={styles.subtitle}>See more of your health</p>
          </div>
          <p data-bio-reveal className={styles.description}>
            One connected view<br />
            of your <span className="comprehensive-serif">biomarkers</span>.
          </p>
        </div>
        <div className={styles.carousel}>
        <button type="button" className={`${styles.arrow} ${styles.previous}`} aria-label="Previous biomarker categories" aria-controls="biomarkers-breadth-carousel" disabled={edges.start} onClick={() => move(-1)}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <div data-bio-cards ref={trackRef} id="biomarkers-breadth-carousel" className={styles.track} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Biomarker categories"
          onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag}
          onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}>
          {CARDS.map((card, index) => (
            <div data-bio-card data-bio-hover key={card.label} className={styles.card} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${CARDS.length}: ${card.label}`}>
              <div data-bio-hover-layer className={styles.image}>
                <Image src={`/biomarkers/breadth/${card.image}.png`} alt={card.label} draggable={false} fill sizes="(max-width: 767px) 142px, (max-width: 1440px) 14.2vw, 204px" className={styles.artwork} />
              </div>
              <p className={styles.label}>{card.label}</p>
            </div>
          ))}
        </div>
        <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next biomarker categories" aria-controls="biomarkers-breadth-carousel" disabled={edges.end} onClick={() => move(1)}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
        </div>
        <Link data-bio-reveal href="/what-we-test" className={styles.button}>Explore What We Test</Link>
      </div>
    </section>
  );
}
