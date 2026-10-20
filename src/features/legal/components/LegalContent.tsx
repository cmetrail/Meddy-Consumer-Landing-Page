import type { LegalDoc, Bullet } from "../types";

function renderBullet(b: Bullet, key: number) {
  const text = typeof b === "string" ? b : b.text;
  const lead = typeof b === "string" ? undefined : b.lead;
  return (
    <li key={key} className="flex gap-3 text-[16px] leading-[1.7] text-[#b6b6b1]">
      <span
        className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6ee7a0]"
        aria-hidden="true"
      />
      <span>
        {lead && <span className="font-semibold text-[#f4f4f5]">{lead} </span>}
        {text}
      </span>
    </li>
  );
}

export default function LegalContent({ doc }: { doc: LegalDoc }) {
  return (
    <section className="relative mx-auto w-full max-w-360 px-5 py-14 lg:px-10 lg:py-20">
      <div className="w-full">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6ee7a0]">
          {doc.org}
        </p>
        <h1 className="font-dm-serif mt-4 text-[clamp(40px,6vw,72px)] leading-[1.05] text-white">
          {doc.title}
        </h1>
        <p className="mt-5 text-[16px] text-[#8a8a82]">Effective date: {doc.effectiveDate}</p>

        {doc.notice && (
          <p className="mt-8 rounded-lg border border-[#1f1f21] bg-[#101310] p-5 text-[14px] font-semibold uppercase leading-[1.7] tracking-wide text-[#d4d4d0]">
            {doc.notice}
          </p>
        )}

        <div className="mt-10 h-px w-full bg-[#1f1f21]" />

        <div className="mt-12 flex flex-col gap-12">
          {doc.sections.map((section, i) => (
            <section key={i} aria-labelledby={`legal-section-${i}`}>
              <h2 id={`legal-section-${i}`} className="flex items-baseline gap-3 text-white">
                {typeof section.number === "number" && (
                  <span className="font-dm-serif text-[20px] leading-none text-[#17925a]">
                    {section.number}.
                  </span>
                )}
                <span className="text-[22px] font-semibold leading-[1.3]">{section.title}</span>
              </h2>

              <div className="mt-4 flex flex-col gap-4">
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-[16px] leading-[1.7] text-[#b6b6b1]">
                    {p}
                  </p>
                ))}

                {section.subsections?.map((sub, j) => (
                  <div key={j} className="flex flex-col gap-2.5">
                    <p className="text-[16px] leading-[1.7] text-[#b6b6b1]">
                      {sub.heading && (
                        <span className="font-semibold text-[#f4f4f5]">{sub.heading} </span>
                      )}
                      {sub.body}
                    </p>
                    {sub.bullets && (
                      <ul className="flex flex-col gap-2.5">
                        {sub.bullets.map((b, k) => renderBullet(b, k))}
                      </ul>
                    )}
                  </div>
                ))}

                {section.bulletIntro && (
                  <p className="text-[16px] leading-[1.7] text-[#b6b6b1]">{section.bulletIntro}</p>
                )}

                {section.bullets && (
                  <ul className="flex flex-col gap-2.5">
                    {section.bullets.map((b, j) => renderBullet(b, j))}
                  </ul>
                )}

                {section.trailing && (
                  <>
                    {(Array.isArray(section.trailing)
                      ? section.trailing
                      : [section.trailing]
                    ).map((t, j) => (
                      <p key={j} className="text-[16px] leading-[1.7] text-[#b6b6b1]">
                        {t}
                      </p>
                    ))}
                  </>
                )}

                {section.table && (
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[15px] leading-[1.6]">
                      <thead>
                        <tr className="border-b border-[#1f1f21]">
                          {section.table.headers.map((h, j) => (
                            <th
                              key={j}
                              className="py-3 pr-4 font-semibold text-[#f4f4f5] align-top"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, r) => (
                          <tr key={r} className="border-b border-[#1f1f21] align-top">
                            {row.map((cell, c) => (
                              <td
                                key={c}
                                className={`py-3 pr-4 text-[#b6b6b1] ${
                                  c === 0 ? "font-medium text-[#d4d4d0]" : ""
                                }`}
                              >
                                {cell}
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
          ))}
        </div>
      </div>
    </section>
  );
}
