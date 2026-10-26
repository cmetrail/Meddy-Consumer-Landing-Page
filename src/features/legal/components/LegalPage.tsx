"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import type { LegalDoc, Bullet } from "../types";
import { highlightText } from "./highlight";
import LegalFooterSection from "./LegalFooterSection";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderBullet(b: Bullet, key: number) {
  const text = typeof b === "string" ? b : b.text;
  const lead = typeof b === "string" ? undefined : b.lead;
  return (
    <li key={key} className="flex gap-3 text-[16px] leading-[24px] text-[#111110]">
      <span
        className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#17925a]"
        aria-hidden="true"
      />
      <span>
        {lead && <span className="font-semibold text-[#111110]">{lead} </span>}
        {highlightText(text, "light")}
      </span>
    </li>
  );
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const ids = useMemo(() => doc.sections.map((s) => slugify(s.title)), [doc]);
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <main
      className="min-h-dvh text-[#111110]"
      style={{
        background: [
          "radial-gradient(ellipse 55% 32% at 50% -4%, rgba(23,146,90,0.08), transparent 60%)",
          "radial-gradient(ellipse 40% 26% at 94% 10%, rgba(110,231,160,0.12), transparent 55%)",
          "#ffffff",
        ].join(", "),
      }}
    >
      <div className="relative">
        <Header variant="light" />
      </div>

      <div className="mx-auto w-full max-w-360 px-5 py-14 lg:px-10 lg:py-20">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2"
            >
              <ul className="flex flex-col gap-[8px]">
                {doc.sections.map((s, i) => {
                  const id = ids[i];
                  const isActive = id === active;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById(id)
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`block text-[20px] font-normal leading-[30px] transition-colors ${
                          isActive
                            ? "text-[#17925a]"
                            : "text-[#7b7b7b] hover:text-[#17925a]"
                        }`}
                      >
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#17925a]">
              {doc.org}
            </p>
            <h1 className="mt-4 text-[40px] font-normal leading-[1.2] text-[#111110]">
              {doc.title}
            </h1>
            <p className="mt-2 text-[16px] leading-[24px] text-[#6b6b6b]">
              Last updated: {doc.effectiveDate}
            </p>

            {doc.notice && (
              <p className="mt-8 rounded-lg border border-[#d6e8de] bg-[#f0f7f3] p-5 text-[14px] font-semibold uppercase leading-[1.7] tracking-wide text-[#111110]">
                {highlightText(doc.notice, "light")}
              </p>
            )}

            <div className="mt-12 flex flex-col gap-8">
              {doc.sections.map((section, i) => {
                const id = ids[i];
                return (
                  <section
                    key={id}
                    id={id}
                    aria-labelledby={`${id}-heading`}
                    className="scroll-mt-8"
                  >
                    <h2
                      id={`${id}-heading`}
                      className="text-[32px] font-normal leading-[48px] text-[#111110]"
                    >
                      {typeof section.number === "number" && (
                        <span className="text-[#17925a]">{section.number}. </span>
                      )}
                      {section.title}
                    </h2>

                    <div className="mt-2 flex flex-col gap-4">
                      {section.paragraphs?.map((p, j) => (
                        <p key={j} className="text-[16px] leading-[24px] text-[#111110]">
                          {highlightText(p, "light")}
                        </p>
                      ))}

                      {section.subsections?.map((sub, j) => (
                        <div key={j} className="flex flex-col gap-3">
                          <p className="text-[16px] leading-[24px] text-[#111110]">
                            {sub.heading && (
                              <span className="font-semibold text-[#111110]">
                                {sub.heading}{" "}
                              </span>
                            )}
                            {sub.body && highlightText(sub.body, "light")}
                          </p>
                          {sub.bullets && (
                            <ul className="flex flex-col gap-3">
                              {sub.bullets.map((b, k) => renderBullet(b, k))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {section.bulletIntro && (
                        <p className="text-[16px] leading-[24px] text-[#111110]">
                          {highlightText(section.bulletIntro, "light")}
                        </p>
                      )}

                      {section.bullets && (
                        <ul className="flex flex-col gap-3">
                          {section.bullets.map((b, j) => renderBullet(b, j))}
                        </ul>
                      )}

                      {section.trailing && (
                        <>
                          {(Array.isArray(section.trailing)
                            ? section.trailing
                            : [section.trailing]
                          ).map((t, j) => (
                            <p key={j} className="text-[16px] leading-[24px] text-[#111110]">
                              {highlightText(t, "light")}
                            </p>
                          ))}
                        </>
                      )}

                      {section.table && (
                        <div className="mt-2 overflow-x-auto">
                          <table className="w-full border-collapse text-left text-[15px] leading-[1.6]">
                            <thead>
                              <tr className="border-b border-[#e2e2e2]">
                                {section.table.headers.map((h, j) => (
                                  <th
                                    key={j}
                                    className="py-3 pr-4 align-top font-semibold text-[#111110]"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, r) => (
                                <tr key={r} className="border-b border-[#e2e2e2] align-top">
                                  {row.map((cell, c) => (
                                    <td
                                      key={c}
                                      className={`py-3 pr-4 text-[#111110] ${
                                        c === 0 ? "font-medium" : ""
                                      }`}
                                    >
                                      {highlightText(cell, "light")}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </article>
        </div>
      </div>

      <div className="bg-[#0d100d]">
        <LegalFooterSection />
      </div>
    </main>
  );
}
