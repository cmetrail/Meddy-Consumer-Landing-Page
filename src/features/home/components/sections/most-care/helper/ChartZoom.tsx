"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Expand, X } from "lucide-react";
import { getLenis } from "@/lib/lenis";
import styles from "./ChartZoom.module.css";

export default function ChartZoom({ title, className, children }: { title: string; className: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useLayoutEffect(() => {
    if (!open || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const overflow = document.body.style.overflow;
    const lenis = getLenis();
    const resume = lenis && !lenis.isStopped;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (resume) lenis.start();
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return <>
    <div className={className}>
      {children}
      <button ref={triggerRef} className={styles.trigger} type="button" aria-label={`Expand ${title}`} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <Expand aria-hidden="true" size={12} />
      </button>
    </div>
    {open && createPortal(
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} data-lenis-prevent
        onCancel={(event) => { event.preventDefault(); setOpen(false); }}
        onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
        onKeyDown={(event) => { if (event.key === "Tab") event.preventDefault(); }}>
        <header className={styles.header}>
          <h3 id={titleId}>{title}</h3>
          <button type="button" aria-label="Close chart" onClick={() => setOpen(false)} autoFocus><X size={22} /></button>
        </header>
        <div className={`${className} ${styles.detail}`} style={{ scale: 1 }}>{children}</div>
      </dialog>, document.body,
    )}
  </>;
}
